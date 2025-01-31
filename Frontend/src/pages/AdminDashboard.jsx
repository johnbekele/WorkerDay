import React, { useState, useEffect } from "react";
import { FaUsers, FaPlus, FaTrash, FaEdit, FaCheck, FaTimes, FaUser, FaSignOutAlt } from "react-icons/fa";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("users");
  const [admin, setAdmin] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Fetch logged-in admin details
  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setAdmin(data); // Set admin details
      } catch (error) {
        console.error("Error fetching admin details:", error);
      }
    };

    fetchAdminDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    window.location.href = "http://localhost:3000/api/auth/login"; // Redirect to login page
  };

  const handleUpdateProfile = async (updatedData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/auth/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setAdmin(data); // Update admin details in state
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-5 space-y-4 flex flex-col justify-between">
        <div>
          {/* Display logged-in user's photo and name */}
          {admin && (
            <div className="flex flex-col items-center mb-4">
              <img
                src={admin.profilePic || "https://via.placeholder.com/150"} // Default placeholder if no profile picture
                alt="Admin"
                className="w-16 h-16 rounded-full mb-2"
              />
              <h2 className="text-lg font-semibold">{admin.name}</h2>
            </div>
          )}

          {/* Sidebar buttons */}
          <button
            onClick={() => setActiveSection("users")}
            className="flex items-center space-x-2 py-2 px-4 bg-gray-700 hover:bg-gray-600 w-full text-left"
          >
            <FaUsers /> <span>Manage Users</span>
          </button>
          <button
            onClick={() => setActiveSection("requests")}
            className="flex items-center space-x-2 py-2 px-4 bg-gray-700 hover:bg-gray-600 w-full text-left"
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

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 py-2 px-4 bg-red-600 hover:bg-red-500 w-full text-left mt-auto"
        >
          <FaSignOutAlt /> <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeSection === "users" && <UsersSection />}
        {activeSection === "requests" && <RequestsSection />}
      </main>

      {/* Profile Modal */}
      {showProfileModal && admin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">My Account</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const updatedData = {
                  name: formData.get("name"),
                  email: formData.get("email"),
                  phone: formData.get("phone"),
                };
                handleUpdateProfile(updatedData);
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={admin.name}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={admin.email}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  defaultValue={admin.phone}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function UsersSection() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/employees/admin", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded">
        <FaPlus /> <span>Create User</span>
      </button>
      <table className="w-full mt-4 bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.role}</td>
                <td className="p-2 space-x-2">
                  <button className="text-blue-500"><FaEdit /></button>
                  <button className="text-red-500"><FaTrash /></button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-2 text-center text-gray-500">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function RequestsSection() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Request Management</h2>
      <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded">
        <FaPlus /> <span>Create Request</span>
      </button>
      <table className="w-full mt-4 bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Request</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="p-2">Access Request</td>
            <td className="p-2">Pending</td>
            <td className="p-2 space-x-2">
              <button className="text-green-500"><FaCheck /></button>
              <button className="text-red-500"><FaTimes /></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}