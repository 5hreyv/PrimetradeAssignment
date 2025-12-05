export default function Sidebar({ active = "signals" }) {
  const itemStyle = (key) => ({
    padding: "0.9rem 1.2rem",
    cursor: "pointer",
    borderRadius: "10px",
    background: active === key ? "#1b2235" : "transparent",
    color: active === key ? "var(--primary)" : "var(--text)",
    fontWeight: 500,
    transition: "0.2s",
    marginBottom: "0.5rem",
    fontSize: "0.9rem",
  });

  return (
    <aside
      style={{
        width: "210px",
        padding: "1.5rem",
        background: "var(--bg-secondary)",
        borderRight: "1px solid var(--border)",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 40,
      }}
    >
      <h3
        style={{
          marginBottom: "1.5rem",
          fontSize: "1rem",
          color: "var(--subtext)",
        }}
      >
        Navigation
      </h3>

      <div style={itemStyle("signals")}>📈 Signals</div>
      <div style={itemStyle("profile")}>👤 Profile</div>
      <div style={itemStyle("settings")}>⚙ Settings</div>
    </aside>
  );
}
