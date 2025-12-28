import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TemplateData } from "@/types/templateData";

interface TemplateSettingsTabProps {
  templateData: TemplateData;
  onUpdate: (data: Partial<TemplateData>) => void;
  projectType?: string;
  projectNiche?: string;
}

export default function TemplateSettingsTab({ 
  templateData, 
  onUpdate,
  projectType,
  projectNiche 
}: TemplateSettingsTabProps) {
  
  const isCapturePage = projectType === 'lead_only' || projectType === 'full_funnel';
  const isProductSalesPage = projectNiche === 'produto' && projectType !== 'lead_only';

  return (
    <div className="space-y-4">
      
      {isCapturePage && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              Funil Conectado
            </CardTitle>
