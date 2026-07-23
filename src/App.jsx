import { useEffect, useMemo, useState } from 'react'
import quotes from './quotes.json'

/* ─── Constants ──────────────────────────────────────────────── */
const ALL = 'All'

/** Returns a CSS class name based on category for colour-coded badges */
const badgeClass = (category) => {
  const map = {
    Creativity: 'badge-creativity',
    Leadership: 'badge-leadership',
    Philosophy: 'badge-philosophy',
    Wisdom:     'badge-wisdom',
    Humour:     'badge-humour',
  }
  return map[category] ?? 'badge-default'
}

/** Picks a random quote from pool, avoiding previousId if possible */
const getRandomQuote = (pool, previousId = null) => {
  if (!pool.length) return null
  if (pool.length === 1) return pool[0]
  let pick = pool[Math.floor(Math.random() * pool.length)]
  while (pick.id === previousId) {
    pick = pool[Math.floor(Math.random() * pool.length)]
  }
  return pick
}

/* ─── App component ──────────────────────────────────────────── */
function App() {
  const [category, setCategory]     = useState(ALL)
  const [search, setSearch]         = useState('')
  const [currentQuote, setCurrent]  = useState(null)
  const [favoriteIds, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('favoriteQuotes') ?? '[]') }
    catch { return [] }
  })

  /* Derived category list */
  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(quotes.map(q => q.category))).sort()],
    [],
  )

  /* Filtered quote pool */
  const pool = useMemo(() => {
    const term = search.trim().toLowerCase()
    return quotes.filter(q => {
      const catOk    = category === ALL || q.category === category
      const searchOk = !term || q.text.toLowerCase().includes(term) || q.author.toLowerCase().includes(term)
      return catOk && searchOk
    })
  }, [category, search])

  /* Favourite quote objects */
  const favorites = useMemo(() => quotes.filter(q => favoriteIds.includes(q.id)), [favoriteIds])

  /* On mount – pick initial random quote */
  useEffect(() => { setCurrent(getRandomQuote(quotes)) }, [])

  /* When pool changes, pick a new random from it */
  useEffect(() => {
    setCurrent(prev => getRandomQuote(pool, prev?.id))
  }, [pool])

  /* Persist favorites */
  useEffect(() => {
    localStorage.setItem('favoriteQuotes', JSON.stringify(favoriteIds))
  }, [favoriteIds])

  /* Handlers */
  const handleNewQuote = () => setCurrent(prev => getRandomQuote(pool, prev?.id))

  const toggleFavorite = id =>
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id],
    )

  const isFavorite = currentQuote ? favoriteIds.includes(currentQuote.id) : false

  /* ── Render ─────────────────────────────────────────────────── */
  return (
    <main className="app-shell">
      <section className="app-container">

        {/* ── Hero ─── */}
        <header className="hero">
          <p className="eyebrow">✦ Inspire Your Day</p>
          <h1>Niharika's Quote Hub</h1>
          <p className="hero-text">
            Explore words of wisdom across five unique categories. Filter, search,
            and collect your favourite quotes seamlessly.
          </p>
        </header>

        {/* ── Controls ─── */}
        <section className="controls-panel" aria-label="Filter controls">
          <div className="control-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label htmlFor="search">Search Quotes or Authors</label>
            <input
              id="search"
              type="text"
              placeholder="Type a keyword or author name…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </section>

        {/* ── Main content ─── */}
        <section className="content-grid">

          {/* Quote card */}
          <article className="quote-card">
            <div className="quote-card-top">
              <span className={`badge ${currentQuote ? badgeClass(currentQuote.category) : 'badge-default'}`}>
                {currentQuote ? currentQuote.category : 'No results'}
              </span>

              {currentQuote && (
                <button
                  type="button"
                  className={`favorite-button ${isFavorite ? 'active' : ''}`}
                  aria-label={isFavorite ? 'Remove from favourites' : 'Add to favourites'}
                  onClick={() => toggleFavorite(currentQuote.id)}
                >
                  {isFavorite ? '★ Favourited' : '☆ Add to Favourites'}
                </button>
              )}
            </div>

            {currentQuote ? (
              <>
                <blockquote>"{currentQuote.text}"</blockquote>
                <div className="quote-meta">
                  <p>— {currentQuote.author}</p>
                  <span>{currentQuote.category}</span>
                </div>
              </>
            ) : (
              <div className="empty-state">
                <h2>No quotes found</h2>
                <p>Try a different category or clear your search.</p>
              </div>
            )}

            <button
              id="new-quote-btn"
              type="button"
              className="primary-button"
              onClick={handleNewQuote}
              disabled={!pool.length}
            >
              ✦ New Quote
            </button>
          </article>

          {/* Results panel */}
          <aside className="results-panel" aria-label="Matching quotes">
            <div className="panel-header">
              <h2>Matching Quotes</h2>
              <span>{pool.length} found</span>
            </div>

            <div className="results-list">
              {pool.length ? (
                pool.map(q => (
                  <button
                    type="button"
                    key={q.id}
                    className={`result-item ${currentQuote?.id === q.id ? 'selected' : ''}`}
                    onClick={() => setCurrent(q)}
                  >
                    <strong>{q.author}</strong>
                    <p>{q.text}</p>
                    <span>{q.category}</span>
                  </button>
                ))
              ) : (
                <p className="no-results-message">No quotes match your current filters.</p>
              )}
            </div>
          </aside>
        </section>

        {/* ── Favorites ─── */}
        <section className="favorites-panel" aria-label="Favourite quotes">
          <div className="panel-header">
            <h2>💛 Favourite Quotes</h2>
            <span>{favorites.length} saved</span>
          </div>

          {favorites.length ? (
            <div className="favorites-grid">
              {favorites.map(q => (
                <article key={q.id} className="favorite-card">
                  <p>"{q.text}"</p>
                  <footer>
                    <div>
                      <strong>{q.author}</strong>
                      <span className={`badge ${badgeClass(q.category)}`} style={{ marginTop: 6, fontSize: '0.72rem' }}>
                        {q.category}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="text-button"
                      onClick={() => toggleFavorite(q.id)}
                    >
                      Remove
                    </button>
                  </footer>
                </article>
              ))}
            </div>
          ) : (
            <p className="empty-favorites">
              Click "☆ Add to Favourites" on any quote to save it here.
              Your favourites are stored in your browser's localStorage.
            </p>
          )}
        </section>

      </section>
    </main>
  )
}

export default App
