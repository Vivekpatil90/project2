import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <section className="section" style={{ textAlign: 'center', minHeight: '70vh', display: 'grid', placeItems: 'center' }}>
      <div>
        <span className="eyebrow">404</span>
        <h1>Page not found</h1>
        <p style={{ marginTop: 12, marginBottom: 28 }}>This dish isn't on tonight's menu.</p>
        <Link to="/" className="btn btn-primary">Back home</Link>
      </div>
    </section>
  );
}
