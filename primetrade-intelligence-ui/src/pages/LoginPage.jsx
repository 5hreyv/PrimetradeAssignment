import { useState } from "react";
import api from "../api/client";

export default function LoginPage({ onSuccess, onSwitchRegister }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", form);
      onSuccess(res.data.user, res.data.token);
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-subtitle">
          Log in to access your protected dashboard.
        </p>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="you@primetrade.ai"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            required
            value={form.password}
            onChange={(e) =>
              setForm((f) => ({ ...f, password: e.target.value }))
            }
          />

          {error && (
            <p style={{ color: "#ef4444", marginTop: "0.5rem" }}>{error}</p>
          )}

          <button className="btn" type="submit">
            Login
          </button>
        </form>

        <p className="auth-link">
          New here?{" "}
          <span onClick={onSwitchRegister}>Create an account</span>
        </p>
      </div>
    </div>
  );
}
