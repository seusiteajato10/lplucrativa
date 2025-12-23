import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Copy,
  Eye,
  MessageCircle,
  Mail,
  MoreHorizontal,
  CheckCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Lead } from "@/hooks/useLeads";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface LeadsTableProps {
  leads: Lead[];
  isLoading: boolean;
  onViewDetails: (lead: Lead) => void;
  selectedLeads: string[];
  onSelectLead: (leadId: string, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
}

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  new: { label: "Novo", variant: "default" },
  contacted: { label: "Contatado", variant: "secondary" },
  converted: { label: "Convertido", variant: "outline" },
  discarded: { label: "Descartado", variant: "destructive" },
};

const LeadsTable = ({
  leads,
  isLoading,
  onViewDetails,
  selectedLeads,
  onSelectLead,
  onSelectAll,
}: LeadsTableProps) => {
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copiado!`);
  };

  const openWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, "");
    const phoneWithCountry = cleanPhone.startsWith("55") ? cleanPhone : `55${cleanPhone}`;
    window.open(`https://wa.me/${phoneWithCountry}`, "_blank");
  };

  const openEmail = (email: string) => {
    window.open(`mailto:${email}`, "_blank");
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
  };

  if (isLoading) {
    return (
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-4 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-10 flex-1" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const allSelected = leads.length > 0 && selectedLeads.length === leads.length;
  const someSelected = selectedLeads.length > 0 && selectedLeads.length < leads.length;

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-12">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={(checked) => onSelectAll(!!checked)}
                  aria-label="Selecionar todos"
                  className={someSelected ? "data-[state=checked]:bg-primary/50" : ""}
                />
              </TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Projeto</TableHead>
              <TableHead>Data/Hora</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => {
              const status = lead.data.status || "new";
              const config = statusConfig[status] || statusConfig.new;
              const phone = lead.data.phone || lead.data.whatsapp;

              return (
                <TableRow key={lead.id} className="hover:bg-muted/30">
                  <TableCell>
                    <Checkbox
                      checked={selectedLeads.includes(lead.id)}
                      onCheckedChange={(checked) => onSelectLead(lead.id, !!checked)}
                      aria-label={`Selecionar ${lead.data.name}`}
                    />
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => onViewDetails(lead)}
                      className="font-medium text-foreground hover:text-primary transition-colors text-left"
                    >
                      {lead.data.name || "Sem nome"}
                    </button>
                  </TableCell>
                  <TableCell>
                    {lead.data.email ? (
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">{lead.data.email}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => copyToClipboard(lead.data.email!, "Email")}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {phone ? (
                      <button
                        onClick={() => openWhatsApp(phone)}
                        className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        {phone}
                      </button>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="text-muted-foreground">{lead.project_name}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-muted-foreground text-sm">
                      {formatDate(lead.created_at)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={config.variant}>{config.label}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onViewDetails(lead)}
                        title="Ver detalhes"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {phone && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-green-600"
                          onClick={() => openWhatsApp(phone)}
                          title="Abrir WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      )}
                      {lead.data.email && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-blue-600"
                          onClick={() => openEmail(lead.data.email!)}
                          title="Enviar email"
                        >
                          <Mail className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-border">
        {leads.map((lead) => {
          const status = lead.data.status || "new";
          const config = statusConfig[status] || statusConfig.new;
          const phone = lead.data.phone || lead.data.whatsapp;

          return (
            <div key={lead.id} className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={selectedLeads.includes(lead.id)}
                    onCheckedChange={(checked) => onSelectLead(lead.id, !!checked)}
                  />
                  <div>
                    <button
                      onClick={() => onViewDetails(lead)}
                      className="font-medium text-foreground hover:text-primary transition-colors text-left"
                    >
                      {lead.data.name || "Sem nome"}
                    </button>
                    <p className="text-sm text-muted-foreground">{lead.project_name}</p>
                  </div>
                </div>
                <Badge variant={config.variant}>{config.label}</Badge>
              </div>

              <div className="flex flex-wrap gap-2 text-sm">
                {lead.data.email && (
                  <button
                    onClick={() => openEmail(lead.data.email!)}
                    className="flex items-center gap-1 text-blue-600"
                  >
                    <Mail className="w-3 h-3" />
                    {lead.data.email}
                  </button>
                )}
                {phone && (
                  <button
                    onClick={() => openWhatsApp(phone)}
                    className="flex items-center gap-1 text-green-600"
                  >
                    <MessageCircle className="w-3 h-3" />
                    {phone}
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {formatDate(lead.created_at)}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewDetails(lead)}
                >
                  <Eye className="w-3 h-3 mr-1" />
                  Ver detalhes
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeadsTable;
