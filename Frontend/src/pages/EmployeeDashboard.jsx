import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { FaUser, FaFolderOpen, FaPaperPlane, FaEdit ,FaSignOutAlt,FaBook } from "react-icons/fa";
import ProfileSection from "../Components/ProfileSection";
import CasesSection from "../Components/CasesSection";
import RequestsSection from "../Components/RequestsSection";
import LearningSection from "../Components/LearningSection";


const getTokenExpirationTime = (token) => {
  const decoded = decodeJWT(token);
  return decoded ? decoded.exp * 1000 : null;
};

export default function EmployeeDashboard() {
  const [activeSection, setActiveSection] = useState("profile");
  const [showLogoutCountdown, setShowLogoutCountdown] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(30);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // Add token expiration check
  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        handleLogout();
        return;
      }

      const expirationTime = getTokenExpirationTime(token);
      if (!expirationTime) {
        handleLogout();
        return;
      }

      const timeLeft = expirationTime - Date.now();
      
      if (timeLeft <= 0) {
        handleLogout();
      } else if (timeLeft <= 30000) { // 30 seconds
        setShowLogoutCountdown(true);
        const secondsRemaining = Math.ceil(timeLeft / 1000);
        setSecondsLeft(secondsRemaining);

        const countdownInterval = setInterval(() => {
          setSecondsLeft(prev => {
            if (prev <= 1) {
              clearInterval(countdownInterval);
              handleLogout();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        return () => clearInterval(countdownInterval);
      }
    };

    const intervalId = setInterval(checkTokenExpiration, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-5 space-y-4 flex flex-col justify-between">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Employee Panel</h2>
          
          <button
            onClick={() => setActiveSection("profile")}
            className="flex items-center space-x-2 py-2 px-4 bg-gray-700 hover:bg-gray-600 w-full text-left"
          >
            <FaUser /> <span>My Profile</span>
          </button>
          <button
            onClick={() => setActiveSection("cases")}
            className="flex items-center space-x-2 py-2 px-4 bg-gray-700 hover:bg-gray-600 w-full text-left"
          >
            <FaFolderOpen /> <span>My Cases</span>
          </button>
          <button
            onClick={() => setActiveSection("requests")}
            className="flex items-center space-x-2 py-2 px-4 bg-gray-700 hover:bg-gray-600 w-full text-left"
          >
            <FaPaperPlane /> <span>Send Request</span>
          </button>
          <button
            onClick={() => setActiveSection("mylearning")}
            className="flex items-center space-x-2 py-2 px-4 bg-gray-700 hover:bg-gray-600 w-full text-left"
          >
            <FaBook  /> <span>My Learning</span>
          </button>
        </div>

        {/* Logout button */}
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-2 py-2 px-4 bg-red-600 hover:bg-red-700 w-full text-left mt-auto"
        >
          <FaSignOutAlt /> <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeSection === "profile" && <ProfileSection />}
        {activeSection === "cases" && <CasesSection />}
        {activeSection === "requests" && <RequestsSection />}
        {activeSection === "mylearning" && <LearningSection />}
      </main>

      {showLogoutCountdown && <LogoutCountdown secondsLeft={secondsLeft} />}
    </div>
  );
}







// LogoutCountdown Component
function LogoutCountdown({ secondsLeft }) {
  return (
    <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg z-50">
      <p className="font-semibold">Session Expiring!</p>
      <p>You will be logged out in {secondsLeft} seconds</p>
    </div>
  );
}

// Add PropTypes
LogoutCountdown.propTypes = {
  secondsLeft: PropTypes.number.isRequired,
};

// JWT decode function
const decodeJWT = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (error) {
    return null;
  }
};