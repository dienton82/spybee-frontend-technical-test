"use client";

import "mapbox-gl/dist/mapbox-gl.css";

import { useEffect, useMemo, useRef, useState } from "react";
import Map, { NavigationControl, Popup } from "react-map-gl/mapbox";
import type { MapRef, ViewState } from "react-map-gl/mapbox";

import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Incident } from "@/types/incident";
import { formatDate } from "@/utils/formatDate";
import {
  getPriorityLabel,
  getPriorityVariant,
  getStatusLabel,
  getStatusVariant,
} from "@/utils/incidentLabels";
import { BOGOTA_CENTER } from "@/utils/mapHelpers";

import IncidentMarker from "./IncidentMarker";
import MapControls from "./MapControls";

interface IncidentMapProps {
  incidents: Incident[];
  selectedIncident: Incident | null;
  onSelectIncident: (incident: Incident | null) => void;
  onCreateIncident: () => void;
}

export default function IncidentMap({
  incidents,
  selectedIncident,
  onSelectIncident,
  onCreateIncident,
}: IncidentMapProps) {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const mapRef = useRef<MapRef | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [viewState, setViewState] = useState<ViewState>({
    latitude: BOGOTA_CENTER.latitude,
    longitude: BOGOTA_CENTER.longitude,
    zoom: BOGOTA_CENTER.zoom,
    bearing: 0,
    pitch: 0,
    padding: { top: 0, bottom: 0, left: 0, right: 0 },
  });

  const popup = useMemo(() => selectedIncident, [selectedIncident]);

  useEffect(() => {
    if (!selectedIncident || !token) {
      return;
    }

    mapRef.current?.flyTo({
      center: [
        selectedIncident.coordinates.lng,
        selectedIncident.coordinates.lat,
      ],
      zoom: Math.max(viewState.zoom, 13),
      duration: 900,
    });
  }, [selectedIncident, token, viewState.zoom]);

  const handleCenterMap = () => {
    mapRef.current?.flyTo({
      center: [BOGOTA_CENTER.longitude, BOGOTA_CENTER.latitude],
      zoom: BOGOTA_CENTER.zoom,
      duration: 1200,
    });
  };

  if (!token) {
    return (
      <section className="map-panel__fallback">
        <MapControls
          count={incidents.length}
          onCenterMap={handleCenterMap}
          onCreateIncident={onCreateIncident}
        />
        <EmptyState
          title="Configura NEXT_PUBLIC_MAPBOX_TOKEN para visualizar el mapa."
          description="La gestion de incidencias, el dashboard y la persistencia local siguen disponibles mientras configuras Mapbox."
        />
      </section>
    );
  }

  if (mapError) {
    return (
      <section className="map-panel__fallback">
        <MapControls
          count={incidents.length}
          onCenterMap={handleCenterMap}
          onCreateIncident={onCreateIncident}
        />
        <EmptyState
          title="No pudimos cargar el mapa."
          description={mapError}
        />
      </section>
    );
  }

  return (
    <div className="map-panel">
      <MapControls
        count={incidents.length}
        onCenterMap={handleCenterMap}
        onCreateIncident={onCreateIncident}
      />

      <Map
        {...viewState}
        ref={mapRef}
        attributionControl={false}
        initialViewState={BOGOTA_CENTER}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={token}
        onError={(event) => {
          setMapError(event.error.message);
        }}
        onMove={(event) => setViewState(event.viewState)}
      >
        <NavigationControl position="top-right" />

        {incidents.map((incident) => (
          <IncidentMarker
            key={incident.id}
            isActive={selectedIncident?.id === incident.id}
            latitude={incident.coordinates.lat}
            longitude={incident.coordinates.lng}
            onClick={() => onSelectIncident(incident)}
            priority={incident.priority}
            title={incident.title}
          />
        ))}

        {popup ? (
          <Popup
            anchor="top"
            closeButton={false}
            closeOnClick={false}
            latitude={popup.coordinates.lat}
            longitude={popup.coordinates.lng}
            maxWidth="320px"
            offset={28}
            onClose={() => onSelectIncident(null)}
          >
            <article className="map-popup">
              <div className="map-popup__header">
                <span>{popup.sequenceId}</span>
                {popup.dueDate ? <small>{formatDate(popup.dueDate)}</small> : null}
              </div>
              <h3 className="map-popup__title">{popup.title}</h3>
              <p className="map-popup__location">{popup.locationDescription}</p>
              <div className="map-popup__badges">
                <Badge
                  label={getPriorityLabel(popup.priority)}
                  tone={getPriorityVariant(popup.priority)}
                />
                <Badge
                  label={getStatusLabel(popup.status)}
                  tone={getStatusVariant(popup.status)}
                />
              </div>
              <dl className="map-popup__meta">
                <div>
                  <dt>Categoria</dt>
                  <dd>{popup.type.name}</dd>
                </div>
                <div>
                  <dt>Prioridad</dt>
                  <dd>{getPriorityLabel(popup.priority)}</dd>
                </div>
                <div>
                  <dt>Estado</dt>
                  <dd>{getStatusLabel(popup.status)}</dd>
                </div>
                <div>
                  <dt>Proyecto</dt>
                  <dd>{popup.project.name}</dd>
                </div>
                {popup.dueDate ? (
                  <div>
                    <dt>Vencimiento</dt>
                    <dd>{formatDate(popup.dueDate)}</dd>
                  </div>
                ) : null}
              </dl>
            </article>
          </Popup>
        ) : null}
      </Map>
    </div>
  );
}
