import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentTab from "./tabs/ContentTab";
import ImagesTab from "./tabs/ImagesTab";
import VideoTab from "./tabs/VideoTab";
import StylesTab from "./tabs/StylesTab";
import TemplateSettingsTab from "./tabs/TemplateSettingsTab";
import { TemplateData } from "@/types/templateData";

interface EditorSidebarProps {
  templateData: TemplateData;
  projectId: string;
  userId: string;
  projectType?: string;
  projectNiche?: string;
  onUpdate: (data: Partial<TemplateData>) => void;
}

export default function EditorSidebar({
  templateData,
  projectId,
  userId,
  projectType,
  projectNiche,
  onUpdate,
}: EditorSidebarProps) {
  return (
    <div className="w-full h-full flex flex-col bg-white border-r">
      
      <Tabs defaultValue="content" className="flex-1 flex flex-col">
        <TabsList className="w-full grid grid-cols-4 rounded-none border-b">
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="images">Imagens</TabsTrigger>
          <TabsTrigger value="video">Vídeo</TabsTrigger>
          <TabsTrigger value="styles">Estilos</TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto">
          <TabsContent value="content" className="m-0 p-4">
            <ContentTab
              templateData={templateData}
              onUpdate={onUpdate}
            />
          </TabsContent>

          <TabsContent value="images" className="m-0 p-4">
            <ImagesTab
              templateData={templateData}
              onUpdate={onUpdate}
              projectId={projectId}
              userId={userId}
            />
          </TabsContent>

          <TabsContent value="video" className="m-0 p-4">
            <VideoTab
              templateData={templateData}
              onUpdate={onUpdate}
            />
          </TabsContent>

          <TabsContent value="styles" className="m-0 p-4">
            <StylesTab
              templateData={templateData}
              onUpdate={onUpdate}
            />
          </TabsContent>
        </div>
      </Tabs>

      <div className="border-t bg-gray-50">
        <div className="p-4">
          <h3 className="font-bold text-sm mb-4 text-gray-700">
            Configuração do Produto
          </h3>
          <TemplateSettingsTab
            templateData={templateData}
            onUpdate={onUpdate}
            projectType={projectType}
            projectNiche={projectNiche}
            projectId={projectId}
          />
        </div>
      </div>

    </div>
  );
}
