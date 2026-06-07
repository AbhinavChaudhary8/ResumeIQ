const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeResume = async (resumeText, targetRole = "") => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
You are an expert ATS (Applicant Tracking System) and HR specialist. Analyze the following resume and return a detailed JSON analysis.

Resume Text:
"""
${resumeText}
"""

${targetRole ? `Target Job Role: ${targetRole}` : ""}

Return ONLY a valid JSON object (no markdown, no explanation) with this exact structure:
{
  "atsScore": <number 0-100>,
  "skillMatchScore": <number 0-100>,
  "overallScore": <number 0-100>,
  "experienceLevel": "<Fresher | Junior | Mid-Level | Senior>",
  "summary": "<2-3 sentence professional summary of the candidate>",
  "skills": {
    "found": ["skill1", "skill2", ...],
    "missing": ["skill1", "skill2", ...]
  },
  "strengths": ["strength1", "strength2", "strength3", "strength4"],
  "weaknesses": ["weakness1", "weakness2", "weakness3"],
  "suggestions": [
    "Specific actionable suggestion 1",
    "Specific actionable suggestion 2",
    "Specific actionable suggestion 3",
    "Specific actionable suggestion 4",
    "Specific actionable suggestion 5"
  ],
  "roleMatch": {
    "percentage": <number 0-100>,
    "verdict": "<Strong Match | Good Match | Partial Match | Weak Match>",
    "missingSkills": ["skill1", "skill2", ...]
  }
}

Be specific, detailed, and honest. ATS score should reflect keyword optimization. Skill match should reflect technical skills coverage.
${targetRole ? `Role match should specifically evaluate fit for: ${targetRole}` : "Role match should evaluate general employability."}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  // Strip markdown fences if present
  const cleaned = text.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
};

module.exports = { analyzeResume };
