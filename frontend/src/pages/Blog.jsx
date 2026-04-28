import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BlogAPI } from '../api/client.js';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { BlogAPI.list().then(setPosts).catch(() => {}).finally(() => setLoading(false)); }, []);

  return (
    <>
      <header className="page-head">
        <div className="container">
          <span className="eyebrow">Stories from the kitchen</span>
          <h1 data-gsap="page-title">The Journal</h1>
        </div>
      </header>
      <section className="section">
        <div className="container">
          {loading && <p style={{ textAlign: 'center', color: 'var(--muted)' }}>Loading…</p>}
          {!loading && posts.length === 0 && <div className="notice">No posts yet. Run <code>npm run seed</code>.</div>}
          <div className="grid grid-3">
            {posts.map((p, i) => (
              <Link key={p._id} to={`/blog/${p.slug}`} className={`card hover-lift anim-fade-up delay-${(i%3)+1}`}>
                <span className="eyebrow">{p.category}</span>
                <h3>{p.title}</h3>
                <p style={{ marginTop: 8 }}>{p.excerpt}</p>
                <div style={{ marginTop: 18, fontSize: '.85rem', color: 'var(--sage-700)' }}>Read article →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
