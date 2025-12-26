import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface HomepageSectionContent {
  title?: string;
  subtitle?: string;
  primaryButton?: string;
  secondaryButton?: string;
  items?: { title: string; description: string }[];
  email?: string;
  phone?: string;
  address?: string;
}

interface HomepageContent {
  hero: HomepageSectionContent;
  features: HomepageSectionContent;
  cta: HomepageSectionContent;
  contact: HomepageSectionContent;
}

const defaultHomepageContent: HomepageContent = {
  hero: {
    title: 'Crie Landing Pages que Convertem em Minutos',
    subtitle: 'Sem precisar de programação ou design. Templates prontos, editor visual intuitivo e tudo que você precisa para capturar leads e vender mais.',
    primaryButton: 'Começar agora grátis',
    secondaryButton: 'Ver planos',
  },
  features: {
    title: 'Tudo que você precisa para vender mais',
    items: [
      { title: 'Templates Prontos', description: 'Modelos otimizados para Produtos, Serviços, Eventos e Cursos. Basta escolher e personalizar.' },
      { title: 'Editor Super Simples', description: 'Interface visual intuitiva que qualquer pessoa consegue usar. Arraste, solte e publique.' },
      { title: 'Captura de Leads', description: 'Integração com e-mail marketing e CRM para você não perder nenhuma oportunidade de venda.' },
      { title: 'Domínio Personalizado', description: 'Use nosso domínio gratuito ou conecte seu próprio domínio para uma identidade profissional.' },
    ],
  },
  cta: {
    title: 'Pronto para criar sua próxima landing page?',
    subtitle: 'Escolha um template e personalize em minutos. Sem necessidade de conhecimento técnico.',
    buttonText: 'Criar Novo Projeto',
  },
  contact: {
    email: 'contato@lplucrativa.com.br',
    phone: '(XX) XXXX-XXXX',
    address: 'Rua Exemplo, 123 - Cidade, Estado',
  },
};

export function useHomepageContent() {
  const queryClient = useQueryClient();

  return useQuery<HomepageContent>({
    queryKey: ['homepageContent'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('homepage_content')
        .select('section, content');

      if (error) {
        console.error('Error fetching homepage content:', error);
        // If there's an error, return default content
        return defaultHomepageContent;
      }

      const fetchedContent: Partial<HomepageContent> = {};
      data?.forEach(item => {
        if (item.section in defaultHomepageContent) {
          fetchedContent[item.section as keyof HomepageContent] = {
            ...defaultHomepageContent[item.section as keyof HomepageContent], // Merge with defaults
            ...item.content,
          };
        }
      });

      // Ensure all sections have at least default content
      const mergedContent: HomepageContent = {
        hero: fetchedContent.hero || defaultHomepageContent.hero,
        features: fetchedContent.features || defaultHomepageContent.features,
        cta: fetchedContent.cta || defaultHomepageContent.cta,
        contact: fetchedContent.contact || defaultHomepageContent.contact,
      };

      // If any section is missing from DB, insert default data
      for (const sectionName of Object.keys(defaultHomepageContent)) {
        if (!data?.some(item => item.section === sectionName)) {
          await supabase
            .from('homepage_content')
            .insert({ section: sectionName, content: defaultHomepageContent[sectionName as keyof HomepageContent] });
          // Invalidate to refetch with new data, but don't block current render
          queryClient.invalidateQueries({ queryKey: ['homepageContent'] });
        }
      }

      return mergedContent;
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
}