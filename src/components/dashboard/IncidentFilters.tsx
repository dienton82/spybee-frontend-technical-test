"use client";

import type { IncidentFilters as IncidentFiltersType } from "@/types/incident";

interface IncidentFiltersProps {
  categories: string[];
  filters: IncidentFiltersType;
  projects: string[];
  onChange: (filters: Partial<IncidentFiltersType>) => void;
  onClear: () => void;
}

export default function IncidentFilters({
  categories,
  filters,
  projects,
  onChange,
  onClear,
}: IncidentFiltersProps) {
  return (
    <section className="filters">
      <div className="filters__header">
        <div>
          <p className="section-eyebrow">Filtros</p>
          <h3>Explora incidencias</h3>
        </div>
        <button className="filters__clear" onClick={onClear} type="button">
          Limpiar
        </button>
      </div>

      <div className="filters__grid">
        <label>
          <span>Estado</span>
          <select
            className="form-control form-control--select"
            onChange={(event) => onChange({ status: event.target.value as IncidentFiltersType["status"] })}
            value={filters.status}
          >
            <option value="all">Todos</option>
            <option value="open">Abiertas</option>
            <option value="closed">Cerradas</option>
            <option value="on_pause">En pausa</option>
          </select>
        </label>

        <label>
          <span>Prioridad</span>
          <select
            className="form-control form-control--select"
            onChange={(event) =>
              onChange({ priority: event.target.value as IncidentFiltersType["priority"] })
            }
            value={filters.priority}
          >
            <option value="all">Todas</option>
            <option value="high">Alta</option>
            <option value="medium">Media</option>
            <option value="low">Baja</option>
          </select>
        </label>

        <label>
          <span>Categoria</span>
          <select
            className="form-control form-control--select"
            onChange={(event) => onChange({ category: event.target.value })}
            value={filters.category}
          >
            <option value="">Todas</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Proyecto</span>
          <select
            className="form-control form-control--select"
            onChange={(event) => onChange({ project: event.target.value })}
            value={filters.project}
          >
            <option value="">Todos</option>
            {projects.map((project) => (
              <option key={project} value={project}>
                {project}
              </option>
            ))}
          </select>
        </label>

        <label className="filters__search">
          <span>Busqueda</span>
          <input
            className="form-control"
            onChange={(event) => onChange({ query: event.target.value })}
            placeholder="Titulo, descripcion o ubicacion"
            value={filters.query}
          />
        </label>
      </div>
    </section>
  );
}
