const express = require("express");
const authMiddleware = require("../middleware/auth");
const Analysis = require("../models/Analysis");

const router = express.Router();

// GET all analyses for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const analyses = await Analysis.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .select("fileName targetRole atsScore overallScore experienceLevel createdAt");
    res.json(analyses);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET single analysis by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const analysis = await Analysis.findOne({ _id: req.params.id, userId: req.userId });
    if (!analysis) return res.status(404).json({ message: "Not found" });
    res.json(analysis);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE analysis
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Analysis.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
