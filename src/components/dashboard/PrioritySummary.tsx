import { Badge } from "@/components/ui/Badge";
import { getPriorityLabel, getPriorityVariant } from "@/utils/incidentLabels";

interface PrioritySummaryProps {
  summary: Record<string, number>;
}

export default function PrioritySummary({ summary }: PrioritySummaryProps) {
  return (
    <section className="summary-card">
      <div className="summary-card__header">
        <p className="section-eyebrow">Resumen</p>
        <h3>Por prioridad</h3>
      </div>
      <div className="summary-card__rows">
        {["high", "medium", "low"].map((key) => (
          <div className="summary-row" key={key}>
            <Badge
              label={getPriorityLabel(key as "high" | "medium" | "low")}
              tone={getPriorityVariant(key as "high" | "medium" | "low")}
            />
            <strong>{summary[key] ?? 0}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
