// src/pages/DashboardPage.jsx
import { useEffect, useState } from "react";
import api from "../api/client";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Pagination from "../components/Pagination";
import Toast from "../components/Toast";
import SignalModal from "../components/SignalModal";

function riskChip(level) {
  return {
    LOW: "chip chip-low",
    MEDIUM: "chip chip-medium",
    HIGH: "chip chip-high",
  }[level] || "chip chip-medium";
}

function statusChip(status) {
  return {
    OPEN: "chip chip-open",
    CLOSED: "chip-closed",
    CANCELLED: "chip-cancelled",
  }[status] || "chip chip-open";
}

function formatPct(value) {
  if (value == null) return "—";
  const pct = Number(value) * 100;
  return Number.isNaN(pct) ? "—" : pct.toFixed(2) + "%";
}

export default function DashboardPage({ user, onLogout }) {
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    symbol: "",
    risk_level: "",
    status: "",
    sort: "created_at_desc",
  });

  const [meta, setMeta] = useState({ page: 1, limit: 10, total: null });

  const [form, setForm] = useState({
    title: "",
    symbol: "",
    entry_price: "",
    target_price: "",
    stop_loss: "",
    risk_level: "MEDIUM",
    status: "OPEN",
  });

  const [selectedSignal, setSelectedSignal] = useState(null);
  const [toast, setToast] = useState("");

  // auto-hide toast
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const fetchSignals = async (page = 1) => {
    try {
      setLoading(true);
      setError("");
      const { data } = await api.get("/signals", {
        params: { page, limit: meta.limit, ...filters },
      });

      setSignals(data.signals || []);
      setMeta({
        page: data.page || page,
        limit: data.limit || meta.limit,
        total: data.total ?? null, // backend may or may not send this
      });
    } catch (err) {
      setError("Failed to load trade signals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSignals(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateSignal = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/signals", {
        ...form,
        entry_price: Number(form.entry_price),
        target_price: Number(form.target_price),
        stop_loss: Number(form.stop_loss),
      });

      setForm({
        title: "",
        symbol: "",
        entry_price: "",
        target_price: "",
        stop_loss: "",
        risk_level: "MEDIUM",
        status: "OPEN",
      });

      setToast("Signal created successfully");
      fetchSignals(1);
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to create signal";
      setError(msg);
      setToast(msg);
    }
  };

  const handleDeleteSignal = async (id) => {
    if (!window.confirm("Delete this signal?")) return;
    try {
      await api.delete(`/signals/${id}`);
      setToast("Signal deleted");
      fetchSignals(meta.page);
    } catch {
      const msg = "Failed to delete signal";
      setError(msg);
      setToast(msg);
    }
  };

  const handleChangePage = (newPage) => {
    if (newPage === meta.page) return;
    fetchSignals(newPage);
  };

  return (
    <>
      {/* Web3 glowing background */}
      <div className="web3-aura" />

      {/* Sidebar */}
      <Sidebar active="signals" />

      {/* Main content */}
      <div style={{ marginLeft: "210px" }}>
        <Header user={user} onLogout={onLogout} />

        <div className="dashboard-container">
          {/* Title */}
          <div style={{ marginBottom: "1.5rem" }}>
            <h1 className="dashboard-title">Signals Overview</h1>
            <p className="dashboard-subtitle">
              Track and manage internal crypto trade signals.
            </p>
          </div>

          {/* STATS CARDS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            <div className="card">
              <h3 className="card-title">Total Signals</h3>
              <p style={{ fontSize: "2rem", marginTop: "0.5rem" }}>
                {signals.length}
              </p>
            </div>

            <div className="card">
              <h3 className="card-title">Active Trades</h3>
              <p style={{ fontSize: "2rem", marginTop: "0.5rem" }}>
                {signals.filter((s) => s.status === "OPEN").length}
              </p>
            </div>

            <div className="card">
              <h3 className="card-title">Avg Risk Level</h3>
              <p style={{ fontSize: "2rem", marginTop: "0.5rem" }}>
                {signals.length === 0
                  ? "—"
                  : Math.round(
                      signals.reduce(
                        (acc, s) =>
                          acc +
                          (s.risk_level === "HIGH"
                            ? 3
                            : s.risk_level === "MEDIUM"
                            ? 2
                            : 1),
                        0
                      ) / signals.length
                    )}
              </p>
            </div>
          </div>

          {/* GRID LAYOUT: TABLE + FORM */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.7fr 1fr",
              gap: "2rem",
            }}
          >
            {/* LEFT SIDE – SIGNAL TABLE */}
            <section className="card">
              <h2 className="card-title">Trade Signals</h2>
              <p className="card-subtitle">View, filter, and manage signals.</p>

              {/* FILTER BAR — ONE LINE */}
              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  marginBottom: "1rem",
                  alignItems: "center",
                  flexWrap: "nowrap",
                }}
              >
                <input
                  placeholder="Symbol (BTCUSDT)"
                  value={filters.symbol}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, symbol: e.target.value }))
                  }
                  style={{ width: "180px" }}
                />

                <select
                  value={filters.risk_level}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, risk_level: e.target.value }))
                  }
                  style={{ width: "150px" }}
                >
                  <option value="">Risk</option>
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>

                <select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, status: e.target.value }))
                  }
                  style={{ width: "150px" }}
                >
                  <option value="">Status</option>
                  <option value="OPEN">Open</option>
                  <option value="CLOSED">Closed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>

                <button
                  className="btn"
                  style={{ width: "120px" }}
                  onClick={() => fetchSignals(1)}
                >
                  Apply
                </button>
              </div>

              {error && (
                <p style={{ color: "#ef4444", marginBottom: "0.5rem" }}>
                  {error}
                </p>
              )}

              {/* TABLE OR SKELETONS */}
              {loading ? (
                <div>
                  <div className="skeleton" style={{ marginBottom: "0.5rem" }} />
                  <div className="skeleton" style={{ marginBottom: "0.5rem" }} />
                  <div className="skeleton" style={{ marginBottom: "0.5rem" }} />
                </div>
              ) : (
                <>
                  <table>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Symbol</th>
                        <th>Entry</th>
                        <th>Target</th>
                        <th>Stop</th>
                        <th>Risk</th>
                        <th>Status</th>
                        <th>Perf</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {signals.length === 0 && (
                        <tr>
                          <td colSpan="9">No signals found.</td>
                        </tr>
                      )}

                      {signals.map((s) => (
                        <tr key={s.id}>
                          <td>{s.title}</td>
                          <td>{s.symbol}</td>
                          <td>{s.entry_price}</td>
                          <td>{s.target_price}</td>
                          <td>{s.stop_loss}</td>
                          <td>
                            <span className={riskChip(s.risk_level)}>
                              {s.risk_level}
                            </span>
                          </td>
                          <td>
                            <span className={statusChip(s.status)}>
                              {s.status}
                            </span>
                          </td>
                          <td>{formatPct(s.performance_score)}</td>
                          <td>
                            <div
                              style={{
                                display: "flex",
                                gap: "0.5rem",
                                justifyContent: "flex-end",
                              }}
                            >
                              <button
                                className="btn-secondary btn-small"
                                onClick={() => setSelectedSignal(s)}
                              >
                                View
                              </button>
                              <button
                                className="btn-secondary btn-small"
                                onClick={() => handleDeleteSignal(s.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Pagination */}
                  <Pagination
                    page={meta.page}
                    limit={meta.limit}
                    total={meta.total}
                    hasMore={meta.total == null && signals.length === meta.limit}
                    onChange={handleChangePage}
                  />
                </>
              )}
            </section>

            {/* RIGHT SIDE – CREATE SIGNAL FORM */}
            <aside className="card">
              <h2 className="card-title">Create Signal</h2>
              <p className="card-subtitle">
                Log new trades with target, stop, and risk.
              </p>

              <form onSubmit={handleCreateSignal}>
                <label>Title</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                />

                <label>Symbol</label>
                <input
                  required
                  value={form.symbol}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, symbol: e.target.value }))
                  }
                />

                <label>Entry Price</label>
                <input
                  type="number"
                  required
                  value={form.entry_price}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, entry_price: e.target.value }))
                  }
                />

                <label>Target Price</label>
                <input
                  type="number"
                  required
                  value={form.target_price}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, target_price: e.target.value }))
                  }
                />

                <label>Stop Loss</label>
                <input
                  type="number"
                  required
                  value={form.stop_loss}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, stop_loss: e.target.value }))
                  }
                />

                <label>Risk Level</label>
                <select
                  value={form.risk_level}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, risk_level: e.target.value }))
                  }
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>

                <label>Status</label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, status: e.target.value }))
                  }
                >
                  <option value="OPEN">Open</option>
                  <option value="CLOSED">Closed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>

                {error && (
                  <p style={{ color: "#ef4444", marginTop: "0.5rem" }}>
                    {error}
                  </p>
                )}

                <button className="btn" type="submit" style={{ marginTop: "1rem" }}>
                  Save Signal
                </button>
              </form>
            </aside>
          </div>
        </div>
      </div>

      {/* Modal + Toast */}
      <SignalModal signal={selectedSignal} onClose={() => setSelectedSignal(null)} />
      <Toast message={toast} />
    </>
  );
}
