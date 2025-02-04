import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { FaUser, FaFolderOpen, FaPaperPlane, FaEdit ,FaSignOutAlt} from "react-icons/fa";

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


export default ProfileSection;