"use client";

import { Button } from "@/components/ui/Button";

interface TopbarProps {
  totalIncidents: number;
  onCreateIncident: () => void;
}

export default function Topbar({
  totalIncidents,
  onCreateIncident,
}: TopbarProps) {
  return (
    <header className="topbar">
      <div>
        <p className="topbar__eyebrow">Proyecto activo</p>
        <h1>Proyecto Onboarding</h1>
      </div>
      <div className="topbar__actions">
        <div className="topbar__metric">
          <span>Total</span>
          <strong>{totalIncidents}</strong>
        </div>
        <Button onClick={onCreateIncident} type="button">
          Crear incidencia
        </Button>
      </div>
    </header>
  );
}
