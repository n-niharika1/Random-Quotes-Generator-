import { useEffect, useMemo, useState } from 'react'
import quotes from './quotes.json'

const ALL_CATEGORIES = 'All'

const getRandomQuote = (items, previousId = null) => {
  if (!items.length) {
    return null
  }

  if (items.length === 1) {
    return items[0]
  }

  let nextQuote = items[Math.floor(Math.random() * items.length)]

  while (nextQuote.id === previousId) {
    nextQuote = items[Math.floor(Math.random() * items.length)]
  }

  return nextQuote
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentQuote, setCurrentQuote] = useState(null)
  const [favoriteIds, setFavoriteIds] = useState(() => {
    const savedFavorites = localStorage.getItem('favoriteQuotes')
    return savedFavorites ? JSON.parse(savedFavorites) : []
  })

  const categories = useMemo(() => {
    return [ALL_CATEGORIES, ...new Set(quotes.map((quote) => quote.category))]
  }, [])

  const filteredQuotes = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return quotes.filter((quote) => {
      const matchesCategory =
        selectedCategory === ALL_CATEGORIES || quote.category === selectedCategory

      const matchesSearch =
        !normalizedSearch ||
        quote.text.toLowerCase().includes(normalizedSearch) ||
        quote.author.toLowerCase().includes(normalizedSearch)

      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchTerm])

  const favoriteQuotes = useMemo(() => {
    return quotes.filter((quote) => favoriteIds.includes(quote.id))
  }, [favoriteIds])

  useEffect(() => {
    const initialQuote = getRandomQuote(quotes)
    setCurrentQuote(initialQuote)
  }, [])

  useEffect(() => {
    localStorage.setItem('favoriteQuotes', JSON.stringify(favoriteIds))
  }, [favoriteIds])

  useEffect(() => {
    const nextQuote = getRandomQuote(filteredQuotes, currentQuote?.id)
    setCurrentQuote(nextQuote)
  }, [filteredQuotes])

  const handleNewQuote = () => {
    const nextQuote = getRandomQuote(filteredQuotes, currentQuote?.id)
    setCurrentQuote(nextQuote)
  }

  const toggleFavorite = (quoteId) => {
    setFavoriteIds((previousIds) =>
      previousIds.includes(quoteId)
        ? previousIds.filter((id) => id !== quoteId)
        : [...previousIds, quoteId],
    )
  }

  const isFavorite = currentQuote ? favoriteIds.includes(currentQuote.id) : false

  return (
    <main className="app-shell">
      <section className="app-container">
        <header className="hero">
          <p className="eyebrow">React Frontend Project</p>
          <h1>Random Quote Generator</h1>
          <p className="hero-text">
            Discover inspiring quotes, filter them by category, search instantly,
            and save your favorites.
          </p>
        </header>

        <section className="controls-panel">
          <div className="control-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="control-group search-group">
            <label htmlFor="search">Search Quotes or Authors</label>
            <input
              id="search"
              type="text"
              placeholder="Type a quote or author..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </section>

        <section className="content-grid">
          <article className="quote-card">
            <div className="quote-card-top">
              <span className="badge">
                {currentQuote ? currentQuote.category : 'No results'}
              </span>
              {currentQuote && (
                <button
                  type="button"
                  className={`favorite-button ${isFavorite ? 'active' : ''}`}
                  onClick={() => toggleFavorite(currentQuote.id)}
                >
                  {isFavorite ? '★ Favorited' : '☆ Add to Favorites'}
                </button>
              )}
            </div>

            {currentQuote ? (
              <>
                <blockquote>“{currentQuote.text}”</blockquote>
                <div className="quote-meta">
                  <p>{currentQuote.author}</p>
                  <span>{currentQuote.category}</span>
                </div>
              </>
            ) : (
              <div className="empty-state">
                <h2>No quotes found</h2>
                <p>Try a different category or search term.</p>
              </div>
            )}

            <button
              type="button"
              className="primary-button"
              onClick={handleNewQuote}
              disabled={!filteredQuotes.length}
            >
              New Quote
            </button>
          </article>

          <aside className="results-panel">
            <div className="panel-header">
              <h2>Matching Quotes</h2>
              <span>{filteredQuotes.length} found</span>
            </div>

            <div className="results-list">
              {filteredQuotes.length ? (
                filteredQuotes.map((quote) => (
                  <button
                    type="button"
                    key={quote.id}
                    className={`result-item ${
                      currentQuote?.id === quote.id ? 'selected' : ''
                    }`}
                    onClick={() => setCurrentQuote(quote)}
                  >
                    <strong>{quote.author}</strong>
                    <p>{quote.text}</p>
                    <span>{quote.category}</span>
                  </button>
                ))
              ) : (
                <p className="no-results-message">
                  No quotes match your current filters.
                </p>
              )}
            </div>
          </aside>
        </section>

        <section className="favorites-panel">
          <div className="panel-header">
            <h2>Favorite Quotes</h2>
            <span>{favoriteQuotes.length} saved</span>
          </div>

          {favoriteQuotes.length ? (
            <div className="favorites-grid">
              {favoriteQuotes.map((quote) => (
                <article key={quote.id} className="favorite-card">
                  <p>{quote.text}</p>
                  <footer>
                    <div>
                      <strong>{quote.author}</strong>
                      <span>{quote.category}</span>
                    </div>
                    <button
                      type="button"
                      className="text-button"
                      onClick={() => toggleFavorite(quote.id)}
                    >
                      Remove
                    </button>
                  </footer>
                </article>
              ))}
            </div>
          ) : (
            <p className="empty-favorites">
              Mark a quote as favorite to keep it in your personal collection.
            </p>
          )}
        </section>
      </section>
    </main>
  )
}

export default App
