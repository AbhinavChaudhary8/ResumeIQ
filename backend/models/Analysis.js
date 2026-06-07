const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fileName: { type: String, required: true },
  targetRole: { type: String, default: "" },
  atsScore: { type: Number, default: 0 },
  skillMatchScore: { type: Number, default: 0 },
  overallScore: { type: Number, default: 0 },
  skills: {
    found: [String],
    missing: [String],
  },
  strengths: [String],
  weaknesses: [String],
  suggestions: [String],
  roleMatch: {
    percentage: Number,
    verdict: String,
    missingSkills: [String],
  },
  summary: { type: String },
  experienceLevel: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Analysis", analysisSchema);
