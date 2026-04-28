import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MenuAPI } from '../api/client.js';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  useEffect(() => { MenuAPI.list().then(items => setFeatured(items.slice(0, 3))).catch(() => {}); }, []);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-text">
          <span className="eyebrow">Seasonal · Garden-Forward</span>
          <h1 data-gsap="hero-title">Where the harvest becomes the menu.</h1>
          <p data-gsap="hero-sub">An intimate kitchen rooted in what local farmers grow this week. Slow techniques, bright flavors, quiet service.</p>
          <div className="hero-actions" data-gsap="hero-cta">
            <Link to="/reservations" className="btn btn-primary">Reserve a Table</Link>
            <Link to="/order" className="btn btn-ghost">Order Online</Link>
          </div>
        </div>
        <div className="hero-image" data-gsap="hero-image">
          <div className="hero-meta">
            <span>Est. 2014</span>
            <span>Portland, OR</span>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="section">
        <div className="container sec-head" data-gsap="reveal">
          <span className="eyebrow">Our Approach</span>
          <h2>Three quiet principles</h2>
          <div className="gold-divider" />
          <p>We build menus from soil up — never the other way around.</p>
        </div>
        <div className="container grid grid-3" data-gsap="reveal-stagger">
          {[
            { t: 'Hyper-Seasonal', d: 'Menus rewritten weekly around what arrives at the back door.' },
            { t: 'Slow Craft', d: 'Stocks simmered for 12 hours. Bread proofed for 36. Patience as ingredient.' },
            { t: 'Quiet Hospitality', d: 'No theatrics. Just thoughtful service that lets the food speak.' },
          ].map((c, i) => (
            <div key={c.t} className="card hover-lift">
              <span className="eyebrow">0{i+1}</span>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED DISHES */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container sec-head" data-gsap="reveal">
          <span className="eyebrow">This Week</span>
          <h2>From the kitchen</h2>
          <div className="gold-divider" />
        </div>
        <div className="container">
          {featured.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--muted)' }}>Run <code>npm run seed</code> in the backend to load sample dishes.</p>
          ) : (
            <div data-gsap="reveal-stagger">
              {featured.map(d => (
                <div key={d._id} className="dish">
                  <div className="dish-info">
                    <div className="dish-name">
                      <span className={`veg-dot ${d.isVeg ? 'veg' : 'nonveg'}`} />
                      {d.name}
                    </div>
                    <p className="dish-desc">{d.description}</p>
                  </div>
                  <div className="dish-price">${d.price}</div>
                </div>
              ))}
            </div>
          )}
          <div style={{ textAlign: 'center', marginTop: 48 }} data-gsap="reveal">
            <Link to="/menu" className="btn btn-ghost">View Full Menu →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: 'var(--emerald-900)', color: 'var(--ivory-50)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div data-gsap="parallax" style={{ position: 'absolute', inset: '-10% -5%', background: 'radial-gradient(600px 300px at 80% 20%, rgba(200,162,74,.18), transparent 60%), radial-gradient(500px 300px at 10% 90%, rgba(200,162,74,.10), transparent 60%)', pointerEvents: 'none' }} />
        <div className="container" data-gsap="reveal" style={{ position: 'relative' }}>
          <span className="eyebrow" style={{ color: 'var(--gold-400)' }}>An Invitation</span>
          <h2 style={{ color: 'var(--ivory-50)' }}>An evening at <em style={{ color: 'var(--gold-400)', fontStyle: 'italic' }}>Marshall</em></h2>
          <div className="gold-divider" />
          <p style={{ color: 'var(--ivory-200)', maxWidth: 580, margin: '16px auto 36px' }}>
            Twelve tables. Three hours. One quiet conversation with the season.
          </p>
          <Link to="/reservations" className="btn btn-light">Book Your Table</Link>
        </div>
      </section>
    </>
  );
}
