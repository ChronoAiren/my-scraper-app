import { useState } from 'react'
import './App.css'

function App() {
  const [headlines, setHeadlines] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [url, setUrl] = useState('https://www.bbc.com/news')
  const [pages, setPages] = useState(1)

  const fetchHeadlines = async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams({ url, pages })
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/headlines?${params}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setHeadlines(data)
      if (data.length === 0) {
        setError('No headlines found. Check the URL or site structure.')
      }
    } catch (err) {
      setError(`Failed to fetch headlines: ${err.message}`)
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Latest News Headlines</h1>
        <p>Scrape headlines from any news site (BBC default)</p>
      </header>
      <main>
        <div className="controls">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter news site URL (e.g., https://www.bbc.com/news)"
            className="url-input"
          />
          <input
            type="number"
            value={pages}
            onChange={(e) => setPages(Math.max(1, e.target.value))}
            min="1"
            placeholder="Number of pages (default: 1)"
            className="pages-input"
          />
          <button onClick={fetchHeadlines} disabled={loading} className="fetch-button">
            {loading ? 'Fetching Headlines...' : 'Fetch Headlines'}
          </button>
        </div>
        {error && <div className="error">{error}</div>}
        <div className="headlines">
          {headlines.length > 0 ? (
            headlines.map((item, index) => (
              <article key={index} className="headline-card">
                <h2>{item.headline}</h2>
                <p className="summary">{item.summary}</p>
                <div className="meta">
                  <span className="date">{item.date}</span>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="link">
                    Read More
                  </a>
                </div>
              </article>
            ))
          ) : (
            !loading && !error && <p>No headlines loaded yet. Enter a URL and click fetch.</p>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
