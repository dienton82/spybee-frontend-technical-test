interface StatsCardProps {
  label: string;
  value: number;
  helper: string;
}

export default function StatsCard({ label, value, helper }: StatsCardProps) {
  return (
    <article className="stats-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{helper}</p>
    </article>
  );
}
