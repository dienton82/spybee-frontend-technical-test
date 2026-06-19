"use client";

import { Badge } from "@/components/ui/Badge";

interface SidebarProps {
  openCount: number;
  highPriorityCount: number;
  onCreateIncident: () => void;
}

export default function Sidebar({
  openCount,
  highPriorityCount,
  onCreateIncident,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__brand-mark">S</span>
        <div>
          <strong>Spybee</strong>
          <p>Incident command</p>
        </div>
      </div>

      <nav className="sidebar__nav" aria-label="Navegacion principal">
        <a href="#mapa">Mapa</a>
        <a href="#dashboard">Dashboard</a>
        <button
          className="sidebar__link-button"
          onClick={onCreateIncident}
          type="button"
        >
          Nueva incidencia
        </button>
      </nav>

      <section className="sidebar__summary">
        <div className="sidebar__summary-card">
          <span>Abiertas</span>
          <strong>{openCount}</strong>
        </div>
        <div className="sidebar__summary-card">
          <span>Criticas</span>
          <strong>{highPriorityCount}</strong>
        </div>
      </section>

      <section className="sidebar__legend">
        <p>Prioridades</p>
        <div className="sidebar__legend-list">
          <Badge label="Alta" tone="high" />
          <Badge label="Media" tone="medium" />
          <Badge label="Baja" tone="low" />
        </div>
      </section>
    </aside>
  );
}
