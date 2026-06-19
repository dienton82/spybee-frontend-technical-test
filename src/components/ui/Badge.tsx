import type { IncidentPriority, IncidentStatus } from "@/types/incident";

type BadgeTone = IncidentPriority | IncidentStatus | "neutral";

interface BadgeProps {
  label: string;
  tone?: BadgeTone;
}

export function Badge({ label, tone = "neutral" }: BadgeProps) {
  return <span className={`ui-badge ui-badge--${tone}`}>{label}</span>;
}
