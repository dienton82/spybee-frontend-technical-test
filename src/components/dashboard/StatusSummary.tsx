import { Badge } from "@/components/ui/Badge";
import { getStatusLabel, getStatusVariant } from "@/utils/incidentLabels";

interface StatusSummaryProps {
  summary: Record<string, number>;
}

export default function StatusSummary({ summary }: StatusSummaryProps) {
  return (
    <section className="summary-card">
      <div className="summary-card__header">
        <p className="section-eyebrow">Resumen</p>
        <h3>Por estado</h3>
      </div>
      <div className="summary-card__rows">
        {(["open", "closed", "on_pause"] as const).map((status) => (
          <div className="summary-row" key={status}>
            <Badge
              label={getStatusLabel(status)}
              tone={getStatusVariant(status)}
            />
            <strong>{summary[status] ?? 0}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
