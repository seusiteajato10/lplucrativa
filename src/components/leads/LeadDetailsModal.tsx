import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MessageCircle,
  Mail,
  Phone,
  Calendar,
  Globe,
  User,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { Lead, useUpdateLeadStatus, useDeleteLead } from "@/hooks/useLeads";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface LeadDetailsModalProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  new: { label: "Novo", variant: "default" },
  contacted: { label: "Contatado", variant: "secondary" },
  converted: { label: "Convertido", variant: "outline" },
  discarded: { label: "Descartado", variant: "destructive" },
};

const LeadDetailsModal = ({ lead, open, onOpenChange }: LeadDetailsModalProps) => {
  const updateStatus = useUpdateLeadStatus();
  const deleteLead = useDeleteLead();

  if (!lead) return null;

  const phone = lead.data.phone || lead.data.whatsapp;
  const status = lead.data.status || "new";
  const config = statusConfig[status] || statusConfig.new;

  const openWhatsApp = () => {
    if (!phone) return;
    const cleanPhone = phone.replace(/\D/g, "");
    const phoneWithCountry = cleanPhone.startsWith("55") ? cleanPhone : `55${cleanPhone}`;
    window.open(`https://wa.me/${phoneWithCountry}`, "_blank");
  };

  const openEmail = () => {
    if (lead.data.email) {
      window.open(`mailto:${lead.data.email}`, "_blank");
    }
  };

  const handleStatusChange = (newStatus: string) => {
    updateStatus.mutate({ leadId: lead.id, status: newStatus });
  };

  const handleDelete = () => {
    deleteLead.mutate(lead.id, {
      onSuccess: () => onOpenChange(false),
    });
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR });
  };

  // Get all data fields except known ones
  const additionalFields = Object.entries(lead.data).filter(
    ([key]) => !["name", "email", "phone", "whatsapp", "status"].includes(key)
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="block">{lead.data.name || "Lead sem nome"}</span>
              <Badge variant={config.variant} className="mt-1">
                {config.label}
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Contact Info */}
          <div className="space-y-3">
            {lead.data.email && (
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">{lead.data.email}</span>
              </div>
            )}
            {phone && (
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">{phone}</span>
              </div>
            )}
            <div className="flex items-center gap-3 text-sm">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{lead.project_name}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{formatDate(lead.created_at)}</span>
            </div>
            {lead.source_url && (
              <div className="flex items-center gap-3 text-sm">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <a 
                  href={lead.source_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline truncate"
                >
                  {lead.source_url}
                </a>
              </div>
            )}
          </div>

          {/* Additional Fields */}
          {additionalFields.length > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">Dados adicionais</h4>
                <div className="grid gap-2">
                  {additionalFields.map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-muted-foreground capitalize">
                        {key.replace(/_/g, " ")}
                      </span>
                      <span className="text-foreground">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={openWhatsApp}
              disabled={!phone}
              className="text-green-600 border-green-200 hover:bg-green-50 dark:border-green-900 dark:hover:bg-green-950"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={openEmail}
              disabled={!lead.data.email}
              className="text-blue-600 border-blue-200 hover:bg-blue-50 dark:border-blue-900 dark:hover:bg-blue-950"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Button>
          </div>

          <Separator />

          {/* Status Actions */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Alterar Status</h4>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={status === "contacted" ? "default" : "outline"}
                size="sm"
                onClick={() => handleStatusChange("contacted")}
                disabled={updateStatus.isPending}
              >
                <Clock className="w-4 h-4 mr-2" />
                Marcar como Contatado
              </Button>
              <Button
                variant={status === "converted" ? "default" : "outline"}
                size="sm"
                onClick={() => handleStatusChange("converted")}
                disabled={updateStatus.isPending}
                className="text-green-600"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Converter
              </Button>
              <Button
                variant={status === "discarded" ? "destructive" : "outline"}
                size="sm"
                onClick={() => handleStatusChange("discarded")}
                disabled={updateStatus.isPending}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Descartar
              </Button>
            </div>
          </div>

          <Separator />

          {/* Delete Action */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className="w-full">
                <Trash2 className="w-4 h-4 mr-2" />
                Excluir Lead
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Excluir lead?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não pode ser desfeita. O lead será permanentemente excluído do sistema.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadDetailsModal;
