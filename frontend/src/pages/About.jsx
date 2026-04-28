export default function About() {
  return (
    <>
      <header className="page-head">
        <div className="container">
          <span className="eyebrow">Since 2014</span>
          <h1 data-gsap="page-title">Our Story</h1>
        </div>
      </header>
      <section className="section">
        <div className="container grid grid-2" style={{ alignItems: 'center', gap: 60 }}>
          <div className="anim-slide">
            <span className="eyebrow">The Beginning</span>
            <h2>A kitchen built around a Standard</h2>
            <p style={{ marginTop: 18 }}>Marshall began as a Sunday supper in a converted greenhouse. Chef Mara Okafor cooked for friends with what she could pull from her grandmother's plot — heirloom tomatoes, sage, broad beans. Word travelled. Twelve tables later, the supper became a restaurant.</p>
            <p style={{ marginTop: 12 }}>A decade on, Marshall still cooks the way it began: with the seasons, with patience, with a deep respect for the people who grow our food.</p>
          </div>
          <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80" alt="Chef plating a dish" style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow)' }} className="anim-scale-in" />
        </div>
      </section>
      <section className="section" style={{ background: 'white' }}>
        <div className="container grid grid-3">
          {[
            { t: 'Cuisine', d: 'Modern Indian with Testy and Mediterranean roots' },
            { t: 'Founded', d: '2014 — by Vivek Oberoi' },
            { t: 'Mission', d: 'To cook honestly, source locally, and serve quietly' },
          ].map((c, i) => (
            <div key={c.t} className={`card anim-fade-up delay-${i+1}`}>
              <span className="eyebrow">{c.t}</span>
              <p style={{ marginTop: 6, fontSize: '1.05rem', color: 'var(--ink-900)' }}>{c.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
