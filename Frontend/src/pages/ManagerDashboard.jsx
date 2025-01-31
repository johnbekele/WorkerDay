import React, { useState, useEffect } from "react";
import { FaUsers, FaEye, FaCheck, FaTimes, FaSignOutAlt, FaEdit, FaUser, FaPlus } from "react-icons/fa";

function ProfileModal({ manager, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">My Account</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>
        
        <div className="flex flex-col items-center mb-4">
          <img
            src={manager?.profilePic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWHGFgsFsWZiRlyz4YWqGBvoNeeWmXRA-T5Q&s"}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4"
          />
          <div className="w-full space-y-4">
            <div>
              <label className="text-gray-600 text-sm">Name</label>
              <p className="font-semibold">{manager?.username}</p>
            </div>
            <div>
              <label className="text-gray-600 text-sm">Email</label>
              <p className="font-semibold">{manager?.email}</p>
            </div>
            <div>
              <label className="text-gray-600 text-sm">Role</label>
              <p className="font-semibold">{manager?.role || 'Manager'}</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function CreateEmployeeModal({ onClose, onSubmit, managerEmail }) {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    role: 'employee',
    phone: '',
    address: '',
    department: '',
    position: '',
    managerEmail: managerEmail
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.surname) newErrors.surname = 'Surname is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear any existing errors
    setErrors({});

    // Submit the form
    onSubmit({
      ...formData,
      managerEmail // Ensure manager email is included
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Employee</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Surname</label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Position</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const decodeJWT = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (error) {
    return null;
  }
};

const getTokenExpirationTime = (token) => {
  const decoded = decodeJWT(token);
  return decoded ? decoded.exp * 1000 : null;
};


function LogoutCountdown({ secondsLeft }) {
  return (
    <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg z-50">
      <p className="font-semibold">Session Expiring!</p>
      <p>You will be logged out in {secondsLeft} seconds</p>
    </div>
  );
}

export default function ManagerDashboard() {
  const [activeSection, setActiveSection] = useState("employees");
  const [manager, setManager] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showLogoutCountdown, setShowLogoutCountdown] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(30);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // Check token expiration
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

  // Fetch manager details with token check
  useEffect(() => {
    const fetchManagerDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.status === 401) {
          handleLogout();
          return;
        }

        if (!response.ok) throw new Error("Failed to fetch manager details");
        const data = await response.json();
        setManager(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchManagerDetails();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white p-5 space-y-4 flex flex-col justify-between">
        <div>
          {manager && (
            <div className="flex flex-col items-center mb-4">
              <img 
                src={manager.profilePic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWHGFgsFsWZiRlyz4YWqGBvoNeeWmXRA-T5Q&s"} 
                alt="Profile" 
                className="w-16 h-16 rounded-full mb-2"
              />
              <h2 className="text-lg font-semibold">{manager.name}</h2>
            </div>
          )}
          <button
            onClick={() => setActiveSection("employees")}
            className={`flex items-center space-x-2 py-2 px-4 w-full text-left ${
              activeSection === "employees" ? "bg-gray-600" : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            <FaUsers /> <span>Manage Employees</span>
          </button>
          <button
            onClick={() => setActiveSection("requests")}
            className={`flex items-center space-x-2 py-2 px-4 w-full text-left ${
              activeSection === "requests" ? "bg-gray-600" : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            <FaCheck /> <span>Manage Requests</span>
          </button>
          <button
            onClick={() => setShowProfileModal(true)}
            className="flex items-center space-x-2 py-2 px-4 bg-gray-700 hover:bg-gray-600 w-full text-left mt-4"
          >
            <FaUser /> <span>My Account</span>
          </button>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-2 py-2 px-4 bg-red-600 hover:bg-red-700 w-full text-left"
        >
          <FaSignOutAlt /> <span>Logout</span>
        </button>
      </aside>

      <main className="flex-1 p-6">
        {activeSection === "employees" && <EmployeesSection />}
        {activeSection === "requests" && <RequestsSection />}
        {showProfileModal && (
          <ProfileModal
            manager={manager}
            onClose={() => setShowProfileModal(false)}
          />
        )}
      </main>

      {showLogoutCountdown && <LogoutCountdown secondsLeft={secondsLeft} />}
    </div>
  );
}

function EmployeesSection() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [manager, setManager] = useState(null);

  useEffect(() => {
    fetchEmployees();
    fetchManagerDetails();
  }, []);

  const fetchManagerDetails = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setManager(data);
    } catch (error) {
      console.error("Error fetching manager details:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/employees/manager", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch employees');
      const data = await response.json();
      const employeesArray = Array.isArray(data) ? data : [data];
      setEmployees(employeesArray);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setError(error.message);
      setLoading(false);
    }
  };

 const handleCreateEmployee = async (employeeData) => {
  try {
    // Format the data correctly
    const formattedData = {
      ...employeeData,
      otherDetails: {
        department: employeeData.department,
        position: employeeData.position
      }
    };

    console.log('Sending data:', formattedData); // For debugging

    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formattedData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create employee');
    }

    setSuccessMessage("Employee registered successfully!");
    setShowCreateModal(false);
    fetchEmployees();

    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  } catch (error) {
    console.error("Error creating employee:", error);
    alert(error.message);
  }
};

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Error: {error}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Employee Management</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
        >
          <FaPlus className="mr-2" /> Add Employee
        </button>
      </div>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          {successMessage}
        </div>
      )}

      {employees.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No employees found</p>
      ) : (
        <table className="w-full mt-4 bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Name</th>
              <th className="p-2">Surname</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Department</th>
              <th className="p-2">Position</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Address</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{employee.name}</td>
                <td className="p-2">{employee.surname}</td>
                <td className="p-2">{employee.email}</td>
                <td className="p-2">{employee.role}</td>
                <td className="p-2">{employee.otherDetails?.department || 'N/A'}</td>
                <td className="p-2">{employee.otherDetails?.position || 'N/A'}</td>
                <td className="p-2">{employee.phone}</td>
                <td className="p-2">{employee.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showCreateModal && (
        <CreateEmployeeModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateEmployee}
          managerEmail={manager?.email}
        />
      )}
    </div>
  );
}

// Constants
const REQUEST_TYPES = {
  LEAVE: 'leave',
  DOCUMENT: 'document',
  EQUIPMENT: 'equipment',
  OTHER: 'other'
};

// Create Request Modal Component
function CreateRequestModal({ onClose, onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState({
    employeeEmail: '',
    requestType: '',
    reason: ''
  });
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!formData.employeeEmail) errors.employeeEmail = 'Email is required';
    if (!formData.requestType) errors.requestType = 'Request type is required';
    if (!formData.reason) errors.reason = 'Reason is required';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      onSubmit(formData);
    } else {
      setValidationErrors(errors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear validation error when user types
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create New Request</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={isSubmitting}
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Employee Email /If Requesting for employee/</label>
            <input
              type="email"
              name="employeeEmail"
              value={formData.employeeEmail}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500
                ${validationErrors.employeeEmail ? 'border-red-500' : ''}`}
              disabled={isSubmitting}
            />
            {validationErrors.employeeEmail && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.employeeEmail}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Request Type</label>
            <select
              name="requestType"
              value={formData.requestType}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500
                ${validationErrors.requestType ? 'border-red-500' : ''}`}
              disabled={isSubmitting}
            >
              <option value="">Select a type</option>
              <option value={REQUEST_TYPES.LEAVE}>Leave Request</option>
              <option value={REQUEST_TYPES.DOCUMENT}>Document Request</option>
              <option value={REQUEST_TYPES.EQUIPMENT}>Equipment Request</option>
              <option value={REQUEST_TYPES.OTHER}>Other</option>
            </select>
            {validationErrors.requestType && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.requestType}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Reason</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows="4"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500
                ${validationErrors.reason ? 'border-red-500' : ''}`}
              disabled={isSubmitting}
            />
            {validationErrors.reason && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.reason}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600
                ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Main RequestsSection Component
function RequestsSection() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/requests/manager", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch requests');
      const data = await response.json();
      setRequests(data.requests || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRequest = async (requestData) => {
    try {
      setIsSubmitting(true);
      const response = await fetch("http://localhost:3000/api/requests/manager", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(requestData)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || 'Failed to create request');

      setSuccessMessage('Request created successfully');
      setShowCreateModal(false);
      fetchRequests();

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  

  // ... (previous code remains the same until return statement)

return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Request Management</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
          disabled={isSubmitting}
        >
          <FaPlus className="mr-2" /> Create Request
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          {successMessage}
        </div>
      )}

      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : requests.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No requests found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full mt-4 bg-white shadow-md rounded">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Employee ID</th>
                <th className="p-2">Request Type</th>
                <th className="p-2">Date</th>
                <th className="p-2">Status</th>
                <th className="p-2">Reason</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{request.employeeId}</td>
                  <td className="p-2 capitalize">{request.requestType}</td>
                  <td className="p-2">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        request.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : request.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="p-2">{request.reason}</td>
                  <td className="p-2 space-x-2">
                    {request.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleRequestResponse(request.id, 'approved')}
                          className="text-green-500 hover:text-green-700 p-1"
                          title="Approve"
                          disabled={isSubmitting}
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() => handleRequestResponse(request.id, 'rejected')}
                          className="text-red-500 hover:text-red-700 p-1"
                          title="Reject"
                          disabled={isSubmitting}
                        >
                          <FaTimes />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showCreateModal && (
        <CreateRequestModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateRequest}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
