import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Project, ProjectNiche, getTemplateId } from "@/types/project";

interface ProjectsContextType {
  projects: Project[];
  isLoading: boolean;
  addProject: (data: { name: string; slug: string; niche: ProjectNiche }) => Promise<{ error: Error | null }>;
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
    
    // Fetch projects
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

    // Fetch leads count for each project
    const { data: leadsData, error: leadsError } = await supabase
      .from('leads_captured')
      .select('project_id')
      .eq('user_id', user.id);

    if (leadsError) {
      console.error('Error fetching leads:', leadsError);
    }

    // Count leads per project
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

  const addProject = async (data: { name: string; slug: string; niche: ProjectNiche }) => {
    if (!user) {
      return { error: new Error('No user logged in') };
    }

    const { error } = await supabase
      .from('projects')
      .insert({
        user_id: user.id,
        name: data.name,
        slug: data.slug,
        niche: data.niche,
        template_id: getTemplateId(data.niche),
        template_data: {},
        integrations: {},
        status: 'active'
      });

    if (error) {
      return { error };
    }

    await fetchProjects();
    return { error: null };
  };

  const deleteProject = async (id: string) => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      return { error };
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
