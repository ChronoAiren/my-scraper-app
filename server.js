import express from 'express';
import cors from 'cors';
import { scrapeBBCNews } from './scraper.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Endpoint to scrape and return headlines
app.get('/api/headlines', async (req, res) => {
  const url = req.query.url || 'https://www.bbc.com/news';
  const pages = parseInt(req.query.pages) || 1;
  try {
    const headlines = await scrapeBBCNews(pages, url);
    res.json(headlines);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch headlines' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
