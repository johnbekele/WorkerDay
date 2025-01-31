import React, { useState } from "react";
import { FaUser, FaFolderOpen, FaPaperPlane, FaEdit } from "react-icons/fa";

export default function EmployeeDashboard() {
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-5 space-y-4">
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
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeSection === "profile" && <ProfileSection />}
        {activeSection === "cases" && <CasesSection />}
        {activeSection === "requests" && <RequestsSection />}
      </main>
    </div>
  );
}

function ProfileSection() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Profile</h2>
      <div className="bg-white shadow-md rounded p-4">
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> john@example.com</p>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded mt-4">
          <FaEdit /> <span>Edit Profile</span>
        </button>
      </div>
    </div>
  );
}

function CasesSection() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Cases</h2>
      <table className="w-full mt-4 bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Case ID</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="p-2">#12345</td>
            <td className="p-2">In Progress</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function RequestsSection() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Send Request</h2>
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Describe your request..."
      ></textarea>
      <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded mt-4">
        <FaPaperPlane /> <span>Submit</span>
      </button>
    </div>
  );
}
