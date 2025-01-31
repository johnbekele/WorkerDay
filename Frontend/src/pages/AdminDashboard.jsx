import React, { useState, useEffect } from "react";
import { FaUsers, FaPlus, FaTrash, FaEdit, FaCheck, FaTimes, FaUser, FaSignOutAlt } from "react-icons/fa";


function ProfileModal({ admin, onClose }) {
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
            src={admin?.profilePic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbgk0yfCOe55931lf6q0osfhGRU-fnH8Im1g&s"}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4"
          />
          <div className="w-full space-y-4">
            <div>
              <label className="text-gray-600 text-sm">Name</label>
              <p className="font-semibold">{admin?.username}</p>
            </div>
            <div>
              <label className="text-gray-600 text-sm">Email</label>
              <p className="font-semibold">{admin?.email}</p>
            </div>
            <div>
              <label className="text-gray-600 text-sm">Role</label>
              <p className="font-semibold">{admin?.role || 'Admin'}</p>
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

function EditUserModal({ user, onClose, onSave }) {
  const [editedUser, setEditedUser] = useState({
    name: user.name,
    email: user.email,
    role: user.role
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(editedUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit User</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              value={editedUser.name}
              onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={editedUser.email}
              onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Role
            </label>
            <select
              value={editedUser.role}
              onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
            </select>
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("users");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [admin, setAdmin] = useState(null);

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
          throw new Error("Failed to fetch admin details");
        }
        const data = await response.json();
        setAdmin(data);
      } catch (error) {
        console.error("Error fetching admin details:", error);
      }
    };
    fetchAdminDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white p-5 space-y-4 flex flex-col justify-between">
        <div>
          {admin && (
            <div className="flex flex-col items-center mb-4">
              <img src={admin.profilePic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbgk0yfCOe55931lf6q0osfhGRU-fnH8Im1g&s"} alt="Admin" className="w-16 h-16 rounded-full mb-2" />
              <h2 className="text-lg font-semibold">{admin.name}</h2>
            </div>
          )}
          <button onClick={() => setActiveSection("users")} className="flex items-center space-x-2 py-2 px-4 bg-gray-700 hover:bg-gray-600 w-full text-left">
            <FaUsers /> <span>Manage Users</span>
          </button>
          <button onClick={() => setActiveSection("requests")} className="flex items-center space-x-2 py-2 px-4 bg-gray-700 hover:bg-gray-600 w-full text-left">
            <FaCheck /> <span>Manage Requests</span>
          </button>
          <button onClick={() => setShowProfileModal(true)} className="flex items-center space-x-2 py-2 px-4 bg-gray-700 hover:bg-gray-600 w-full text-left mt-4">
            <FaUser /> <span>My Account</span>
          </button>
        </div>
        <button onClick={handleLogout} className="flex items-center space-x-2 py-2 px-4 bg-red-600 hover:bg-red-500 w-full text-left mt-auto">
          <FaSignOutAlt /> <span>Logout</span>
        </button>
      </aside>
      <main className="flex-1 p-6">
        {activeSection === "users" && <UsersSection />}
        {activeSection === "requests" && <RequestsSection />}
        {showProfileModal && (
          <ProfileModal
            admin={admin}
            onClose={() => setShowProfileModal(false)}
          />
        )}
      </main>
    </div>
  );
}

function UsersSection() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/employees/admin", {
        method: "GET",
        headers: { 
          "Content-Type": "application/json", 
          Authorization: `Bearer ${localStorage.getItem("token")}` 
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/employees/${id}`, {
        method: "DELETE",
        headers: { 
          "Content-Type": "application/json", 
          Authorization: `Bearer ${localStorage.getItem("token")}` 
        },
      });
      
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== id));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      const response = await fetch(`http://localhost:3000/api/employees/${updatedUser.id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json", 
          Authorization: `Bearer ${localStorage.getItem("token")}` 
        },
        body: JSON.stringify(updatedUser)
      });
      
      if (response.ok) {
        const data = await response.json();
        setUsers(users.map(user => 
          user.id === updatedUser.id ? { ...user, ...data } : user
        ));
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      <table className="w-full mt-4 bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
             <th className="p-2">SurName</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Phone number</th>
             <th className="p-2">Address</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:shadow-lg">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.surname}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2">{user.phone}</td>
              <td className="p-2">{user.address}</td>
              <td className="p-2 space-x-2">
                <button 
                  className="text-blue-500"
                  onClick={() => setEditingUser(user)}
                >
                  <FaEdit />
                </button>
                <button 
                  className="text-red-500" 
                  onClick={() => deleteUser(user.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={async (updatedUser) => {
            await updateUser({ ...updatedUser, id: editingUser.id });
            setEditingUser(null);
          }}
        />
      )}
    </div>
  );
}

function RequestsSection() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/requests/admin", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch requests');
      }

      const data = await response.json();
      setRequests(data.requests || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching requests:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleRequestResponse = async (requestId, response) => {
    try {
      const apiResponse = await fetch(`http://localhost:3000/api/requests/admin/${requestId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ response: response })
      });

      if (!apiResponse.ok) {
        throw new Error(`Failed to ${response} request`);
      }

      const data = await apiResponse.json();
      
      // Update the local state to reflect the change
      setRequests(requests.map(request => 
        request.id === requestId 
          ? { ...request, status: response }
          : request
      ));

      alert(data.message); // Show success message
    } catch (error) {
      console.error(`Error ${response}ing request:`, error);
      alert(`Failed to ${response} request`);
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
      <h2 className="text-xl font-bold mb-4">Request Management</h2>
      {requests.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No requests found</p>
      ) : (
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
                <td className="p-2">{request.requestType}</td>
                <td className="p-2">{new Date(request.createdAt).toLocaleDateString()}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    request.status === 'approved' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {request.status}
                  </span>
                </td>
                <td className="p-2">{request.reason}</td>
                <td className="p-2 space-x-2">
                  {request.status === 'pending' && (
                    <>
                      <button 
                        onClick={() => handleRequestResponse(request.id, 'approved')}
                        className="text-green-500 hover:text-green-700"
                        title="Approve"
                      >
                        <FaCheck />
                      </button>
                      <button 
                        onClick={() => handleRequestResponse(request.id, 'rejected')}
                        className="text-red-500 hover:text-red-700"
                        title="Reject"
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
      )}
    </div>
  );
}
