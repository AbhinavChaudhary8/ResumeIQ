# ResumeIQ — AI-Powered Resume Analyzer

A full-stack MERN application that analyzes resumes using Groq AI and gives ATS scores, skill gap analysis, job role match, and actionable suggestions.

## Tech Stack

* **Frontend:** React, React Router, Recharts, React Dropzone, React Hot Toast
* **Backend:** Node.js, Express.js, Multer, pdf-parse
* **Database:** MongoDB Atlas (Mongoose)
* **AI:** Groq API (Llama 3.3 70B Versatile)
* **Auth:** JWT (JSON Web Tokens) + bcryptjs
* **Deployment:** Vercel (frontend) + Render (backend)

## Features

* PDF resume upload with drag-and-drop
* AI-powered ATS score, skill match score, overall score
* Skills found vs missing analysis
* Strengths and weaknesses breakdown
* Job role match with percentage and verdict
* 5 personalized improvement suggestions
* Analysis history with delete
* JWT authentication (register/login)
* Responsive dark-themed UI

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

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/resumeiq
JWT_SECRET=anyrandomlongstring123
GROQ_API_KEY=your_groq_api_key
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

```env
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
2. Go to https://render.com → New Web Service → Connect GitHub repo
3. Set **Root Directory** to `backend`
4. Build: `npm install` | Start: `node server.js`
5. Add environment variables (**MONGO_URI, JWT_SECRET, GROQ_API_KEY, FRONTEND_URL**)
6. Deploy → copy the URL (e.g. `https://resumeiq-backend.onrender.com`)

### Frontend → Vercel

1. Go to https://vercel.com → New Project → Import GitHub repo
2. Set **Root Directory** to `frontend`
3. Add env variable:

```env
REACT_APP_API_URL=https://resumeiq-backend.onrender.com/api
```

4. Deploy → get your live URL

### After deploying both:

* Go back to Render → Backend → Environment Variables
* Set `FRONTEND_URL` = your Vercel URL (e.g. `https://resumeiq.vercel.app`)
* Redeploy backend

---

## Getting API Keys

### Groq API Key (Free)

1. Go to https://console.groq.com
2. Sign in or create an account
3. Navigate to **API Keys**
4. Create a new API key
5. Copy the key and paste it into your `.env` file

### MongoDB Atlas (Free)

1. Go to https://mongodb.com/atlas
2. Create a free cluster → Connect → Get connection string
3. Replace `<password>` with your DB user password

---

## Project Structure

```text
resumeiq/
├── backend/
│   ├── models/           # User.js, Analysis.js
│   ├── routes/           # auth.js, resume.js, history.js
│   ├── middleware/       # auth.js (JWT)
│   ├── utils/            # groq.js (AI integration)
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/        # Landing, Login, Register, Dashboard, Analyze, Results, History
│   │   ├── components/   # Navbar
│   │   ├── context/      # AuthContext
│   │   ├── App.js
│   │   └── index.css
│   └── package.json
└── README.md
```

---

Built by Abhinav Chaudhary
