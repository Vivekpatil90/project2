const photos = [
  'photo-1517248135467-4c7edcad34c4',
  'photo-1414235077428-338989a2e8c0',
  'photo-1466978913421-dad2ebd01d17',
  'photo-1559339352-11d035aa65de',
  'photo-1504754524776-8f4f37790ca0',
  'photo-1551218808-94e220e084d2',
  'photo-1559847844-5315695dadae',
  'photo-1565299624946-b28f40a0ae38',
  'photo-1473093295043-cdd812d0e601',
];
export default function Gallery() {
  return (
    <>
      <header className="page-head">
        <div className="container">
          <span className="eyebrow">Behind the pass</span>
          <h1 data-gsap="page-title">Gallery</h1>
          <p className="anim-fade-up delay-1">Light, plates, hands, fire.</p>
        </div>
      </header>
      <section className="section">
        <div className="container gallery">
          {photos.map((id, i) => (
            <a key={id} href={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`} className={`anim-scale-in delay-${(i%4)+1}`} target="_blank" rel="noreferrer">
              <img src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=70`} alt="Verdant" loading="lazy" />
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
