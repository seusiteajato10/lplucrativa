import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Download, 
  ChevronDown,
  Trash2,
  X 
} from "lucide-react";
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

interface LeadsBulkActionsProps {
  selectedCount: number;
  onClearSelection: () => void;
  onUpdateStatus: (status: string) => void;
  onExport: () => void;
  onDelete: () => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

const LeadsBulkActions = ({
  selectedCount,
  onClearSelection,
  onUpdateStatus,
  onExport,
  onDelete,
  isUpdating,
  isDeleting,
}: LeadsBulkActionsProps) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-card border border-border rounded-xl shadow-lg p-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">
            {selectedCount} lead{selectedCount > 1 ? "s" : ""} selecionado{selectedCount > 1 ? "s" : ""}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={onClearSelection}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="h-6 w-px bg-border" />

        {/* Status Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" disabled={isUpdating}>
              Alterar Status
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="bg-popover border border-border">
            <DropdownMenuItem onClick={() => onUpdateStatus("new")}>
              <div className="w-2 h-2 rounded-full bg-primary mr-2" />
              Marcar como Novo
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onUpdateStatus("contacted")}>
              <Clock className="w-4 h-4 mr-2 text-yellow-600" />
              Marcar como Contatado
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onUpdateStatus("converted")}>
              <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
              Marcar como Convertido
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onUpdateStatus("discarded")}>
              <XCircle className="w-4 h-4 mr-2 text-destructive" />
              Marcar como Descartado
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Export Button */}
        <Button variant="outline" size="sm" onClick={onExport}>
          <Download className="w-4 h-4 mr-2" />
          Exportar Selecionados
        </Button>

        {/* Delete Button */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm" disabled={isDeleting}>
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Excluir {selectedCount} lead{selectedCount > 1 ? "s" : ""}?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação não pode ser desfeita. {selectedCount > 1 ? "Os leads serão" : "O lead será"} permanentemente excluído{selectedCount > 1 ? "s" : ""} do sistema.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete}>
                Excluir {selectedCount > 1 ? "todos" : ""}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default LeadsBulkActions;
