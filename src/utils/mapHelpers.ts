import type { Incident, IncidentPriority } from "@/types/incident";

export const BOGOTA_CENTER = {
  latitude: 4.711,
  longitude: -74.0721,
  zoom: 11.8,
};

export const DEFAULT_PROJECT = {
  id: "project-onboarding",
  name: "Proyecto Onboarding",
};

export function getPriorityColor(priority: IncidentPriority) {
  switch (priority) {
    case "high":
      return "#e34b4b";
    case "medium":
      return "#f2b84b";
    case "low":
    default:
      return "#5d7cff";
  }
}

export function buildDefaultCoordinates() {
  const latOffset = (Math.random() - 0.5) * 0.08;
  const lngOffset = (Math.random() - 0.5) * 0.08;

  return {
    lat: Number((BOGOTA_CENTER.latitude + latOffset).toFixed(6)),
    lng: Number((BOGOTA_CENTER.longitude + lngOffset).toFixed(6)),
  };
}

export function getMapBounds(incidents: Incident[]) {
  if (incidents.length === 0) {
    return null;
  }

  const latitudes = incidents.map((incident) => incident.coordinates.lat);
  const longitudes = incidents.map((incident) => incident.coordinates.lng);

  return {
    minLat: Math.min(...latitudes),
    maxLat: Math.max(...latitudes),
    minLng: Math.min(...longitudes),
    maxLng: Math.max(...longitudes),
  };
}
