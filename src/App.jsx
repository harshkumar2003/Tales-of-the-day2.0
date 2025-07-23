import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import LandingPage from "./Pages/LandingPage";
import { LoadingSpinner } from "./Components/LoadingSpinner";
import Dashboard from "./Pages/Dashboard";
import ResetPassword from "./Pages/ResetPassword";
import ProtectedRoute from "./routes/ProtectedRoute";
import  { Toaster } from "react-hot-toast";
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingSpinner />;
  return (
    <>
      <Router>
        <Toaster position="bottom-right" reverseOrder={true} />
        <div className="min-h-screen dark:bg-black bg-white transition-colors duration-300 dark:transition-colors dark:duration-300">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/dashboard" element={
              <ProtectedRoute><Dashboard /></ProtectedRoute> } />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
