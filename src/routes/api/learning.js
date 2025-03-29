import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const query = 'coding';

router.get('/', async (req, res) => {
  try {
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      query
    )}&type=channel&key=${YOUTUBE_API_KEY}`;

    const response = await axios.get(apiUrl);

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching YouTube channel data:', error.message);
    res.status(500).json({
      error: 'An error occurred while fetching YouTube channel data',
    });
  }
});

export default router;
