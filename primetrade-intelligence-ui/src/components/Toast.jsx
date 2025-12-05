// src/components/Toast.jsx
export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "var(--bg-secondary)",
        padding: "0.9rem 1.4rem",
        borderRadius: "10px",
        border: "1px solid var(--border)",
        color: "var(--primary)",
        fontWeight: 500,
        boxShadow: "0 0 20px rgba(59,130,246,0.3)",
        animation: "fadeIn 0.3s ease-out",
        zIndex: 1000,
      }}
    >
      {message}
    </div>
  );
}
