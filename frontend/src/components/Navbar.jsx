import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const links = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/blog', label: 'Journal' },
  { to: '/reservations', label: 'Reserve' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count } = useCart();
  const { user, isAdmin, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={close}>
          <span className="brand-dot" />
          <span>Marshall</span>
        </Link>
        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} onClick={close}>
              {l.label}
            </NavLink>
          ))}
          {isAdmin && (
            <NavLink to="/admin" onClick={close}>Dashboard</NavLink>
          )}
          <Link to="/order" className="nav-cart" onClick={close}>
            Order · {count}
          </Link>
          {user ? (
            <button
              type="button"
              className="nav-auth"
              onClick={() => { logout(); close(); }}
              title={`Signed in as ${user.email}`}
            >
              Logout
            </button>
          ) : (
            <NavLink to="/login" className="nav-auth" onClick={close}>
              Login
            </NavLink>
          )}
        </nav>
        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Menu">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>}
          </svg>
        </button>
      </div>
    </header>
  );
}
