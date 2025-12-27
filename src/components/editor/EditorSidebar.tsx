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
import ProductConfigTab from './tabs/ProductConfigTab'; // Import the new tab

interface EditorSidebarProps {
  templateData: TemplateData;
  projectId: string;
  userId: string;
  onUpdate: (updates: Partial<TemplateData>) => void;
}

const EditorSidebar = ({ templateData, projectId, userId, onUpdate }: EditorSidebarProps) => {
  return (
    <aside className="w-80 border-r border-border bg-background flex flex-col h-full">
      <Tabs defaultValue="content" className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-4 m-2 h-auto">
          <TabsTrigger value="content" className="text-xs py-2">Conteúdo</TabsTrigger>
          <TabsTrigger value="images" className="text-xs py-2">Imagens</TabsTrigger>
          <TabsTrigger value="video" className="text-xs py-2">Vídeo</TabsTrigger>
          <TabsTrigger value="styles" className="text-xs py-2">Estilos</TabsTrigger>
        </TabsList>
        <TabsList className="grid grid-cols-3 mx-2 h-auto">
          <TabsTrigger value="form" className="text-xs py-2">Formulário</TabsTrigger>
          <TabsTrigger value="integrations" className="text-xs py-2">Integrações</TabsTrigger>
          <TabsTrigger value="lgpd" className="text-xs py-2">LGPD</TabsTrigger>
        </TabsList>
        <TabsList className="grid grid-cols-3 mx-2 mt-1 h-auto">
          <TabsTrigger value="thankyou" className="text-xs py-2">Obrigado</TabsTrigger>
          <TabsTrigger value="upsell" className="text-xs py-2">Upsell</TabsTrigger>
          <TabsTrigger value="downsell" className="text-xs py-2">Downsell</TabsTrigger>
        </TabsList>
        {/* New tab for Product Config */}
        {templateData.niche === 'product' && (
          <TabsList className="grid grid-cols-1 mx-2 mt-1 h-auto">
            <TabsTrigger value="product-config" className="text-xs py-2">Config. Produto</TabsTrigger>
          </TabsList>
        )}

        <ScrollArea className="flex-1 p-4">
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
          {templateData.niche === 'product' && (
            <TabsContent value="product-config" className="mt-0">
              <ProductConfigTab templateData={templateData} onUpdate={onUpdate} />
            </TabsContent>
          )}
        </ScrollArea>
      </Tabs>
    </aside>
  );
};

export default EditorSidebar;