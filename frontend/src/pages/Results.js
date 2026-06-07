import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const ScoreCircle = ({ score, size = 120, label }) => {
  const r = size / 2 - 10, cx = size / 2, cy = size / 2;
  const circ = 2 * Math.PI * r;
  const color = score >= 75 ? "#10b981" : score >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <div style={{ textAlign: "center" }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1e293b" strokeWidth={8} />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={8}
          strokeDasharray={`${(score / 100) * circ} ${circ}`} strokeLinecap="round" />
      </svg>
      <div style={{ marginTop: -size / 2 - 16, paddingBottom: size / 2 - 8 }}>
        <div style={{ fontSize: size > 100 ? 28 : 20, fontWeight: 800, color }}>{score}</div>
        <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 2 }}>{label}</div>
      </div>
    </div>
  );
};

const Tag = ({ text, type = "found" }) => (
  <span style={{
    display: "inline-block", padding: "4px 12px", borderRadius: 20, fontSize: 12,
    fontWeight: 500, margin: "3px",
    background: type === "found" ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
    color: type === "found" ? "#10b981" : "#ef4444",
    border: `1px solid ${type === "found" ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)"}`,
  }}>{text}</span>
);

export default function Results() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${API}/history/${id}`).then(r => setData(r.data)).finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div style={{ paddingTop: 88, display: "flex", justifyContent: "center", alignItems: "center", height: "90vh" }}>
      <div style={{ textAlign: "center" }}>
        <div className="spinner" style={{ width: 48, height: 48, margin: "0 auto 16px", borderWidth: 3 }} />
        <p style={{ color: "var(--text2)" }}>Loading report...</p>
      </div>
    </div>
  );

  if (!data) return (
    <div style={{ paddingTop: 88, textAlign: "center", padding: 40 }}>
      <h2>Analysis not found</h2>
      <Link to="/history" className="btn btn-primary" style={{ marginTop: 16 }}>Back to History</Link>
    </div>
  );

  const radarData = [
    { subject: "ATS", value: data.atsScore },
    { subject: "Skills", value: data.skillMatchScore },
    { subject: "Overall", value: data.overallScore },
    { subject: "Role Fit", value: data.roleMatch?.percentage || 0 },
  ];

  const verdictColor = {
    "Strong Match": "#10b981", "Good Match": "#6366f1",
    "Partial Match": "#f59e0b", "Weak Match": "#ef4444",
  };

  return (
    <div style={{ paddingTop: 88, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }} className="fade-in">

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 6 }}>
              {new Date(data.createdAt).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 700 }}>{data.fileName}</h1>
            {data.targetRole && <div style={{ color: "var(--text2)", marginTop: 4 }}>Target Role: <strong style={{ color: "var(--accent2)" }}>{data.targetRole}</strong></div>}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Link to="/analyze" className="btn btn-primary">+ New Analysis</Link>
            <Link to="/history" className="btn btn-outline">History</Link>
          </div>
        </div>

        {/* Summary */}
        <div className="card" style={{ marginBottom: 24, borderColor: "rgba(99,102,241,0.2)", background: "linear-gradient(135deg, rgba(99,102,241,0.06), transparent)" }}>
          <div style={{ fontSize: 12, color: "var(--accent2)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>AI Summary</div>
          <p style={{ lineHeight: 1.7, color: "var(--text2)" }}>{data.summary}</p>
          <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span className="badge badge-blue">{data.experienceLevel}</span>
            {data.targetRole && (
              <span style={{ fontSize: 12, padding: "4px 10px", borderRadius: 20, fontWeight: 500, background: `${verdictColor[data.roleMatch?.verdict] || "#6366f1"}20`, color: verdictColor[data.roleMatch?.verdict] || "#6366f1", border: `1px solid ${verdictColor[data.roleMatch?.verdict] || "#6366f1"}40` }}>
                {data.roleMatch?.verdict}
              </span>
            )}
          </div>
        </div>

        {/* Scores Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 24 }}>

          {/* Score Circles */}
          <div className="card" style={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: 32 }}>
            <ScoreCircle score={data.atsScore} label="ATS Score" size={110} />
            <ScoreCircle score={data.skillMatchScore} label="Skill Match" size={110} />
            <ScoreCircle score={data.overallScore} label="Overall" size={110} />
          </div>

          {/* Radar */}
          <div className="card">
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Performance Radar</div>
            <ResponsiveContainer width="100%" height={180}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#64748b", fontSize: 12 }} />
                <Radar dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Role Match Banner */}
        {data.targetRole && data.roleMatch && (
          <div className="card" style={{ marginBottom: 24, borderColor: `${verdictColor[data.roleMatch.verdict]}40` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ fontSize: 12, color: "var(--text3)", textTransform: "uppercase", letterSpacing: 1 }}>Role Match for "{data.targetRole}"</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: verdictColor[data.roleMatch.verdict], marginTop: 4 }}>
                  {data.roleMatch.percentage}% — {data.roleMatch.verdict}
                </div>
              </div>
              <div>
                {data.roleMatch.missingSkills?.length > 0 && (
                  <>
                    <div style={{ fontSize: 13, color: "var(--text2)", marginBottom: 8 }}>Missing skills for this role:</div>
                    <div>{data.roleMatch.missingSkills.map(s => <Tag key={s} text={s} type="missing" />)}</div>
                  </>
                )}
              </div>
            </div>
            {/* Bar */}
            <div style={{ marginTop: 16, height: 8, background: "var(--border)", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${data.roleMatch.percentage}%`, background: verdictColor[data.roleMatch.verdict], borderRadius: 4, transition: "width 1s ease" }} />
            </div>
          </div>
        )}

        {/* Skills */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
          <div className="card">
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>✅ Skills Found ({data.skills?.found?.length || 0})</div>
            <div>{data.skills?.found?.map(s => <Tag key={s} text={s} type="found" />)}</div>
          </div>
          <div className="card">
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>❌ Skills Missing ({data.skills?.missing?.length || 0})</div>
            <div>{data.skills?.missing?.map(s => <Tag key={s} text={s} type="missing" />)}</div>
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
          <div className="card">
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>💪 Strengths</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {data.strengths?.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: "var(--green)", marginTop: 2, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.5 }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>⚠️ Weaknesses</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {data.weaknesses?.map((w, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: "var(--yellow)", marginTop: 2, flexShrink: 0 }}>!</span>
                  <span style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.5 }}>{w}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="card" style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 20 }}>💡 AI-Powered Suggestions</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {data.suggestions?.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{
                  width: 28, height: 28, background: "rgba(99,102,241,0.1)", borderRadius: 8,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 700, color: "var(--accent2)", flexShrink: 0,
                }}>0{i + 1}</div>
                <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6, marginTop: 4 }}>{s}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/analyze" className="btn btn-primary" style={{ padding: "12px 28px" }}>Analyze Another Resume</Link>
          <Link to="/history" className="btn btn-outline" style={{ padding: "12px 28px" }}>View History</Link>
          <Link to="/dashboard" className="btn btn-outline" style={{ padding: "12px 28px" }}>Dashboard</Link>
        </div>
      </div>
    </div>
  );
}
