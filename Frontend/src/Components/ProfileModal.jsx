import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { FaUser, FaFolderOpen, FaPaperPlane, FaEdit ,FaSignOutAlt} from "react-icons/fa";



function ProfileModal({ admin, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">My Account</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>
        
        <div className="flex flex-col items-center mb-4">
          <img
            src={admin?.profilePic || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4"
          />
          <div className="w-full space-y-4">
            <div>
              <label className="text-gray-600 text-sm">Name</label>
              <p className="font-semibold">{admin?.name}</p>
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