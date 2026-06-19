import { Badge } from "@/components/ui/Badge";
import type { Incident } from "@/types/incident";
import { formatDate } from "@/utils/formatDate";
import {
  getPriorityLabel,
  getPriorityVariant,
  getStatusLabel,
  getStatusVariant,
} from "@/utils/incidentLabels";

interface IncidentCardProps {
  incident: Incident;
  isSelected: boolean;
  onSelect: (incident: Incident) => void;
}

export default function IncidentCard({
  incident,
  isSelected,
  onSelect,
}: IncidentCardProps) {
  return (
    <button
      aria-label={`Seleccionar incidencia ${incident.sequenceId} ${incident.title}`}
      aria-pressed={isSelected}
      className={`incident-card ${isSelected ? "incident-card--selected" : ""}`}
      onClick={() => onSelect(incident)}
      type="button"
    >
      <div className="incident-card__header">
        <div className="incident-card__title-block">
          <strong>{incident.sequenceId}</strong>
          <h3>{incident.title}</h3>
          <p>{incident.project.name}</p>
        </div>
        <div className="incident-card__badges">
          <Badge
            label={getPriorityLabel(incident.priority)}
            tone={getPriorityVariant(incident.priority)}
          />
          <Badge
            label={getStatusLabel(incident.status)}
            tone={getStatusVariant(incident.status)}
          />
        </div>
      </div>
      <div className="incident-card__meta-grid">
        <div className="incident-card__meta-item">
          <span className="incident-card__meta-label">Categoria</span>
          <strong>{incident.type.name}</strong>
        </div>
        <div className="incident-card__meta-item">
          <span className="incident-card__meta-label">Proyecto</span>
          <strong>{incident.project.name}</strong>
        </div>
        <div className="incident-card__meta-item">
          <span className="incident-card__meta-label">Vencimiento</span>
          <strong>{formatDate(incident.dueDate)}</strong>
        </div>
      </div>
    </button>
  );
}
