// src/components/Pagination.jsx
export default function Pagination({ page, limit, total, hasMore, onChange }) {
  const totalPages = total
    ? Math.max(1, Math.ceil(total / limit))
    : null;

  const canPrev = page > 1;
  const canNext = totalPages ? page < totalPages : !!hasMore;

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        marginTop: "1rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        className="btn-secondary btn-small"
        disabled={!canPrev}
        onClick={() => canPrev && onChange(page - 1)}
      >
        Previous
      </button>

      <span style={{ color: "var(--subtext)", fontSize: "0.85rem" }}>
        Page {page}
        {totalPages && ` / ${totalPages}`}
      </span>

      <button
        className="btn-secondary btn-small"
        disabled={!canNext}
        onClick={() => canNext && onChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
