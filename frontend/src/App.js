import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Analyze from "./pages/Analyze";
import Results from "./pages/Results";
import History from "./pages/History";
import Navbar from "./components/Navbar";

const Protected = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}><div className="spinner" style={{ width: 40, height: 40 }} /></div>;
  return user ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{
        style: { background: "#0f172a", color: "#f1f5f9", border: "1px solid #1e293b" },
      }} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Protected><Navbar /><Dashboard /></Protected>} />
        <Route path="/analyze" element={<Protected><Navbar /><Analyze /></Protected>} />
        <Route path="/results/:id" element={<Protected><Navbar /><Results /></Protected>} />
        <Route path="/history" element={<Protected><Navbar /><History /></Protected>} />
      </Routes>
    </BrowserRouter>
  );
}
