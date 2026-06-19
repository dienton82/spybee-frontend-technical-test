import { EmptyState } from "@/components/ui/EmptyState";
import type { Incident } from "@/types/incident";

import IncidentCard from "./IncidentCard";

interface IncidentListProps {
  incidents: Incident[];
  onSelect: (incident: Incident) => void;
  selectedIncidentId: string | null;
}

export default function IncidentList({
  incidents,
  onSelect,
  selectedIncidentId,
}: IncidentListProps) {
  if (incidents.length === 0) {
    return (
      <EmptyState
        title="No hay incidencias para los filtros actuales"
        description="Prueba limpiando filtros o creando una nueva incidencia."
      />
    );
  }

  return (
    <div className="incident-list">
      <div className="incident-list__table">
        <div className="incident-list__head" role="row">
          <span>ID</span>
          <span>Titulo</span>
          <span>Estado</span>
          <span>Prioridad</span>
          <span>Categoria</span>
          <span>Proyecto</span>
          <span>Vence</span>
        </div>

        <div className="incident-list__body">
          {incidents.map((incident) => (
            <IncidentCard
              incident={incident}
              isSelected={selectedIncidentId === incident.id}
              key={incident.id}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
