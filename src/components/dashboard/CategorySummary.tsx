interface CategorySummaryProps {
  summary: Record<string, number>;
}

export default function CategorySummary({ summary }: CategorySummaryProps) {
  const categories = Object.entries(summary)
    .sort((left, right) => right[1] - left[1])
    .slice(0, 6);

  return (
    <section className="summary-card">
      <div className="summary-card__header">
        <p className="section-eyebrow">Resumen</p>
        <h3>Por categoria</h3>
      </div>
      <div className="summary-card__rows summary-card__rows--scroll">
        {categories.map(([category, value]) => (
          <div className="summary-row" key={category}>
            <span className="summary-row__text">{category}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
