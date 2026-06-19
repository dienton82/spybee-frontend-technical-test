import type { IncidentPriority, IncidentStatus } from "@/types/incident";

export function getPriorityLabel(priority: IncidentPriority) {
  switch (priority) {
    case "high":
      return "Alta";
    case "medium":
      return "Media";
    case "low":
    default:
      return "Baja";
  }
}

export function getStatusLabel(status: IncidentStatus) {
  switch (status) {
    case "open":
      return "Abierta";
    case "closed":
      return "Cerrada";
    case "on_pause":
    default:
      return "En pausa";
  }
}

export function getPriorityVariant(priority: IncidentPriority) {
  return priority;
}

export function getStatusVariant(status: IncidentStatus) {
  return status;
}
