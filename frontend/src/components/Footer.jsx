import { Link } from 'react-router-dom';
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container grid grid-4">
        <div>
          <h4>Marshall</h4>
          <p style={{ color: 'var(--cream-200)', opacity: .8 }}>Seasonal garden kitchen rooted in farm-to-table craft.</p>
        </div>
        <div>
          <h4>Visit</h4>
          <p style={{ color: 'var(--cream-200)', opacity: .8 }}>Ground Floor Titanium Square,Thaltej<br/>Ahmedabad, OR 382021</p>
        </div>
        <div>
          <h4>Hours</h4>
          <p style={{ color: 'var(--cream-200)', opacity: .8 }}>Mon – Sat · 5pm – 10pm<br/>Sun Lunch · 10am – 2pm</p>
        </div>
        <div>
          <h4>Explore</h4>
          <Link to="/menu">Menu</Link>
          <Link to="/reservations">Reservations</Link>
          <Link to="/order">Online Order</Link>
          <Link to="/blog">Journal</Link>
        </div>
      </div>
      <div className="container footer-bottom">© {new Date().getFullYear()} Marshall Kitchen.</div>
    </footer>
  );
}
