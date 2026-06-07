import React from "react";
import { Link } from "react-router-dom";

const Feature = ({ icon, title, desc }) => (
  <div className="card" style={{ flex: 1, minWidth: 220 }}>
    <div style={{ fontSize: 32, marginBottom: 12 }}>{icon}</div>
    <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{title}</h3>
    <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6 }}>{desc}</p>
  </div>
);

export default function Landing() {
  return (
    <div className="grid-bg" style={{ minHeight: "100vh" }}>
      {/* Nav */}
      <nav style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "20px 48px", borderBottom: "1px solid var(--border)",
        background: "rgba(5,8,16,0.9)", backdropFilter: "blur(20px)",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, background: "var(--accent)", borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, fontWeight: 800, color: "white",
          }}>R</div>
          <span style={{ fontSize: 20, fontWeight: 700 }}>
            Resume<span style={{ color: "var(--accent2)" }}>IQ</span>
          </span>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <Link to="/login" className="btn btn-outline">Login</Link>
          <Link to="/register" className="btn btn-primary">Get Started Free</Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ textAlign: "center", padding: "100px 24px 60px", maxWidth: 800, margin: "0 auto" }} className="fade-in">
        <div className="badge badge-blue" style={{ marginBottom: 24, fontSize: 13 }}>
          ✨ Powered by Google Gemini AI
        </div>
        <h1 style={{ fontSize: "clamp(36px, 6vw, 68px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 24 }}>
          Get Your Resume{" "}
          <span style={{
            background: "linear-gradient(135deg, var(--accent), var(--accent3))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>AI-Analyzed</span>
          <br />in Seconds
        </h1>
        <p style={{ fontSize: 18, color: "var(--text2)", lineHeight: 1.7, marginBottom: 40, maxWidth: 560, margin: "0 auto 40px" }}>
          Upload your resume and get instant ATS scores, skill gap analysis,
          personalized suggestions, and job role match — powered by Gemini AI.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/register" className="btn btn-primary" style={{ fontSize: 16, padding: "14px 32px" }}>
            Analyze My Resume →
          </Link>
          <Link to="/login" className="btn btn-outline" style={{ fontSize: 16, padding: "14px 32px" }}>
            Sign In
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: "flex", justifyContent: "center", gap: 48,
        padding: "40px 24px", flexWrap: "wrap",
      }}>
        {[["ATS Score", "Know your keyword match"], ["Skill Analysis", "Find skill gaps instantly"], ["Role Match", "See your fit for any job"], ["Action Plan", "Get personalized tips"]].map(([title, desc]) => (
          <div key={title} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: "var(--accent2)" }}>✓</div>
            <div style={{ fontWeight: 600, marginTop: 4 }}>{title}</div>
            <div style={{ fontSize: 13, color: "var(--text3)", marginTop: 2 }}>{desc}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div style={{ padding: "60px 48px", maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 700, marginBottom: 48 }}>
          Everything you need to land the job
        </h2>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          <Feature icon="🎯" title="ATS Score" desc="See how well your resume performs against Applicant Tracking Systems with a detailed score." />
          <Feature icon="🧠" title="AI Analysis" desc="Gemini AI extracts your skills, experience, and gives an honest evaluation of your profile." />
          <Feature icon="📊" title="Visual Dashboard" desc="Beautiful charts showing your strength areas, skill coverage, and improvement potential." />
          <Feature icon="💼" title="Role Match" desc="Enter any job title and instantly see how well you match with missing skills identified." />
          <Feature icon="💡" title="Smart Suggestions" desc="Get 5 specific, actionable recommendations to improve your resume immediately." />
          <Feature icon="📁" title="Analysis History" desc="All your past analyses saved so you can track improvement over time." />
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center", padding: "80px 24px", borderTop: "1px solid var(--border)" }}>
        <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 16 }}>
          Ready to optimize your resume?
        </h2>
        <p style={{ color: "var(--text2)", marginBottom: 32 }}>Join and get your first analysis free.</p>
        <Link to="/register" className="btn btn-primary" style={{ fontSize: 16, padding: "14px 36px" }}>
          Start for Free →
        </Link>
      </div>

      <footer style={{ textAlign: "center", padding: 24, color: "var(--text3)", fontSize: 13, borderTop: "1px solid var(--border)" }}>
        © 2024 ResumeIQ · Built with React, Node.js, MongoDB & Gemini AI
      </footer>
    </div>
  );
}
