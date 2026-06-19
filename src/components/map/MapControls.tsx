"use client";

import { Button } from "@/components/ui/Button";

interface MapControlsProps {
  count: number;
  onCenterMap: () => void;
  onCreateIncident: () => void;
}

export default function MapControls({
  count,
  onCenterMap,
  onCreateIncident,
}: MapControlsProps) {
  return (
    <div className="map-controls">
      <div className="map-controls__meta">
        <span>Incidencias visibles</span>
        <strong>{count}</strong>
      </div>
      <div className="map-controls__actions">
        <Button variant="secondary" onClick={onCenterMap}>
          Centrar mapa
        </Button>
        <Button variant="ghost" onClick={onCreateIncident} type="button">
          Crear incidencia
        </Button>
      </div>
    </div>
  );
}
