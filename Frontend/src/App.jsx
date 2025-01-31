import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import AdminDashboard from "./pages/AdminDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, []);

  return (
    <Router>
      <Routes>
        {/* ✅ LandingPage now includes NavBar and About */}
        <Route path="/" element={<LandingPage  setIsAuthenticated={setIsAuthenticated}/>} />

        {/* ✅ Private Routes */}
        <Route path="/admin" element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/" />} />
        <Route path="/manager" element={isAuthenticated ? <ManagerDashboard /> : <Navigate to="/" />} />
        <Route path="/employee" element={isAuthenticated ? <EmployeeDashboard /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
