import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${API}/history`).then(r => setHistory(r.data)).finally(() => setLoading(false));
  }, []);

  const deleteAnalysis = async (id) => {
    if (!window.confirm("Delete this analysis?")) return;
    try {
      await axios.delete(`${API}/history/${id}`);
      setHistory(h => h.filter(x => x._id !== id));
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const getColor = (s) => s >= 75 ? "var(--green)" : s >= 50 ? "var(--yellow)" : "var(--red)";

  const ScoreBar = ({ label, value }) => (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 12 }}>
        <span style={{ color: "var(--text3)" }}>{label}</span>
        <span style={{ color: getColor(value), fontWeight: 600 }}>{value}</span>
      </div>
      <div style={{ height: 4, background: "var(--border)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${value}%`, background: getColor(value), borderRadius: 2 }} />
      </div>
    </div>
  );

  return (
    <div style={{ paddingTop: 88, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }} className="fade-in">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700 }}>Analysis History</h1>
            <p style={{ color: "var(--text2)", marginTop: 6 }}>{history.length} resume{history.length !== 1 ? "s" : ""} analyzed</p>
          </div>
          <Link to="/analyze" className="btn btn-primary">+ New Analysis</Link>
        </div>

        {loading && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
            {[1, 2, 3].map(i => (
              <div key={i} className="skeleton" style={{ height: 200 }} />
            ))}
          </div>
        )}

        {!loading && history.length === 0 && (
          <div className="card" style={{ textAlign: "center", padding: "80px 24px" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
            <h3 style={{ fontWeight: 600, marginBottom: 8 }}>No history yet</h3>
            <p style={{ color: "var(--text2)", marginBottom: 24 }}>Your analyzed resumes will appear here</p>
            <Link to="/analyze" className="btn btn-primary">Analyze Your First Resume</Link>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {history.map(h => (
            <div key={h._id} className="card card-hover" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 15, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {h.fileName}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 4 }}>
                    {new Date(h.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </div>
                  {h.targetRole && (
                    <div style={{ fontSize: 12, color: "var(--accent2)", marginTop: 4 }}>🎯 {h.targetRole}</div>
                  )}
                </div>
                <span className="badge badge-blue" style={{ flexShrink: 0, marginLeft: 8 }}>{h.experienceLevel}</span>
              </div>

              <div>
                <ScoreBar label="ATS Score" value={h.atsScore} />
                <ScoreBar label="Overall Score" value={h.overallScore} />
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <Link to={`/results/${h._id}`} className="btn btn-primary" style={{ flex: 1, justifyContent: "center", padding: "8px 16px", fontSize: 13 }}>
                  View Report
                </Link>
                <button onClick={() => deleteAnalysis(h._id)} className="btn btn-danger" style={{ padding: "8px 12px", fontSize: 13 }}>
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
