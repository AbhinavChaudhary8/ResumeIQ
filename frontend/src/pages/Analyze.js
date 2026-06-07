import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import toast from "react-hot-toast";

const steps = [
  "Reading your resume...",
  "Extracting skills and experience...",
  "Running ATS analysis...",
  "Checking job role fit...",
  "Generating suggestions...",
  "Finalizing report...",
];

export default function Analyze() {
  const [file, setFile] = useState(null);
  const [targetRole, setTargetRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;

  const onDrop = useCallback((accepted) => {
    if (accepted[0]) setFile(accepted[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { "application/pdf": [".pdf"] }, maxFiles: 1,
  });

  const handleAnalyze = async () => {
    if (!file) return toast.error("Please upload a PDF resume first");
    setLoading(true);
    setStep(0);

    // Cycle through steps while loading
    const interval = setInterval(() => {
      setStep(s => s < steps.length - 1 ? s + 1 : s);
    }, 2500);

    try {
      const formData = new FormData();
      formData.append("resume", file);
      if (targetRole) formData.append("targetRole", targetRole);

      const res = await axios.post(`${API}/resume/analyze`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      clearInterval(interval);
      toast.success("Analysis complete! 🎉");
      navigate(`/results/${res.data.analysis._id}`);
    } catch (err) {
      clearInterval(interval);
      toast.error(err.response?.data?.message || "Analysis failed. Try again.");
      setLoading(false);
    }
  };

  const roles = ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Scientist", "ML Engineer", "UI/UX Designer", "DevOps Engineer", "Product Manager"];

  return (
    <div style={{ paddingTop: 88, minHeight: "100vh" }}>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 24px" }}>
        <div className="fade-in">
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Analyze Resume</h1>
          <p style={{ color: "var(--text2)", marginBottom: 40 }}>Upload your PDF resume and get instant AI-powered feedback</p>

          {/* Upload Zone */}
          <div {...getRootProps()} style={{
            border: `2px dashed ${isDragActive ? "var(--accent)" : file ? "var(--green)" : "var(--border2)"}`,
            borderRadius: 16, padding: "48px 32px", textAlign: "center",
            cursor: "pointer", transition: "all 0.2s", marginBottom: 24,
            background: isDragActive ? "rgba(99,102,241,0.05)" : file ? "rgba(16,185,129,0.05)" : "var(--card)",
          }}>
            <input {...getInputProps()} />
            {file ? (
              <>
                <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
                <div style={{ fontWeight: 600, fontSize: 16, color: "var(--green)" }}>{file.name}</div>
                <div style={{ fontSize: 13, color: "var(--text2)", marginTop: 4 }}>
                  {(file.size / 1024).toFixed(0)} KB · Click or drag to replace
                </div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 48, marginBottom: 12 }}>📄</div>
                <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
                  {isDragActive ? "Drop it here!" : "Drag & drop your resume"}
                </div>
                <div style={{ fontSize: 13, color: "var(--text2)", marginBottom: 16 }}>PDF files only · Max 5MB</div>
                <button className="btn btn-outline" type="button">Browse Files</button>
              </>
            )}
          </div>

          {/* Target Role */}
          <div className="card" style={{ marginBottom: 32 }}>
            <label style={{ fontSize: 14, fontWeight: 600, display: "block", marginBottom: 12 }}>
              Target Job Role <span style={{ color: "var(--text3)", fontWeight: 400 }}>(optional but recommended)</span>
            </label>
            <input className="input" placeholder="e.g. Frontend Developer, Data Scientist..."
              value={targetRole} onChange={e => setTargetRole(e.target.value)} style={{ marginBottom: 12 }} />
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {roles.map(r => (
                <button key={r} type="button" onClick={() => setTargetRole(r)}
                  className="badge"
                  style={{
                    cursor: "pointer", border: "none",
                    background: targetRole === r ? "rgba(99,102,241,0.2)" : "var(--bg2)",
                    color: targetRole === r ? "var(--accent2)" : "var(--text2)",
                    padding: "6px 12px", borderRadius: 20,
                  }}>
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="card" style={{ marginBottom: 24, textAlign: "center", padding: 32 }}>
              <div className="spinner" style={{ width: 40, height: 40, margin: "0 auto 16px", borderWidth: 3 }} />
              <div style={{ fontWeight: 600, marginBottom: 8 }}>{steps[step]}</div>
              <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 16 }}>
                {steps.map((_, i) => (
                  <div key={i} style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: i <= step ? "var(--accent)" : "var(--border2)",
                    transition: "background 0.3s",
                  }} />
                ))}
              </div>
            </div>
          )}

          <button className="btn btn-primary" onClick={handleAnalyze} disabled={loading || !file}
            style={{ width: "100%", justifyContent: "center", fontSize: 16, padding: 16 }}>
            {loading ? "Analyzing..." : "🚀 Analyze My Resume"}
          </button>

          <p style={{ textAlign: "center", fontSize: 12, color: "var(--text3)", marginTop: 16 }}>
            Your resume is analyzed securely. We never share your data.
          </p>
        </div>
      </div>
    </div>
  );
}
