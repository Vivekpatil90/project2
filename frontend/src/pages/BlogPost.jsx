import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BlogAPI } from '../api/client.js';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [err, setErr] = useState(null);
  useEffect(() => { BlogAPI.bySlug(slug).then(setPost).catch(() => setErr('Post not found')); }, [slug]);

  if (err) return <section className="section container"><div className="notice error">{err}</div><Link to="/blog" className="btn btn-ghost">← Back</Link></section>;
  if (!post) return <section className="section container"><p>Loading…</p></section>;

  return (
    <article>
      <header className="page-head">
        <div className="container">
          <span className="eyebrow">{post.category}</span>
          <h1 data-gsap="page-title">{post.title}</h1>
          <p className="anim-fade-up delay-1">By {post.author}</p>
        </div>
      </header>
      <section className="section">
        <div className="container" style={{ maxWidth: 720 }}>
          <p style={{ fontSize: '1.15rem', lineHeight: 1.8 }}>{post.body}</p>
          <Link to="/blog" className="btn btn-ghost" style={{ marginTop: 40 }}>← All articles</Link>
        </div>
      </section>
    </article>
  );
}
