import React, { useState, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";

function RequestsSection() {
  const [request, setRequest] = useState("");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the authentication token from localStorage
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/requests/employee`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Add the authentication token
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch requests');
        }

        const data = await response.json();
        setRequests(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching requests:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) { // Only fetch if we have a token
      fetchRequests();
    } else {
      setError("Not authenticated. Please log in.");
      setLoading(false);
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!request.trim() || !token) return;

    try {
      const response = await fetch(`http://localhost:3000/api/requests/employee`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Add the authentication token
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestType: request.trim(),
          reason: request.trim()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit request');
      }

      setRequest("");

      // Refresh requests list
      const updatedResponse = await fetch(`http://localhost:3000/api/requests/employee`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Add the authentication token
          'Content-Type': 'application/json'
        }
      });

      if (!updatedResponse.ok) {
        throw new Error('Failed to fetch updated requests');
      }

      const updatedData = await updatedResponse.json();
      setRequests(Array.isArray(updatedData) ? updatedData : []);
    } catch (error) {
      console.error("Error submitting request:", error);
      setError(error.message);
    }
  };

  if (!token) {
    return <div className="text-red-500">Please log in to view and submit requests.</div>;
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  // Rest of the component remains the same...
 
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Send Request</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Describe your request..."
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          rows="4"
          required
        ></textarea>
        <button 
          type="submit"
          className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded mt-4 hover:bg-green-600 transition-colors"
          disabled={!request.trim()}
        >
          <FaPaperPlane /> <span>Submit</span>
        </button>
      </form>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">My Requests</h3>
        {requests.length === 0 ? (
          <p className="text-gray-500">No requests found</p>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div key={req.id} className="bg-white p-4 rounded shadow-md">
                <div className="flex justify-between items-start">
                  <div className="flex-grow">
                    <p className="font-semibold">Type: {req.requestType}</p>
                    <p className={`text-sm ${
                      req.status === 'approved' ? 'text-green-600' : 
                      req.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      Status: {req.status}
                    </p>
                    {req.reason && (
                      <p className="text-sm text-gray-700 mt-2">
                        Reason: {req.reason}
                      </p>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(req.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {req.approved_by && (
                  <p className="text-sm text-gray-600 mt-2">
                    Approved by: {req.approved_by}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RequestsSection;