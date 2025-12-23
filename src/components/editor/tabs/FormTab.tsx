import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { TemplateData, FormFieldConfig } from '@/types/templateData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface FormTabProps {
  templateData: TemplateData;
  onUpdate: (updates: Partial<TemplateData>) => void;
}

const FormTab = ({ templateData, onUpdate }: FormTabProps) => {
  const updateFormFields = (updates: Partial<FormFieldConfig>) => {
    onUpdate({ formFields: { ...templateData.formFields, ...updates } });
  };

  const formFieldOptions = [
    { key: 'fullName', label: 'Nome completo', required: true },
    { key: 'email', label: 'E-mail', required: true },
    { key: 'whatsapp', label: 'WhatsApp', required: false },
    { key: 'cpf', label: 'CPF', required: false },
    { key: 'company', label: 'Empresa', required: false },
    { key: 'role', label: 'Cargo/Função', required: false },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-semibold text-sm text-foreground">Campos do Formulário</h3>
        <p className="text-xs text-muted-foreground">
          Configure quais campos serão exibidos no formulário de captura de leads.
        </p>

        <div className="space-y-3">
          {formFieldOptions.map(field => (
            <div key={field.key} className="flex items-center space-x-2">
              <Checkbox
                id={field.key}
                checked={templateData.formFields[field.key]}
                onCheckedChange={checked =>
                  updateFormFields({ [field.key]: checked as boolean })
                }
                disabled={field.required}
              />
              <Label htmlFor={field.key} className="text-sm">
                {field.label}
                {field.required && (
                  <span className="text-xs text-muted-foreground ml-1">(obrigatório)</span>
                )}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Form Preview */}
      <div className="mt-6 p-4 rounded-lg border border-border bg-secondary/30">
        <p className="text-xs text-muted-foreground mb-3">Preview do formulário:</p>
        <div className="space-y-3">
          {templateData.formFields.fullName && (
            <Input placeholder="Nome completo" disabled />
          )}
          {templateData.formFields.email && (
            <Input placeholder="E-mail" type="email" disabled />
          )}
          {templateData.formFields.whatsapp && (
            <Input placeholder="WhatsApp" disabled />
          )}
          {templateData.formFields.cpf && (
            <Input placeholder="CPF" disabled />
          )}
          {templateData.formFields.company && (
            <Input placeholder="Empresa" disabled />
          )}
          {templateData.formFields.role && (
            <Input placeholder="Cargo/Função" disabled />
          )}
          <Button className="w-full" disabled>
            {templateData.ctaButtonText || 'Enviar'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormTab;
