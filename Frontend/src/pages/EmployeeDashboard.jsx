import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { FaUser, FaFolderOpen, FaPaperPlane, FaEdit ,FaSignOutAlt} from "react-icons/fa";




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
      </main>

      {showLogoutCountdown && <LogoutCountdown secondsLeft={secondsLeft} />}
    </div>
  );
}

function ProfileSection() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/employees/myprofile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Include the authorization token from localStorage
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError(error.message);
      }
    };

    fetchProfile();
  }, []);

  if (error) return <div className="text-red-500">Error loading profile: {error}</div>;
  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Profile</h2>
      <div className="bg-white shadow-md rounded p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="mb-2"><strong>Name:</strong> {profile.name} {profile.surname}</p>
            <p className="mb-2"><strong>Email:</strong> {profile.email}</p>
            <p className="mb-2"><strong>Phone:</strong> {profile.phone}</p>
            <p className="mb-2"><strong>Address:</strong> {profile.address}</p>
          </div>
          <div>
            <p className="mb-2"><strong>Department:</strong> {profile.otherDetails?.department}</p>
            <p className="mb-2"><strong>Position:</strong> {profile.otherDetails?.position}</p>
            <p className="mb-2"><strong>Role:</strong> {profile.role}</p>
          </div>
        </div>
        
        <div className="mt-6">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
            <FaEdit /> <span>Edit Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function CasesSection() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/ticket', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // Ensure data is an array
        const casesArray = Array.isArray(data) ? data : [];
        setCases(casesArray);
      } catch (error) {
        console.error("Error fetching cases:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Error loading cases: {error}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Cases</h2>
      {cases.length === 0 ? (
        <div className="text-center text-gray-500 p-4">
          No cases found
        </div>
      ) : (
        <table className="w-full mt-4 bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Case ID</th>
              <th className="p-2">Title</th>
              <th className="p-2">Status</th>
              <th className="p-2">Created Date</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((case_) => (
              <tr key={case_.id} className="border-b hover:bg-gray-50">
                <td className="p-2">#{case_.id}</td>
                <td className="p-2">{case_.title || 'N/A'}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    case_.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    case_.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                    case_.status === 'completed' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {case_.status || 'Unknown'}
                  </span>
                </td>
                <td className="p-2">
                  {case_.createdAt ? new Date(case_.createdAt).toLocaleDateString() : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function RequestsSection() {
  const [request, setRequest] = useState("");
  const employeeId = "your-employee-id"; // Replace with actual employee ID
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/requests/employee/${employeeId}`);
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, [employeeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employeeId,
          description: request
        }),
      });
      if (response.ok) {
        setRequest("");
        // Refresh requests list
        const updatedResponse = await fetch(`http://localhost:3000/api/requests/employee/${employeeId}`);
        const updatedData = await updatedResponse.json();
        setRequests(updatedData);
      }
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Send Request</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Describe your request..."
          value={request}
          onChange={(e) => setRequest(e.target.value)}
        ></textarea>
        <button 
          type="submit"
          className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded mt-4"
        >
          <FaPaperPlane /> <span>Submit</span>
        </button>
      </form>

      {/* Display existing requests */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">My Requests</h3>
        {requests.map((req) => (
          <div key={req.id} className="bg-white p-4 rounded shadow-md mb-2">
            <p>{req.description}</p>
            <span className="text-sm text-gray-500">{new Date(req.createdAt).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
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