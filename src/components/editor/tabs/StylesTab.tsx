import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TemplateData, StylesConfig } from '@/types/templateData';

interface StylesTabProps {
  templateData: TemplateData;
  onUpdate: (updates: Partial<TemplateData>) => void;
}

const StylesTab = ({ templateData, onUpdate }: StylesTabProps) => {
  const updateStyles = (updates: Partial<StylesConfig>) => {
    onUpdate({ styles: { ...templateData.styles, ...updates } });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="primaryColor">Cor Primária</Label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            id="primaryColor"
            value={templateData.styles.primaryColor}
            onChange={e => updateStyles({ primaryColor: e.target.value })}
            className="w-10 h-10 rounded border border-border cursor-pointer"
          />
          <Input
            value={templateData.styles.primaryColor}
            onChange={e => updateStyles({ primaryColor: e.target.value })}
            placeholder="#6366f1"
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="secondaryColor">Cor Secundária</Label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            id="secondaryColor"
            value={templateData.styles.secondaryColor}
            onChange={e => updateStyles({ secondaryColor: e.target.value })}
            className="w-10 h-10 rounded border border-border cursor-pointer"
          />
          <Input
            value={templateData.styles.secondaryColor}
            onChange={e => updateStyles({ secondaryColor: e.target.value })}
            placeholder="#8b5cf6"
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Fonte</Label>
        <Select
          value={templateData.styles.fontFamily}
          onValueChange={value => updateStyles({ fontFamily: value as StylesConfig['fontFamily'] })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Inter">Inter</SelectItem>
            <SelectItem value="Montserrat">Montserrat</SelectItem>
            <SelectItem value="Poppins">Poppins</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Preview */}
      <div className="mt-6 p-4 rounded-lg border border-border">
        <p className="text-xs text-muted-foreground mb-3">Preview:</p>
        <div
          className="p-4 rounded-lg text-white text-center font-semibold"
          style={{
            background: `linear-gradient(135deg, ${templateData.styles.primaryColor}, ${templateData.styles.secondaryColor})`,
            fontFamily: templateData.styles.fontFamily,
          }}
        >
          Texto de exemplo
        </div>
      </div>
    </div>
  );
};

export default StylesTab;
