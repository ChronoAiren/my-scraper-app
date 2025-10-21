import { useState } from 'react'
import './App.css'

function App() {
  const [headlines, setHeadlines] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchHeadlines = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/api/headlines')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setHeadlines(data)
      if (data.length === 0) {
        setError('No headlines found. The scraper might need updates.')
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
        <p>Fetching from BBC News</p>
      </header>
      <main>
        <button onClick={fetchHeadlines} disabled={loading} className="fetch-button">
          {loading ? 'Fetching Headlines...' : 'Fetch Headlines'}
        </button>
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
            !loading && !error && <p>No headlines loaded yet. Click the button to fetch.</p>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
