import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const ScoreRing = ({ score, label, color }) => {
  const r = 36, cx = 44, cy = 44;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;

  return (
    <div style={{ textAlign: "center" }}>
      <svg width={88} height={88} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--border)" strokeWidth={6} />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={6}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          style={{ transition: "stroke-dasharray 1s ease" }} />
      </svg>
      <div style={{ marginTop: -60, marginBottom: 36, fontSize: 20, fontWeight: 700, color }}>{score}</div>
      <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 4 }}>{label}</div>
    </div>
  );
};

export default function Dashboard() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${API}/history`).then(r => setHistory(r.data)).finally(() => setLoading(false));
  }, []);

  const latest = history[0];

  const getScoreColor = (s) => s >= 75 ? "var(--green)" : s >= 50 ? "var(--yellow)" : "var(--red)";
  const getVerdict = (s) => s >= 75 ? ["Strong", "badge-green"] : s >= 50 ? ["Moderate", "badge-yellow"] : ["Needs Work", "badge-red"];

  return (
    <div style={{ paddingTop: 88, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700 }}>
              Good to see you, {user?.name?.split(" ")[0]} 👋
            </h1>
            <p style={{ color: "var(--text2)", marginTop: 6 }}>
              {history.length === 0 ? "Upload your first resume to get started" : `You have ${history.length} resume analysis${history.length > 1 ? "es" : ""}`}
            </p>
          </div>
          <Link to="/analyze" className="btn btn-primary">
            + Analyze New Resume
          </Link>
        </div>

        {/* Latest Analysis */}
        {latest && (
          <div className="card" style={{ marginBottom: 24, background: "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(99,102,241,0.02))", borderColor: "rgba(99,102,241,0.3)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ fontSize: 12, color: "var(--accent2)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Latest Analysis</div>
                <div style={{ fontSize: 18, fontWeight: 600, marginTop: 4 }}>{latest.fileName}</div>
                {latest.targetRole && <div style={{ fontSize: 13, color: "var(--text2)", marginTop: 2 }}>Target: {latest.targetRole}</div>}
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span className={`badge ${getVerdict(latest.overallScore)[1]}`}>{getVerdict(latest.overallScore)[0]}</span>
                <span className="badge badge-blue">{latest.experienceLevel}</span>
                <Link to={`/results/${latest._id}`} className="btn btn-outline" style={{ padding: "6px 16px" }}>
                  View Full Report →
                </Link>
              </div>
            </div>
            <div style={{ display: "flex", gap: 40, justifyContent: "center", flexWrap: "wrap" }}>
              <ScoreRing score={latest.atsScore} label="ATS Score" color={getScoreColor(latest.atsScore)} />
              <ScoreRing score={latest.skillMatchScore} label="Skill Match" color={getScoreColor(latest.skillMatchScore)} />
              <ScoreRing score={latest.overallScore} label="Overall" color={getScoreColor(latest.overallScore)} />
            </div>
          </div>
        )}

        {/* Stats Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
          {[
            { label: "Total Analyses", value: history.length, icon: "📄" },
            { label: "Best ATS Score", value: history.length ? Math.max(...history.map(h => h.atsScore)) : "--", icon: "🎯" },
            { label: "Best Overall", value: history.length ? Math.max(...history.map(h => h.overallScore)) : "--", icon: "⭐" },
            { label: "Avg Score", value: history.length ? Math.round(history.reduce((a, h) => a + h.overallScore, 0) / history.length) : "--", icon: "📊" },
          ].map(({ label, value, icon }) => (
            <div className="card" key={label}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: "var(--accent2)" }}>{value}</div>
              <div style={{ fontSize: 13, color: "var(--text2)", marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!loading && history.length === 0 && (
          <div className="card" style={{ textAlign: "center", padding: "60px 24px" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📄</div>
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>No analyses yet</h3>
            <p style={{ color: "var(--text2)", marginBottom: 24 }}>Upload your resume and get instant AI feedback</p>
            <Link to="/analyze" className="btn btn-primary">Analyze My Resume</Link>
          </div>
        )}

        {/* Recent History Table */}
        {history.length > 0 && (
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 600 }}>Recent Analyses</h2>
              <Link to="/history" style={{ color: "var(--accent2)", textDecoration: "none", fontSize: 14 }}>View all →</Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {history.slice(0, 5).map(h => (
                <Link key={h._id} to={`/results/${h._id}`} style={{ textDecoration: "none" }}>
                  <div className="card card-hover" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 16, flexWrap: "wrap", gap: 12 }}>
                    <div>
                      <div style={{ fontWeight: 500 }}>{h.fileName}</div>
                      <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 2 }}>
                        {new Date(h.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        {h.targetRole && ` · ${h.targetRole}`}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span className={`badge ${getVerdict(h.overallScore)[1]}`}>{h.overallScore}/100</span>
                      <span style={{ fontSize: 12, color: "var(--text3)" }}>ATS: {h.atsScore}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
