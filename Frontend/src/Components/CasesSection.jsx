import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { FaUser, FaFolderOpen, FaPaperPlane, FaEdit ,FaSignOutAlt} from "react-icons/fa";

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


export default CasesSection;