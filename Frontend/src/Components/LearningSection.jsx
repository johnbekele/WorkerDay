import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaFilter, FaSort, FaPlay, FaEye } from 'react-icons/fa';

const LearningSection = () => {
  // Initialize state with proper default values
  const [learningData, setLearningData] = useState({
    items: [],
    pageInfo: {
      totalResults: 0,
      resultsPerPage: 0
    },
    nextPageToken: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageToken, setPageToken] = useState('');

  useEffect(() => {
    fetchLearningData();
  }, []);

  const fetchLearningData = async (nextPageToken = '') => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/learning${nextPageToken ? `?pageToken=${nextPageToken}` : ''}`);
      
      if (nextPageToken) {
        // Append new items to existing data
        setLearningData(prev => ({
          ...response.data,
          items: [...(prev?.items || []), ...response.data.items]
        }));
      } else {
        // Set initial data
        setLearningData(response.data);
      }
      
      setPageToken(response.data.nextPageToken);
      setLoading(false);
    } catch (err) {
      setError('Error fetching learning data');
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (pageToken) {
      fetchLearningData(pageToken);
    }
  };

  // Show loading state
  if (loading && !learningData.items.length) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show error state
  if (error && !learningData.items.length) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {learningData.items.map((channel) => (
    <div 
      key={channel.id.channelId}
      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all duration-200"
    >
      {/* Thumbnail Container - Reduced height */}
      <div className="relative group">
        <div className="aspect-video w-full overflow-hidden bg-gray-100">
          <img 
            src={channel.snippet.thumbnails.high.url}
            alt={channel.snippet.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Overlay on Hover - Adjusted button size */}
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <button 
            className="bg-white text-gray-800 px-4 py-1.5 rounded-full flex items-center space-x-1 hover:bg-gray-100 text-sm"
            onClick={() => window.open(`https://youtube.com/channel/${channel.id.channelId}`, '_blank')}
          >
            <FaPlay className="text-red-600 text-xs" />
            <span>View Channel</span>
          </button>
        </div>

        {/* Channel Avatar - Smaller size */}
        <div className="absolute -bottom-4 left-3">
          <img 
            src={channel.snippet.thumbnails.default.url}
            alt={`${channel.snippet.title} avatar`}
            className="w-8 h-8 rounded-full border-2 border-white shadow-md"
          />
        </div>
      </div>

      {/* Channel Info - Reduced padding and text size */}
      <div className="p-3 pt-6">
        <h3 className="font-medium text-sm text-gray-900 line-clamp-1 mb-0.5">
          {channel.snippet.title}
        </h3>
        <p className="text-xs text-gray-500 mb-1">
          {channel.snippet.channelTitle}
        </p>
        <p className="text-xs text-gray-600 line-clamp-2 mb-2">
          {channel.snippet.description}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-2">
          <span className="flex items-center">
            <FaEye className="mr-1 text-xs" />
            {new Date(channel.snippet.publishTime).toLocaleDateString()}
          </span>
          <button 
            className="bg-red-600 text-white px-3 py-1 rounded-full text-xs hover:bg-red-700"
            onClick={() => window.open(`https://youtube.com/channel/${channel.id.channelId}`, '_blank')}
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  ))}
</div>
  );
};

export default LearningSection;