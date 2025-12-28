import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TemplateData } from '@/types/templateData';
import ContentTab from './tabs/ContentTab';
import ImagesTab from './tabs/ImagesTab';
import VideoTab from './tabs/VideoTab';
import StylesTab from './tabs/StylesTab';
import FormTab from './tabs/FormTab';
import IntegrationsTab from './tabs/IntegrationsTab';
import LgpdTab from './tabs/LgpdTab';
import ThankYouTab from './tabs/ThankYouTab';
import UpsellTab from './tabs/UpsellTab';
import DownsellTab from './tabs/DownsellTab';
import TemplateSettingsTab from './tabs/TemplateSettingsTab'; // Este componente agora será renderizado fora dos TabsContent
import { ProjectNiche, ProjectType } from '@/types/project'; // Importar tipos

interface EditorSidebarProps {
  templateData: TemplateData;
  projectId: string;
  userId: string;
  projectNiche: ProjectNiche;
  projectType: ProjectType;
  onUpdate: (updates: Partial<TemplateData>) => void;
}

const EditorSidebar = ({ templateData, projectId, userId, projectNiche, projectType, onUpdate }: EditorSidebarProps) => {
  return (
    <aside className="w-80 border-r border-border bg-background flex flex-col h-full overflow-hidden">
      <Tabs defaultValue="content" className="flex flex-col h-full">
        <div className="p-2 space-y-1 border-b bg-muted/20">
          <TabsList className="grid grid-cols-4 w-full h-auto">
            <TabsTrigger value="content" className="text-[10px] py-1">Conteúdo</TabsTrigger>
            <TabsTrigger value="images" className="text-[10px] py-1">Imagens</TabsTrigger>
            <TabsTrigger value="video" className="text-[10px] py-1">Vídeo</TabsTrigger>
            <TabsTrigger value="styles" className="text-[10px] py-1">Estilos</TabsTrigger>
          </TabsList>
          <TabsList className="grid grid-cols-3 w-full h-auto">
            <TabsTrigger value="form" className="text-[10px] py-1">Formulário</TabsTrigger>
            <TabsTrigger value="integrations" className="text-[10px] py-1">Integrações</TabsTrigger>
            <TabsTrigger value="lgpd" className="text-[10px] py-1">LGPD</TabsTrigger>
          </TabsList>
          <TabsList className="grid grid-cols-3 w-full h-auto">
            <TabsTrigger value="thankyou" className="text-[10px] py-1">Obrigado</TabsTrigger>
            <TabsTrigger value="upsell" className="text-[10px] py-1">Upsell</TabsTrigger>
            <TabsTrigger value="downsell" className="text-[10px] py-1">Downsell</TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 pb-20"> {/* Padding bottom maior para não cortar o conteúdo final */}
            <TabsContent value="content" className="mt-0">
              <ContentTab templateData={templateData} onUpdate={onUpdate} />
            </TabsContent>
            <TabsContent value="images" className="mt-0">
              <ImagesTab 
                templateData={templateData} 
                onUpdate={onUpdate}
                projectId={projectId}
                userId={userId}
              />
            </TabsContent>
            <TabsContent value="video" className="mt-0">
              <VideoTab templateData={templateData} onUpdate={onUpdate} />
            </TabsContent>
            <TabsContent value="styles" className="mt-0">
              <StylesTab templateData={templateData} onUpdate={onUpdate} />
            </TabsContent>
            <TabsContent value="form" className="mt-0">
              <FormTab templateData={templateData} onUpdate={onUpdate} />
            </TabsContent>
            <TabsContent value="integrations" className="mt-0">
              <IntegrationsTab templateData={templateData} onUpdate={onUpdate} />
            </TabsContent>
            <TabsContent value="lgpd" className="mt-0">
              <LgpdTab templateData={templateData} onUpdate={onUpdate} />
            </TabsContent>
            <TabsContent value="thankyou" className="mt-0">
              <ThankYouTab templateData={templateData} onUpdate={onUpdate} />
            </TabsContent>
            <TabsContent value="upsell" className="mt-0">
              <UpsellTab templateData={templateData} onUpdate={onUpdate} />
            </TabsContent>
            <TabsContent value="downsell" className="mt-0">
              <DownsellTab templateData={templateData} onUpdate={onUpdate} />
            </TabsContent>
            
            {/* Renderiza TemplateSettingsTab como um componente separado, fora dos TabsContent */}
            <div className="mt-6">
              <TemplateSettingsTab 
                templateData={{ ...templateData, niche: projectNiche, project_type: projectType }} 
                onUpdate={onUpdate} 
              />
            </div>
          </div>
        </div>
      </Tabs>
    </aside>
  );
};

export default EditorSidebar;