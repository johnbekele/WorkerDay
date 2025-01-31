import React, { useState } from "react";
import { FaUsers, FaPlus, FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("users");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-5 space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Admin Panel</h2>
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
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeSection === "users" && <UsersSection />}
        {activeSection === "requests" && <RequestsSection />}
      </main>
    </div>
  );
}

function UsersSection() {
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
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="p-2">John Doe</td>
            <td className="p-2">john@example.com</td>
            <td className="p-2 space-x-2">
              <button className="text-blue-500"><FaEdit /></button>
              <button className="text-red-500"><FaTrash /></button>
            </td>
          </tr>
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
