import type {
  DashboardStats,
  Incident,
  IncidentFilters,
  IncidentPriority,
  IncidentStatus,
} from "@/types/incident";

export const defaultFilters: IncidentFilters = {
  status: "all",
  priority: "all",
  category: "",
  project: "",
  query: "",
};

export function applyIncidentFilters(
  incidents: Incident[],
  filters: IncidentFilters,
) {
  const normalizedQuery = filters.query.trim().toLowerCase();

  return incidents.filter((incident) => {
    if (incident.deleted) {
      return false;
    }

    if (filters.status !== "all" && incident.status !== filters.status) {
      return false;
    }

    if (filters.priority !== "all" && incident.priority !== filters.priority) {
      return false;
    }

    if (filters.category && incident.type.name !== filters.category) {
      return false;
    }

    if (filters.project && incident.project.name !== filters.project) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const haystack = [
      incident.title,
      incident.description,
      incident.locationDescription,
      incident.sequenceId,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

export function getDashboardStats(incidents: Incident[]): DashboardStats {
  const now = new Date();

  return incidents.reduce<DashboardStats>(
    (stats, incident) => {
      stats.total += 1;

      if (incident.status === "open") {
        stats.open += 1;
      }

      if (incident.status === "closed") {
        stats.closed += 1;
      }

      if (incident.status === "on_pause") {
        stats.onPause += 1;
      }

      if (incident.priority === "high") {
        stats.highPriority += 1;
      }

      if (
        incident.dueDate &&
        incident.status !== "closed" &&
        new Date(incident.dueDate) < now
      ) {
        stats.overdue += 1;
      }

      return stats;
    },
    {
      total: 0,
      open: 0,
      closed: 0,
      onPause: 0,
      highPriority: 0,
      overdue: 0,
    },
  );
}

export function groupByPriority(incidents: Incident[]) {
  return countByField<IncidentPriority>(incidents, (incident) => incident.priority);
}

export function groupByStatus(incidents: Incident[]) {
  return countByField<IncidentStatus>(incidents, (incident) => incident.status);
}

export function groupByCategory(incidents: Incident[]) {
  return countByField<string>(incidents, (incident) => incident.type.name);
}

export function getFilterOptions(incidents: Incident[]) {
  return {
    categories: Array.from(new Set(incidents.map((incident) => incident.type.name))).sort(),
    projects: Array.from(new Set(incidents.map((incident) => incident.project.name))).sort(),
  };
}

function countByField<T extends string>(
  incidents: Incident[],
  pick: (incident: Incident) => T,
) {
  return incidents.reduce<Record<string, number>>((accumulator, incident) => {
    const key = pick(incident);
    accumulator[key] = (accumulator[key] ?? 0) + 1;
    return accumulator;
  }, {});
}
