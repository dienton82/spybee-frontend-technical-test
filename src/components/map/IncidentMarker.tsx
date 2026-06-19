import { Marker } from "react-map-gl/mapbox";

import { getPriorityLabel } from "@/utils/incidentLabels";
import { getPriorityColor } from "@/utils/mapHelpers";

interface IncidentMarkerProps {
  latitude: number;
  longitude: number;
  priority: "low" | "medium" | "high";
  title: string;
  isActive: boolean;
  onClick: () => void;
}

export default function IncidentMarker({
  latitude,
  longitude,
  priority,
  title,
  isActive,
  onClick,
}: IncidentMarkerProps) {
  return (
    <Marker latitude={latitude} longitude={longitude} anchor="bottom">
      <button
        aria-label={`Ver incidencia ${title} con prioridad ${getPriorityLabel(priority)}`}
        className={`marker ${isActive ? "marker--active" : ""}`}
        onClick={onClick}
        style={{ backgroundColor: getPriorityColor(priority) }}
        type="button"
      />
    </Marker>
  );
}
