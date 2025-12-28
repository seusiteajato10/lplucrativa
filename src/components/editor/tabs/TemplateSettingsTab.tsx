import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";

export default function TemplateSettingsTab({ templateData, onUpdate, projectType, projectNiche, projectId }: any) {
  const [funnelEnabled, setFunnelEnabled] = useState(templateData?.funnelEnabled || false);
  const [selectedDestination, setSelectedDestination] = useState(templateData?.selectedDestination || "");
  const [waitTime, setWaitTime] = useState(templateData?.waitTime || 3);

  useEffect(() => {
    setFunnelEnabled(templateData?.funnelEnabled || false);
    setSelectedDestination(templateData?.selectedDestination || "");
    setWaitTime(templateData?.waitTime || 3);
  }, [templateData]);

  const handleFunnelToggle = (enabled: boolean) => {
    setFunnelEnabled(enabled);
    onUpdate({ funnelEnabled: enabled });
  };

  const handleDestinationChange = (value: string) => {
    setSelectedDestination(value);
    onUpdate({ selectedDestination: value });
  };

  const handleWaitTimeChange = (e: any) => {
    const value = parseInt(e.target.value) || 3;
    setWaitTime(value);
    onUpdate({ waitTime: value });
  };

  return (
    <div className="space-y-6">
      
      {/* TEMPLATE DA PÁGINA */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium flex items-center gap-2">
          📄 Template da Página
        </h4>
        <div>
          <Label className="text-xs text-muted-foreground">Escolha o Template</Label>
          <Select defaultValue="standard">
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Padrão</SelectItem>
              <SelectItem value="vsl">VSL</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* FUNIL CONECTADO */}
      <div className="space-y-3 pt-3 border-t">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium flex items-center gap-2">
              🔄 Funil Conectado
            </h4>
            <p
