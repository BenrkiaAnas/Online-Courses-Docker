import React, { useState } from "react";
import { authApi } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await authApi.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Se connecter</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            name="email"
            type="email"
            onChange={handleChange}
            required
          />
          <label>Mot de passe</label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            required
          />
          <button type="submit">Connexion</button>
        </form>
        <p className="link-text">
          Pas encore inscrit ? <Link to="/register">Créer un compte</Link>
        </p>
      </div>
    </div>
  );
}
