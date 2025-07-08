import express from 'express';
import axios from 'axios';

const router = express.Router();
const GNEWS_KEY = process.env.GNEWS_API_KEY;

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://gnews.io/api/v4/top-headlines', {
      params: {
        lang: 'en',
        country: 'us',
        max: 20,
        token: GNEWS_KEY,
      },
    });
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch GNews' });
  }
});

export default router;
