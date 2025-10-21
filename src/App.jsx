import { useState } from 'react'
import './App.css'

function App() {
  const [headlines, setHeadlines] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchHeadlines = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:3001/api/headlines')
      const data = await response.json()
      setHeadlines(data)
    } catch (error) {
      console.error('Error fetching headlines:', error)
    }
    setLoading(false)
  }

  return (
    <div>
      <h1>Latest News Headlines</h1>
      <button onClick={fetchHeadlines} disabled={loading}>
        {loading ? 'Fetching...' : 'Fetch Headlines'}
      </button>
      <div>
        {headlines.map((item, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <h2>{item.headline}</h2>
            <p><strong>Date:</strong> {item.date}</p>
            <p><strong>Summary:</strong> {item.summary}</p>
            <a href={item.url} target="_blank" rel="noopener noreferrer">Read more</a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
