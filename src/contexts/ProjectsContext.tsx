import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Project, ProjectNiche, ProjectType, getTemplateId } from "@/types/project";

interface AddProjectData {
  name: string;
  slug: string;
  niche: ProjectNiche;
  project_type: ProjectType;
  template_id?: string;
}

interface ProjectsContextType {
  projects: Project[];
  isLoading: boolean;
  addProject: (data: AddProjectData) => Promise<{ error: Error | null; project?: Project }>;
  deleteProject: (id: string) => Promise<{ error: Error | null }>;
  totalLeads: number;
  refetch: () => Promise<void>;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalLeads, setTotalLeads] = useState(0);

  const fetchProjects = async () => {
    if (!user) {
      setProjects([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    
    const { data: projectsData, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      setIsLoading(false);
      return;
    }

    const { data: leadsData, error: leadsError } = await supabase
      .from('leads_captured')
      .select('project_id')
      .eq('user_id', user.id);

    if (leadsError) {
      console.error('Error fetching leads:', leadsError);
    }

    const leadsCountMap: Record<string, number> = {};
    leadsData?.forEach(lead => {
      leadsCountMap[lead.project_id] = (leadsCountMap[lead.project_id] || 0) + 1;
    });

    const projectsWithLeads = projectsData.map(project => ({
      ...project,
      leads_count: leadsCountMap[project.id] || 0
    }));

    setProjects(projectsWithLeads);
    setTotalLeads(leadsData?.length || 0);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, [user]);

  const addProject = async (data: AddProjectData) => {
    if (!user) {
      return { error: new Error('No user logged in') };
    }

    // Se for Funil Completo, vamos criar o primeiro projeto (Lead)
    // O segundo (Vendas) pode ser criado em seguida ou via fluxo de editor
    const projectType = data.project_type === 'full_funnel' ? 'lead_only' : data.project_type;
    const funnelPosition = data.project_type === 'full_funnel' ? 'lead' : null;

    const { data: newProject, error } = await supabase
      .from('projects')
      .insert({
        user_id: user.id,
        name: data.name + (data.project_type === 'full_funnel' ? ' (Captura)' : ''),
        slug: data.slug + (data.project_type === 'full_funnel' ? '-captura' : ''),
        niche: data.niche,
        project_type: projectType,
        funnel_position: funnelPosition,
        template_id: data.template_id || getTemplateId(data.niche),
        template_data: {},
        integrations: {},
        status: 'active'
      })
      .select()
      .single();

    if (error) {
      return { error: error as any };
    }

    // Se for Funil Completo, criar a página de vendas conectada IMEDIATAMENTE
    if (data.project_type === 'full_funnel') {
      const { data: salesProject, error: salesError } = await supabase
        .from('projects')
        .insert({
          user_id: user.id,
          name: data.name + ' (Vendas)',
          slug: data.slug,
          niche: data.niche,
          project_type: 'sales_only',
          funnel_position: 'sales',
          connected_page_id: newProject.id, // Conecta à página de captura
          template_id: getTemplateId(data.niche),
          template_data: {},
          integrations: {},
          status: 'active'
        })
        .select()
        .single();

      if (!salesError) {
        // Atualizar a página de captura com o link para a de vendas
        await supabase
          .from('projects')
          .update({ 
            connected_page_id: salesProject.id,
            template_data: { 
              redirectAfterCapture: { 
                enabled: true, 
                targetPageId: salesProject.id, 
                delay: 3 
              } 
            }
          })
          .eq('id', newProject.id);
      }
    }

    await fetchProjects();
    return { error: null, project: newProject as Project };
  };

  const deleteProject = async (id: string) => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      return { error: error as any };
    }

    await fetchProjects();
    return { error: null };
  };

  const refetch = async () => {
    await fetchProjects();
  };

  return (
    <ProjectsContext.Provider value={{ projects, isLoading, addProject, deleteProject, totalLeads, refetch }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
};