import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Download, Filter } from "lucide-react";
import { LeadsFilters as FiltersType } from "@/hooks/useLeads";

interface LeadsFiltersProps {
  filters: FiltersType;
  onFiltersChange: (filters: FiltersType) => void;
  projects: { id: string; name: string }[];
  onExport: () => void;
  leadsCount: number;
}

const LeadsFilters = ({
  filters,
  onFiltersChange,
  projects,
  onExport,
  leadsCount,
}: LeadsFiltersProps) => {
  return (
    <div className="bg-card rounded-xl border border-border p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, email ou telefone..."
            value={filters.search}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            className="pl-10"
          />
        </div>

        {/* Project Filter */}
        <Select
          value={filters.projectId}
          onValueChange={(value) => onFiltersChange({ ...filters, projectId: value })}
        >
          <SelectTrigger className="w-full lg:w-[200px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filtrar por Projeto" />
          </SelectTrigger>
          <SelectContent className="bg-popover border border-border">
            <SelectItem value="all">Todos os Projetos</SelectItem>
            {projects.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Date Range Filter */}
        <Select
          value={filters.dateRange}
          onValueChange={(value: FiltersType["dateRange"]) =>
            onFiltersChange({ ...filters, dateRange: value })
          }
        >
          <SelectTrigger className="w-full lg:w-[180px]">
            <SelectValue placeholder="Filtrar por Data" />
          </SelectTrigger>
          <SelectContent className="bg-popover border border-border">
            <SelectItem value="all">Todas as Datas</SelectItem>
            <SelectItem value="today">Hoje</SelectItem>
            <SelectItem value="7days">Últimos 7 dias</SelectItem>
            <SelectItem value="30days">Últimos 30 dias</SelectItem>
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select
          value={filters.status}
          onValueChange={(value) => onFiltersChange({ ...filters, status: value })}
        >
          <SelectTrigger className="w-full lg:w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-popover border border-border">
            <SelectItem value="all">Todos os Status</SelectItem>
            <SelectItem value="new">Novo</SelectItem>
            <SelectItem value="contacted">Contatado</SelectItem>
            <SelectItem value="converted">Convertido</SelectItem>
            <SelectItem value="discarded">Descartado</SelectItem>
          </SelectContent>
        </Select>

        {/* Export Button */}
        <Button
          variant="outline"
          onClick={onExport}
          disabled={leadsCount === 0}
          className="w-full lg:w-auto"
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar CSV
        </Button>
      </div>
    </div>
  );
};

export default LeadsFilters;
