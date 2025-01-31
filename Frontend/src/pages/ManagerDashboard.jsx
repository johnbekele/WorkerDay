import React, { useState } from "react";
import { FaUsers, FaEye, FaCheck, FaFolderOpen } from "react-icons/fa";

export default function ManagerDashboard() {
  const [activeSection, setActiveSection] = useState("employees");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-5 space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Manager Panel</h2>
        <button
          onClick={() => setActiveSection("employees")}
          className="flex items-center space-x-2 py-2 px-4 bg-gray-700 hover:bg-gray-600 w-full text-left"
        >
          <FaUsers /> <span>View Employees</span>
        </button>
        <button
          onClick={() => setActiveSection("requests")}
          className="flex items-center space-x-2 py-2 px-4 bg-gray-700 hover:bg-gray-600 w-full text-left"
        >
          <FaCheck /> <span>Approve Requests</span>
        </button>
        <button
          onClick={() => setActiveSection("cases")}
          className="flex items-center space-x-2 py-2 px-4 bg-gray-700 hover:bg-gray-600 w-full text-left"
        >
          <FaFolderOpen /> <span>Check Cases</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeSection === "employees" && <EmployeesSection />}
        {activeSection === "requests" && <RequestsSection />}
        {activeSection === "cases" && <CasesSection />}
      </main>
    </div>
  );
}

function EmployeesSection() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Employee List</h2>
      <table className="w-full mt-4 bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Department</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="p-2">Jane Smith</td>
            <td className="p-2">Sales</td>
            <td className="p-2 space-x-2">
              <button className="text-blue-500"><FaEye /></button>
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
      <h2 className="text-xl font-bold mb-4">Approve Requests</h2>
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
            <td className="p-2">Leave Request</td>
            <td className="p-2">Pending</td>
            <td className="p-2 space-x-2">
              <button className="text-green-500"><FaCheck /></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function CasesSection() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Case Management</h2>
      <p>No cases at the moment.</p>
    </div>
  );
}
