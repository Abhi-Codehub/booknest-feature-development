import { useEffect, useMemo, useState } from "react";
import { Search, BookOpen, Library, UserRound, X, Bookmark, Clock3 } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
const categories = ["All", "Technology", "Self Development", "Productivity", "Finance"];

export default function App() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadBooks() {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ q: query, category });
      const response = await fetch(`${API}/books?${params}`);
      if (!response.ok) throw new Error("Could not load books");
      setBooks(await response.json());
    } catch {
      setError("Unable to connect to BookNest API. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadBooks(); }, [query, category]);

  const availableCount = useMemo(() => books.reduce((sum, book) => sum + book.availableCopies, 0), [books]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand"><span className="brand-icon"><Library size={21}/></span><span>book<span className="brand-accent">nest</span></span></div>
        <nav><a className="active" href="#catalog">Explore</a><a href="#how">About</a></nav>
        <div className="member"><span className="avatar"><UserRound size={17}/></span><span>Demo Member</span></div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
            <h1>Find your next<br/><em>great read.</em></h1>
            <p>Explore a thoughtfully curated collection of books. Learn something new, discover fresh ideas, and keep growing.</p>
            <a className="hero-link" href="#catalog">Explore the collection <span>→</span></a>
          </div>
          <div className="hero-art">
            <div className="sun"></div>
            <div className="book-stack stack-one"><span>THE ART OF<br/>FOCUS</span></div>
            <div className="book-stack stack-two"><span>BUILD<br/>BETTER</span></div>
            <div className="book-stack stack-three"><span>IDEAS<br/>THAT LAST</span></div>
            <div className="plant">✳</div>
          </div>
        </section>

        <section className="stats">
          <div><strong>{books.length}</strong><span>Books in this view</span></div>
          <div><strong>{availableCount}</strong><span>Copies available</span></div>
          <div><strong>6</strong><span>Curated titles</span></div>
        </section>

        <section className="catalog" id="catalog">
          <div className="section-heading"><div><span className="eyebrow">THE COLLECTION</span><h2>Explore the library</h2></div><span className="catalog-note"><BookOpen size={16}/> Curiosity lives here</span></div>
          <div className="toolbar">
            <div className="search"><Search size={18}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by title or author..." /></div>
            <div className="filters">{categories.map(item => <button key={item} className={category === item ? "filter active-filter" : "filter"} onClick={() => setCategory(item)}>{item}</button>)}</div>
          </div>

          {error && <div className="notice error">{error}</div>}
          {loading ? <div className="empty">Loading the collection...</div> :
            books.length === 0 ? <div className="empty">No books found. Try another search.</div> :
            <div className="book-grid">{books.map((book, index) => <article className="book-card" key={book.id}>
              <div className={`cover cover-${index % 6}`}><span className="cover-label">BOOKNEST EDITION</span><div className="cover-title">{book.title}</div><div className="cover-author">{book.author}</div><div className="cover-mark">✳</div></div>
              <div className="book-info"><span className="category">{book.category}</span><h3>{book.title}</h3><p>by {book.author}</p><div className="book-bottom"><span className={book.availableCopies > 0 ? "availability" : "unavailable"}>{book.availableCopies > 0 ? `${book.availableCopies} copies available` : "Currently unavailable"}</span><button className="details-btn" onClick={() => setSelected(book)}>Details <span>→</span></button></div></div>
            </article>)}</div>
          }
        </section>

        <section className="how" id="how"><div><span className="eyebrow">A SPACE TO KEEP LEARNING</span><h2>Good books.<br/><em>Better perspectives.</em></h2></div><p>BookNest brings a growing collection of thoughtful reads together in one place. Find a title that speaks to you and make room for a new idea.</p></section>
      </main>

      {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><div className="modal" onClick={e => e.stopPropagation()}>
        <button className="close" onClick={() => setSelected(null)} aria-label="Close"><X size={20}/></button>
        <span className="eyebrow">BOOK DETAILS</span><h2>{selected.title}</h2><p className="modal-author">by {selected.author}</p><p>{selected.description}</p>
        <div className="detail-row"><span>Category</span><strong>{selected.category}</strong></div><div className="detail-row"><span>Published</span><strong>{selected.year}</strong></div><div className="detail-row"><span>Copies available</span><strong>{selected.availableCopies} / {selected.totalCopies}</strong></div>
        <div className="feature-placeholder"><Bookmark size={18}/><div><strong>Reservations coming soon</strong><span>Book reservation and waitlist functionality is not available yet.</span></div></div>
        <button className="primary-btn" onClick={() => setSelected(null)}>Back to collection</button>
      </div></div>}
      <footer><div className="brand"><span className="brand-icon"><Library size={18}/></span><span>book<span className="brand-accent">nest</span></span></div><span>Read more. Discover more.</span><span>© 2026 BookNest</span></footer>
    </div>
  );
}
