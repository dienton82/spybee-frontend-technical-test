"use client";

import { useEffect, useMemo, useRef } from "react";

import CreateIncidentModal from "@/components/incidents/CreateIncidentModal";
import Dashboard from "@/components/dashboard/Dashboard";
import StatsCard from "@/components/dashboard/StatsCard";
import IncidentList from "@/components/incidents/IncidentList";
import IncidentMap from "@/components/map/IncidentMap";
import type { CreateIncidentInput, Incident, IncidentType } from "@/types/incident";
import {
  hydrateIncidents,
  useIncidentStore,
} from "@/store/useIncidentStore";
import { applyIncidentFilters, getDashboardStats } from "@/utils/incidentStats";
import { getPriorityLabel, getStatusLabel } from "@/utils/incidentLabels";
import { DEFAULT_PROJECT, buildDefaultCoordinates } from "@/utils/mapHelpers";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface AppShellProps {
  initialIncidents: Incident[];
}

const fallbackOwner = {
  id: "owner-local",
  name: "Equipo Spybee",
  email: "team@spybee.local",
  avatarUrl: "",
};

function buildIncidentType(category: string, incidents: Incident[]): IncidentType {
  const existingType = incidents.find((incident) => incident.type.name === category)?.type;

  if (existingType) {
    return existingType;
  }

  const key = category.toLowerCase().replace(/\s+/g, "_");

  return {
    id: `type-${key}`,
    key,
    name: category,
    name_en: category,
  };
}

function buildSequenceId(incidents: Incident[]) {
  const max = incidents.reduce((highest, incident) => {
    const match = incident.sequenceId.match(/(\d+)$/);
    const current = match ? Number(match[1]) : 0;
    return Math.max(highest, current);
  }, 0);

  return `INC-${String(max + 1).padStart(3, "0")}`;
}

export default function AppShell({ initialIncidents }: AppShellProps) {
  const hydrated = useRef(false);

  const incidents = useIncidentStore((state) => state.incidents);
  const filteredIncidents = useIncidentStore((state) => state.filteredIncidents);
  const selectedIncident = useIncidentStore((state) => state.selectedIncident);
  const filters = useIncidentStore((state) => state.filters);
  const isCreateModalOpen = useIncidentStore((state) => state.isCreateModalOpen);
  const setIncidents = useIncidentStore((state) => state.setIncidents);
  const addIncident = useIncidentStore((state) => state.addIncident);
  const selectIncident = useIncidentStore((state) => state.selectIncident);
  const setFilters = useIncidentStore((state) => state.setFilters);
  const clearFilters = useIncidentStore((state) => state.clearFilters);
  const openCreateModal = useIncidentStore((state) => state.openCreateModal);
  const closeCreateModal = useIncidentStore((state) => state.closeCreateModal);

  useEffect(() => {
    if (hydrated.current) {
      return;
    }

    hydrated.current = true;
    setIncidents(hydrateIncidents(initialIncidents));
  }, [initialIncidents, setIncidents]);

  const activeIncidents = incidents.length > 0 ? incidents : initialIncidents;
  const activeFilteredIncidents =
    incidents.length > 0
      ? filteredIncidents
      : applyIncidentFilters(initialIncidents, filters);
  const dashboardStats = getDashboardStats(activeFilteredIncidents);
  const activeFilterChips = [
    filters.status !== "all" ? `Estado: ${getStatusLabel(filters.status)}` : null,
    filters.priority !== "all"
      ? `Prioridad: ${getPriorityLabel(filters.priority)}`
      : null,
    filters.category ? `Categoria: ${filters.category}` : null,
    filters.project ? `Proyecto: ${filters.project}` : null,
    filters.query ? `Busqueda: ${filters.query}` : null,
  ].filter(Boolean) as string[];

  const stats = useMemo(() => {
    const openCount = activeIncidents.filter(
      (incident) => incident.status === "open",
    ).length;
    const highPriorityCount = activeIncidents.filter(
      (incident) => incident.priority === "high",
    ).length;

    return {
      openCount,
      highPriorityCount,
    };
  }, [activeIncidents]);

  const handleCreateIncident = (input: CreateIncidentInput) => {
    const now = new Date().toISOString();
    const coordinates =
      typeof input.lat === "number" && typeof input.lng === "number"
        ? { lat: input.lat, lng: input.lng }
        : buildDefaultCoordinates();

    const incident: Incident = {
      id: `local-${crypto.randomUUID()}`,
      sequenceId: buildSequenceId(activeIncidents),
      title: input.title.trim(),
      description: input.description.trim(),
      type: buildIncidentType(input.category.trim(), activeIncidents),
      priority: input.priority,
      status: "open",
      approval: false,
      project: DEFAULT_PROJECT,
      owner: fallbackOwner,
      assignees: [],
      observers: [],
      coordinates,
      locationDescription: input.locationDescription.trim() || "Ubicacion por confirmar",
      dueDate: input.dueDate || null,
      closingDate: null,
      media: [],
      tags: [],
      deleted: false,
      createdAt: now,
      updatedAt: now,
    };

    addIncident(incident);
    closeCreateModal();
  };

  return (
    <div className="app-shell">
      <Sidebar
        highPriorityCount={stats.highPriorityCount}
        onCreateIncident={openCreateModal}
        openCount={stats.openCount}
      />

      <main className="app-shell__main">
        <Topbar
          onCreateIncident={openCreateModal}
          totalIncidents={activeIncidents.length}
        />

        <section className="app-shell__stats" aria-label="Resumen principal">
          <StatsCard helper="Incidencias registradas" label="Total" value={dashboardStats.total} />
          <StatsCard helper="Requieren seguimiento" label="Abiertas" value={dashboardStats.open} />
          <StatsCard helper="Ya resueltas" label="Cerradas" value={dashboardStats.closed} />
          <StatsCard helper="Bloqueadas temporalmente" label="En pausa" value={dashboardStats.onPause} />
          <StatsCard helper="Riesgo alto" label="Alta prioridad" value={dashboardStats.highPriority} />
          <StatsCard helper="Fuera de fecha objetivo" label="Vencidas" value={dashboardStats.overdue} />
        </section>

        <div className="app-shell__workspace">
          <section className="panel panel--map" id="mapa">
            <div className="panel__header">
              <div>
                <p className="section-eyebrow">Vista operativa</p>
                <h2>Mapa de incidencias</h2>
              </div>
              <span className="panel__meta">{activeFilteredIncidents.length} visibles</span>
            </div>
            <IncidentMap
              incidents={activeFilteredIncidents}
              onCreateIncident={openCreateModal}
              onSelectIncident={selectIncident}
              selectedIncident={selectedIncident}
            />
          </section>

          <aside className="panel panel--dashboard" id="dashboard">
            <div className="panel__header">
              <div>
                <p className="section-eyebrow">Analitica</p>
                <h2>Dashboard de incidencias</h2>
              </div>
              <span className="panel__meta">Filtros y resumen</span>
            </div>
            <Dashboard
              filters={filters}
              incidents={activeFilteredIncidents}
              onChangeFilters={setFilters}
              onClearFilters={clearFilters}
            />
          </aside>
        </div>

        <section className="panel panel--feed">
          <div className="dashboard__list-header">
            <div>
              <p className="section-eyebrow">Incident Feed</p>
              <h2>Incidencias filtradas</h2>
            </div>
            <span className="panel__meta">{activeFilteredIncidents.length} resultados</span>
          </div>
          {activeFilterChips.length > 0 ? (
            <div className="dashboard__filter-chips" aria-label="Filtros activos">
              {activeFilterChips.map((chip) => (
                <span className="dashboard__filter-chip" key={chip}>
                  {chip}
                </span>
              ))}
            </div>
          ) : null}
          <IncidentList
            incidents={activeFilteredIncidents}
            onSelect={selectIncident}
            selectedIncidentId={selectedIncident?.id ?? null}
          />
        </section>
      </main>

      <CreateIncidentModal
        incidents={activeIncidents}
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        onSubmit={handleCreateIncident}
      />
    </div>
  );
}
