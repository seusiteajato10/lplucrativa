import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface Lead {
  id: string;
  project_id: string;
  user_id: string;
  data: {
    name?: string;
    email?: string;
    phone?: string;
    whatsapp?: string;
    status?: string;
    [key: string]: unknown;
  };
  source_url: string | null;
  created_at: string;
  project_name?: string;
}

export interface LeadsFilters {
  search: string;
  projectId: string;
  dateRange: "today" | "7days" | "30days" | "all";
  status: string;
}

export const useLeads = (filters: LeadsFilters) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["leads", user?.id, filters],
    queryFn: async () => {
      if (!user?.id) return [];

      let query = supabase
        .from("leads_captured")
        .select(`
          id,
          project_id,
          user_id,
          data,
          source_url,
          created_at
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      // Filter by project
      if (filters.projectId && filters.projectId !== "all") {
        query = query.eq("project_id", filters.projectId);
      }

      // Filter by date range
      const now = new Date();
      if (filters.dateRange === "today") {
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
        query = query.gte("created_at", startOfDay);
      } else if (filters.dateRange === "7days") {
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
        query = query.gte("created_at", sevenDaysAgo);
      } else if (filters.dateRange === "30days") {
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
        query = query.gte("created_at", thirtyDaysAgo);
      }

      const { data: leads, error } = await query;

      if (error) throw error;

      // Fetch project names
      const projectIds = [...new Set(leads?.map(l => l.project_id) || [])];
      const { data: projects } = await supabase
        .from("projects")
        .select("id, name")
        .in("id", projectIds);

      const projectMap = new Map(projects?.map(p => [p.id, p.name]) || []);

      // Map leads with project names and filter
      let result = (leads || []).map(lead => ({
        ...lead,
        data: lead.data as Lead["data"],
        project_name: projectMap.get(lead.project_id) || "Projeto desconhecido"
      }));

      // Filter by status
      if (filters.status && filters.status !== "all") {
        result = result.filter(lead => 
          (lead.data.status || "new") === filters.status
        );
      }

      // Filter by search term
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        result = result.filter(lead => {
          const name = (lead.data.name || "").toLowerCase();
          const email = (lead.data.email || "").toLowerCase();
          const phone = (lead.data.phone || lead.data.whatsapp || "").toLowerCase();
          return name.includes(searchLower) || email.includes(searchLower) || phone.includes(searchLower);
        });
      }

      return result as Lead[];
    },
    enabled: !!user?.id,
  });
};

export const useLeadsMetrics = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["leads-metrics", user?.id],
    queryFn: async () => {
      if (!user?.id) return { total: 0, today: 0, last7Days: 0, conversionRate: 0 };

      const { data: allLeads, error } = await supabase
        .from("leads_captured")
        .select("id, created_at, data")
        .eq("user_id", user.id);

      if (error) throw error;

      const now = new Date();
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      const total = allLeads?.length || 0;
      const today = allLeads?.filter(l => new Date(l.created_at!) >= startOfToday).length || 0;
      const last7Days = allLeads?.filter(l => new Date(l.created_at!) >= sevenDaysAgo).length || 0;
      
      // Calculate conversion rate (leads marked as converted / total)
      const converted = allLeads?.filter(l => {
        const data = l.data as Lead["data"];
        return data?.status === "converted";
      }).length || 0;
      
      const conversionRate = total > 0 ? Math.round((converted / total) * 100) : 0;

      return { total, today, last7Days, conversionRate };
    },
    enabled: !!user?.id,
  });
};

export const useUpdateLeadStatus = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ leadId, status }: { leadId: string; status: string }) => {
      // First get the current lead data
      const { data: lead, error: fetchError } = await supabase
        .from("leads_captured")
        .select("data")
        .eq("id", leadId)
        .single();

      if (fetchError) throw fetchError;

      // Update with new status
      const updatedData = { ...(lead.data as object), status };
      
      const { error } = await supabase
        .from("leads_captured")
        .update({ data: updatedData })
        .eq("id", leadId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["leads-metrics", user?.id] });
      toast.success("Status do lead atualizado!");
    },
    onError: () => {
      toast.error("Erro ao atualizar status do lead");
    },
  });
};

export const useBulkUpdateLeadStatus = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ leadIds, status }: { leadIds: string[]; status: string }) => {
      // Update each lead's status
      const updates = leadIds.map(async (leadId) => {
        const { data: lead, error: fetchError } = await supabase
          .from("leads_captured")
          .select("data")
          .eq("id", leadId)
          .single();

        if (fetchError) throw fetchError;

        const updatedData = { ...(lead.data as object), status };
        
        const { error } = await supabase
          .from("leads_captured")
          .update({ data: updatedData })
          .eq("id", leadId);

        if (error) throw error;
      });

      await Promise.all(updates);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["leads", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["leads-metrics", user?.id] });
      toast.success(`${variables.leadIds.length} leads atualizados!`);
    },
    onError: () => {
      toast.error("Erro ao atualizar leads");
    },
  });
};

export const useBulkDeleteLeads = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (leadIds: string[]) => {
      const { error } = await supabase
        .from("leads_captured")
        .delete()
        .in("id", leadIds);

      if (error) throw error;
    },
    onSuccess: (_, leadIds) => {
      queryClient.invalidateQueries({ queryKey: ["leads", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["leads-metrics", user?.id] });
      toast.success(`${leadIds.length} leads excluídos!`);
    },
    onError: () => {
      toast.error("Erro ao excluir leads");
    },
  });
};

export const useDeleteLead = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (leadId: string) => {
      const { error } = await supabase
        .from("leads_captured")
        .delete()
        .eq("id", leadId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["leads-metrics", user?.id] });
      toast.success("Lead excluído com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao excluir lead");
    },
  });
};

export const useUserProjects = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["user-projects", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from("projects")
        .select("id, name")
        .eq("user_id", user.id)
        .order("name");

      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });
};
