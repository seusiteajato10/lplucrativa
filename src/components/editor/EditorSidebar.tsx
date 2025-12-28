import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentTab from "./tabs/ContentTab";
import ImagesTab from "./tabs/ImagesTab";
import VideoTab from "./tabs/VideoTab";
import StylesTab from "./tabs/StylesTab";
import TemplateSettingsTab from "./tabs/TemplateSettingsTab";

export default function EditorSidebar({ templateData, projectId, userId, projectType, projectNiche, onUpdate }: any) {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      
      <Tabs defaultValue="content" className="flex-1 flex flex-col">
        <TabsList className="w-full grid grid-cols-4">
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="images">Imagens</TabsTrigger>
          <TabsTrigger value="video">Vídeo</TabsTrigger>
          <TabsTrigger value="styles">Estilos</TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto">
          <TabsContent value="content" className="p-4">
            <ContentTab templateData={templateData} onUpdate={onUpdate} />
          </TabsContent>
          <TabsContent value="images" className="p-4">
            <ImagesTab templateData={templateData} onUpdate={onUpdate} projectId={projectId} userId={userId} />
          </TabsContent>
          <TabsContent value="video" className="p-4">
            <VideoTab templateData={templateData} onUpdate={onUpdate} />
          </TabsContent>
          <TabsContent value="styles" className="p-4">
            <StylesTab templateData={templateData} onUpdate={onUpdate} />
          </TabsContent>
        </div>
      </Tabs>

      <div className="border-t p-4 bg-gray-50 overflow-y-auto" style={{ maxHeight: '50vh' }}>
        <h3 className="font-semibold mb-4">Configuração do Produto</h3>
        <TemplateSettingsTab 
          templateData={templateData} 
          onUpdate={onUpdate}
          projectType={projectType}
          projectNiche={projectNiche}
          projectId={projectId}
        />
      </div>

    </div>
  );
}
