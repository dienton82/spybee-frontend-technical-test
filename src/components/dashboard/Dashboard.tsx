import type { Incident, IncidentFilters } from "@/types/incident";
import {
  getFilterOptions,
  groupByCategory,
  groupByPriority,
  groupByStatus,
} from "@/utils/incidentStats";

import CategorySummary from "./CategorySummary";
import IncidentFiltersPanel from "./IncidentFilters";
import PrioritySummary from "./PrioritySummary";
import StatusSummary from "./StatusSummary";

interface DashboardProps {
  filters: IncidentFilters;
  incidents: Incident[];
  onChangeFilters: (filters: Partial<IncidentFilters>) => void;
  onClearFilters: () => void;
}

export default function Dashboard({
  filters,
  incidents,
  onChangeFilters,
  onClearFilters,
}: DashboardProps) {
  const options = getFilterOptions(incidents);
  const prioritySummary = groupByPriority(incidents);
  const statusSummary = groupByStatus(incidents);
  const categorySummary = groupByCategory(incidents);

  return (
    <div className="dashboard">
      <IncidentFiltersPanel
        categories={options.categories}
        filters={filters}
        onChange={onChangeFilters}
        onClear={onClearFilters}
        projects={options.projects}
      />

      <section className="dashboard__summaries">
        <PrioritySummary summary={prioritySummary} />
        <StatusSummary summary={statusSummary} />
        <CategorySummary summary={categorySummary} />
      </section>
    </div>
  );
}
