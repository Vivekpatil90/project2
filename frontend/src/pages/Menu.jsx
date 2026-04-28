import { useEffect, useMemo, useState } from 'react';
import { MenuAPI } from '../api/client.js';
import { useCart } from '../context/CartContext.jsx';

const CATEGORIES = ['All', 'Starters', 'Main Course', 'Desserts', 'Beverages'];

export default function Menu() {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState('All');
  const [loading, setLoading] = useState(true);
  const { dispatch } = useCart();

  useEffect(() => {
    MenuAPI.list().then(setItems).catch(() => setItems([])).finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => active === 'All' ? items : items.filter(i => i.category === active), [active, items]);
  const grouped = useMemo(() => {
    const g = {};
    filtered.forEach(i => { (g[i.category] = g[i.category] || []).push(i); });
    return g;
  }, [filtered]);

  return (
    <>
      <header className="page-head">
        <div className="container">
          <span className="eyebrow">Updated weekly</span>
          <h1 data-gsap="page-title">The Menu</h1>
          <p className="anim-fade-up delay-1">Built around what arrived this morning.</p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="tabs">
            {CATEGORIES.map(c => (
              <button key={c} className={`tab ${active === c ? 'active' : ''}`} onClick={() => setActive(c)}>{c}</button>
            ))}
          </div>

          {loading && <p style={{ textAlign: 'center', color: 'var(--muted)' }}>Loading…</p>}
          {!loading && filtered.length === 0 && (
            <div className="notice">No dishes yet. Start the backend and run <code>npm run seed</code>.</div>
          )}

          {Object.entries(grouped).map(([cat, list]) => (
            <div key={cat} style={{ marginBottom: 56 }} className="anim-fade-up">
              <h2 style={{ marginBottom: 12 }}>{cat}</h2>
              {list.map(d => (
                <div key={d._id} className="dish">
                  <div className="dish-info">
                    <div className="dish-name">
                      <span className={`veg-dot ${d.isVeg ? 'veg' : 'nonveg'}`} />
                      {d.name}
                    </div>
                    <p className="dish-desc">{d.description}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="dish-price">${d.price}</div>
                    <button className="btn btn-ghost" style={{ padding: '6px 14px', fontSize: '.8rem', marginTop: 6 }} onClick={() => dispatch({ type: 'ADD', item: d })}>Add</button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
