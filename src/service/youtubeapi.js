import express from 'express';
import axios from 'axios';

// Initialize Express app
const app = express();

// Define the port for the server to listen on
const PORT = process.env.PORT || 3000;

// Replace with your actual YouTube Data API key (use environment variables in production)
const YOUTUBE_API_KEY = 'AIzaSyCbercC1x1u6xTGwcYSYyUmKw8u1sbIjO0';
const query = 'coding';

// Define a route to fetch YouTube channel details
app.get('/api/youtube/channels', async (req, res) => {
  try {
    // Extract the channel ID from the query parameters (e.g., /api/youtube/channels?channelId=UC_x5XG1OV2P6uZZ5FSM9Ttw)
    // const channelId = req.query.channelId;

    // if (!channelId) {
    //   return res.status(400).json({ error: 'Channel ID is required' });
    // }

    // Construct the API URL for the YouTube Data API
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      query
    )}&type=channel&key=${YOUTUBE_API_KEY}`;

    // Make a GET request to the YouTube Data API
    const response = await axios.get(apiUrl);

    // Send the API response back to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching YouTube channel data:', error.message);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching YouTube channel data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
