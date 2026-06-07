import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate("/"); };

  const links = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/analyze", label: "Analyze" },
    { path: "/history", label: "History" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(5,8,16,0.85)", backdropFilter: "blur(20px)",
      borderBottom: "1px solid var(--border)", padding: "0 24px", height: 64,
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <Link to="/dashboard" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 32, height: 32, background: "var(--accent)", borderRadius: 8,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, fontWeight: 700, color: "white",
        }}>R</div>
        <span style={{ fontWeight: 700, fontSize: 18, color: "var(--text)" }}>
          Resume<span style={{ color: "var(--accent2)" }}>IQ</span>
        </span>
      </Link>

      <div style={{ display: "flex", gap: 4 }}>
        {links.map(({ path, label }) => (
          <Link key={path} to={path} style={{
            textDecoration: "none", padding: "6px 16px", borderRadius: 8,
            fontSize: 14, fontWeight: 500, transition: "all 0.2s",
            color: location.pathname === path ? "var(--accent2)" : "var(--text2)",
            background: location.pathname === path ? "rgba(99,102,241,0.1)" : "transparent",
          }}>{label}</Link>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 14, color: "var(--text2)" }}>
          Hey, <strong style={{ color: "var(--text)" }}>{user?.name?.split(" ")[0]}</strong>
        </span>
        <button className="btn btn-outline" style={{ padding: "6px 16px" }} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
