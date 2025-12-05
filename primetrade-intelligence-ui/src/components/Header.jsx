import ThemeToggle from "./ThemeToggle";

export default function Header({ user, onLogout }) {
  return (
    <header
      style={{
        background: "var(--bg-secondary)",
        borderBottom: "1px solid var(--border)",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <h2 style={{ fontSize: "1.3rem", fontWeight: 600 }}>
        PrimeTrade
        <span style={{ color: "var(--primary)" }}> Intelligence</span>
      </h2>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <ThemeToggle />
        <span style={{ color: "var(--subtext)", fontSize: "0.9rem" }}>
          {user?.email}
        </span>
        <button className="btn-secondary" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
