"use client";

import { create } from "zustand";

import type { Incident, IncidentFilters } from "@/types/incident";
import { applyIncidentFilters, defaultFilters } from "@/utils/incidentStats";

const LOCAL_STORAGE_KEY = "spybee-incidents";

interface IncidentStoreState {
  incidents: Incident[];
  filteredIncidents: Incident[];
  selectedIncident: Incident | null;
  filters: IncidentFilters;
  isCreateModalOpen: boolean;
  setIncidents: (incidents: Incident[]) => void;
  addIncident: (incident: Incident) => void;
  selectIncident: (incident: Incident | null) => void;
  setFilters: (filters: Partial<IncidentFilters>) => void;
  clearFilters: () => void;
  openCreateModal: () => void;
  closeCreateModal: () => void;
}

function persistIncidents(incidents: Incident[]) {
  if (typeof window === "undefined") {
    return;
  }

  const stored = incidents.filter((incident) => incident.id.startsWith("local-"));
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stored));
}

function sortIncidents(incidents: Incident[]) {
  return [...incidents].sort((left, right) => {
    return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
  });
}

export function mergeIncidentsById(
  baseIncidents: Incident[],
  localIncidents: Incident[],
) {
  const dictionary = new Map<string, Incident>();

  [...baseIncidents, ...localIncidents].forEach((incident) => {
    dictionary.set(incident.id, incident);
  });

  return sortIncidents(Array.from(dictionary.values()));
}

export function loadPersistedIncidents() {
  if (typeof window === "undefined") {
    return [] as Incident[];
  }

  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      return [] as Incident[];
    }

    const parsed = JSON.parse(raw) as Incident[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [] as Incident[];
  }
}

export function hydrateIncidents(baseIncidents: Incident[]) {
  const persistedIncidents = loadPersistedIncidents();
  return mergeIncidentsById(baseIncidents, persistedIncidents);
}

export const useIncidentStore = create<IncidentStoreState>((set, get) => ({
  incidents: [],
  filteredIncidents: [],
  selectedIncident: null,
  filters: defaultFilters,
  isCreateModalOpen: false,
  setIncidents: (incidents) => {
    const merged = sortIncidents(incidents);
    const filtered = applyIncidentFilters(merged, get().filters);

    set({
      incidents: merged,
      filteredIncidents: filtered,
    });

    persistIncidents(merged);
  },
  addIncident: (incident) => {
    const incidents = sortIncidents([incident, ...get().incidents]);
    const filtered = applyIncidentFilters(incidents, get().filters);

    set({
      incidents,
      filteredIncidents: filtered,
      isCreateModalOpen: false,
      selectedIncident: incident,
    });

    persistIncidents(incidents);
  },
  selectIncident: (incident) => {
    set({ selectedIncident: incident });
  },
  setFilters: (filters) => {
    const nextFilters = { ...get().filters, ...filters };
    set({
      filters: nextFilters,
      filteredIncidents: applyIncidentFilters(get().incidents, nextFilters),
    });
  },
  clearFilters: () => {
    set({
      filters: defaultFilters,
      filteredIncidents: applyIncidentFilters(get().incidents, defaultFilters),
    });
  },
  openCreateModal: () => {
    set({ isCreateModalOpen: true });
  },
  closeCreateModal: () => {
    set({ isCreateModalOpen: false });
  },
}));
