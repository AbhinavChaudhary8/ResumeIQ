const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const authMiddleware = require("../middleware/auth");
const { analyzeResume } = require("../utils/groq");
const Analysis = require("../models/Analysis");

const router = express.Router();

// Multer - store in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF files are allowed"), false);
  },
});

// POST /api/resume/analyze
router.post("/analyze", authMiddleware, upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const { targetRole } = req.body;

    // Extract text from PDF
    const pdfData = await pdfParse(req.file.buffer);
    const resumeText = pdfData.text;

    if (!resumeText || resumeText.trim().length < 100) {
      return res.status(400).json({ message: "Could not extract text from PDF. Make sure it's not a scanned image." });
    }

    // Analyze with Gemini
    const analysis = await analyzeResume(resumeText, targetRole || "");

    // Save to MongoDB
    const saved = await Analysis.create({
      userId: req.userId,
      fileName: req.file.originalname,
      targetRole: targetRole || "",
      atsScore: analysis.atsScore,
      skillMatchScore: analysis.skillMatchScore,
      overallScore: analysis.overallScore,
      experienceLevel: analysis.experienceLevel,
      summary: analysis.summary,
      skills: analysis.skills,
      strengths: analysis.strengths,
      weaknesses: analysis.weaknesses,
      suggestions: analysis.suggestions,
      roleMatch: analysis.roleMatch,
    });

    res.json({ success: true, analysis: saved });
  } catch (err) {
    console.error("Analysis error:", err);
    res.status(500).json({ message: err.message || "Analysis failed" });
  }
});

module.exports = router;
