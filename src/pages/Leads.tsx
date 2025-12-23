import { useState } from "react";
import { Helmet } from "react-helmet-async";
import DashboardLayout from "@/components/layout/DashboardLayout";
import LeadsMetricCards from "@/components/leads/LeadsMetricCards";
import LeadsFilters from "@/components/leads/LeadsFilters";
import LeadsTable from "@/components/leads/LeadsTable";
import LeadDetailsModal from "@/components/leads/LeadDetailsModal";
import LeadsEmptyState from "@/components/leads/LeadsEmptyState";
import LeadsBulkActions from "@/components/leads/LeadsBulkActions";
import { 
  useLeads, 
  useLeadsMetrics, 
  useUserProjects, 
  useBulkUpdateLeadStatus,
  useBulkDeleteLeads,
  Lead, 
  LeadsFilters as FiltersType 
} from "@/hooks/useLeads";
import { format } from "date-fns";

const Leads = () => {
  const [filters, setFilters] = useState<FiltersType>({
    search: "",
    projectId: "all",
    dateRange: "all",
    status: "all",
  });
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);

  const { data: leads = [], isLoading: leadsLoading } = useLeads(filters);
  const { data: metrics, isLoading: metricsLoading } = useLeadsMetrics();
  const { data: projects = [] } = useUserProjects();
  const bulkUpdateStatus = useBulkUpdateLeadStatus();
  const bulkDelete = useBulkDeleteLeads();

  const handleViewDetails = (lead: Lead) => {
    setSelectedLead(lead);
    setModalOpen(true);
  };

  const handleSelectLead = (leadId: string, selected: boolean) => {
    if (selected) {
      setSelectedLeads((prev) => [...prev, leadId]);
    } else {
      setSelectedLeads((prev) => prev.filter((id) => id !== leadId));
    }
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedLeads(leads.map((lead) => lead.id));
    } else {
      setSelectedLeads([]);
    }
  };

  const handleBulkStatusUpdate = (status: string) => {
    bulkUpdateStatus.mutate(
      { leadIds: selectedLeads, status },
      { onSuccess: () => setSelectedLeads([]) }
    );
  };

  const handleBulkDelete = () => {
    bulkDelete.mutate(selectedLeads, {
      onSuccess: () => setSelectedLeads([]),
    });
  };

  const exportToCSV = () => {
    if (leads.length === 0) return;

    const leadsToExport = selectedLeads.length > 0 
      ? leads.filter(lead => selectedLeads.includes(lead.id))
      : leads;

    const headers = ["Nome", "Email", "Telefone", "Projeto", "Data", "Status"];
    const statusLabels: Record<string, string> = {
      new: "Novo",
      contacted: "Contatado",
      converted: "Convertido",
      discarded: "Descartado",
    };

    const rows = leadsToExport.map((lead) => [
      lead.data.name || "",
      lead.data.email || "",
      lead.data.phone || lead.data.whatsapp || "",
      lead.project_name || "",
      format(new Date(lead.created_at), "dd/MM/yyyy HH:mm"),
      statusLabels[lead.data.status || "new"] || "Novo",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `leads-${format(new Date(), "yyyy-MM-dd")}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const hasNoLeadsEver = !leadsLoading && metrics?.total === 0;
  const hasNoFilteredResults = !leadsLoading && leads.length === 0 && metrics?.total !== 0;

  return (
    <>
      <Helmet>
        <title>Leads - LP Lucrativa</title>
        <meta name="description" content="Gerencie seus leads capturados." />
      </Helmet>

      <DashboardLayout>
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Leads
          </h1>
          <p className="text-muted-foreground">
            Visualize e gerencie os leads capturados em suas landing pages.
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="mb-6">
          <LeadsMetricCards
            total={metrics?.total || 0}
            today={metrics?.today || 0}
            last7Days={metrics?.last7Days || 0}
            conversionRate={metrics?.conversionRate || 0}
            isLoading={metricsLoading}
          />
        </div>

        {hasNoLeadsEver ? (
          <LeadsEmptyState />
        ) : (
          <>
            {/* Filters */}
            <div className="mb-6">
              <LeadsFilters
                filters={filters}
                onFiltersChange={setFilters}
                projects={projects}
                onExport={exportToCSV}
                leadsCount={leads.length}
              />
            </div>

            {/* Results count */}
            <div className="mb-4 text-sm text-muted-foreground">
              {selectedLeads.length > 0 ? (
                <span>{selectedLeads.length} leads selecionados</span>
              ) : (
                <span>{leads.length} leads encontrados</span>
              )}
            </div>

            {/* Table or No Results */}
            {hasNoFilteredResults ? (
              <div className="bg-card rounded-xl border border-border p-12 text-center">
                <p className="text-muted-foreground">
                  Nenhum lead encontrado com os filtros selecionados.
                </p>
              </div>
            ) : (
              <LeadsTable
                leads={leads}
                isLoading={leadsLoading}
                onViewDetails={handleViewDetails}
                selectedLeads={selectedLeads}
                onSelectLead={handleSelectLead}
                onSelectAll={handleSelectAll}
              />
            )}
          </>
        )}

        {/* Lead Details Modal */}
        <LeadDetailsModal
          lead={selectedLead}
          open={modalOpen}
          onOpenChange={setModalOpen}
        />

        {/* Bulk Actions Bar */}
        <LeadsBulkActions
          selectedCount={selectedLeads.length}
          onClearSelection={() => setSelectedLeads([])}
          onUpdateStatus={handleBulkStatusUpdate}
          onExport={exportToCSV}
          onDelete={handleBulkDelete}
          isUpdating={bulkUpdateStatus.isPending}
          isDeleting={bulkDelete.isPending}
        />
      </DashboardLayout>
    </>
  );
};

export default Leads;
