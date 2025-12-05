// src/components/SignalModal.jsx
function formatPct(value) {
  if (value == null) return "—";
  const pct = Number(value) * 100;
  return Number.isNaN(pct) ? "—" : pct.toFixed(2) + "%";
}

export default function SignalModal({ signal, onClose }) {
  if (!signal) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.65)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
      onClick={onClose}
    >
      <div
        className="card"
        style={{
          width: "420px",
          maxWidth: "90vw",
          background: "var(--bg-secondary)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="card-title">{signal.title}</h2>
        <p className="card-subtitle">Full trade details</p>

        <p><strong>Symbol:</strong> {signal.symbol}</p>
        <p><strong>Entry:</strong> {signal.entry_price}</p>
        <p><strong>Target:</strong> {signal.target_price}</p>
        <p><strong>Stop loss:</strong> {signal.stop_loss}</p>
        <p><strong>Risk level:</strong> {signal.risk_level}</p>
        <p><strong>Status:</strong> {signal.status}</p>
        <p style={{ marginTop: "0.75rem" }}>
          <strong>Performance score:</strong> {formatPct(signal.performance_score)}
        </p>

        <button
          className="btn"
          type="button"
          style={{ marginTop: "1rem" }}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
