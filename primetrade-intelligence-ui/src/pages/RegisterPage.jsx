import { useState } from "react";
import api from "../api/client";

export default function RegisterPage({ onSuccess, onSwitchLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/register", form);
      onSuccess(res.data.user, res.data.token);
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create your account</h2>
        <p className="auth-subtitle">
          Backend auth + professional UI for the assignment.
        </p>

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            required
            placeholder="Shreya Katare"
            value={form.name}
            onChange={(e) =>
              setForm((f) => ({ ...f, name: e.target.value }))
            }
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="you@primetrade.ai"
            required
            value={form.email}
            onChange={(e) =>
              setForm((f) => ({ ...f, email: e.target.value }))
            }
          />

          <label>Password</label>
          <input
            type="password"
            required
            placeholder="••••••••"
            value={form.password}
            onChange={(e) =>
              setForm((f) => ({ ...f, password: e.target.value }))
            }
          />

          {error && (
            <p style={{ color: "#ef4444", marginTop: "0.5rem" }}>{error}</p>
          )}

          <button className="btn" type="submit">
            Register
          </button>
        </form>

        <p className="auth-link">
          Already have an account?{" "}
          <span onClick={onSwitchLogin}>Login</span>
        </p>
      </div>
    </div>
  );
}
