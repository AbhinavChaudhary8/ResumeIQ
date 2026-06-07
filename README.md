# ResumeIQ — AI-Powered Resume Analyzer

A full-stack MERN application that analyzes resumes using Google Gemini AI and gives ATS scores, skill gap analysis, job role match, and actionable suggestions.

## Tech Stack
- **Frontend:** React, React Router, Recharts, React Dropzone, React Hot Toast
- **Backend:** Node.js, Express.js, Multer, pdf-parse
- **Database:** MongoDB Atlas (Mongoose)
- **AI:** Google Gemini 1.5 Flash API
- **Auth:** JWT (JSON Web Tokens) + bcryptjs
- **Deployment:** Vercel (frontend) + Render (backend)

## Features
- PDF resume upload with drag-and-drop
- AI-powered ATS score, skill match score, overall score
- Skills found vs missing analysis
- Strengths and weaknesses breakdown
- Job role match with percentage and verdict
- 5 personalized improvement suggestions
- Analysis history with delete
- JWT authentication (register/login)
- Responsive dark-themed UI

---

## Local Setup

### 1. Clone the repo
```bash
git clone https://github.com/AbhinavChaudhary8/ResumeIQ.git
cd resumeiq
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
```

Fill in your `.env`:
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/resumeiq
JWT_SECRET=anyrandomlongstring123
GEMINI_API_KEY=your_gemini_key_from_aistudio.google.com
```

Start backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
```

`.env` should have:
```
REACT_APP_API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm start
```

---

## Deployment

### Backend → Render
1. Push code to GitHub
2. Go to [render.com](https://render.com) → New Web Service → Connect GitHub repo
3. Set **Root Directory** to `backend`
4. Build: `npm install` | Start: `node server.js`
5. Add environment variables (MONGO_URI, JWT_SECRET, GEMINI_API_KEY, FRONTEND_URL)
6. Deploy → copy the URL (e.g. `https://resumeiq-backend.onrender.com`)

### Frontend → Vercel
1. Go to [vercel.com](https://vercel.com) → New Project → Import GitHub repo
2. Set **Root Directory** to `frontend`
3. Add env variable: `REACT_APP_API_URL=https://resumeiq-backend.onrender.com/api`
4. Deploy → get your live URL

### After deploying both:
- Go back to Render → Backend → Environment Variables
- Set `FRONTEND_URL` = your Vercel URL (e.g. `https://resumeiq.vercel.app`)
- Redeploy backend

---

## Getting API Keys

**Gemini API Key (Free):**
1. Go to [aistudio.google.com](https://aistudio.google.com)
2. Sign in with Google
3. Click "Get API Key" → Create API key
4. Copy and paste into `.env`

**MongoDB Atlas (Free):**
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create free cluster → Connect → Get connection string
3. Replace `<password>` with your DB user password

---

## Project Structure
```
resumeiq/
├── backend/
│   ├── models/          # User.js, Analysis.js
│   ├── routes/          # auth.js, resume.js, history.js
│   ├── middleware/       # auth.js (JWT)
│   ├── utils/           # gemini.js (AI integration)
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/       # Landing, Login, Register, Dashboard, Analyze, Results, History
│   │   ├── components/  # Navbar
│   │   ├── context/     # AuthContext
│   │   ├── App.js
│   │   └── index.css
│   └── package.json
└── README.md
```

---

Built by Abhinav Chaudhary
