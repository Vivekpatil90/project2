import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const from = loc.state?.from?.pathname || '/';
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setBusy(true);
    try {
      const u = await login(form.email.trim(), form.password);
      nav(u.role === 'admin' ? '/admin' : from, { replace: true });
    } catch (e) {
      setErr(e?.response?.data?.message || 'Login failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="container auth-page">
      <div className="auth-card">
        <h1>Welcome back</h1>
        <p className="muted">Sign in to your Verdant account.</p>
        <form onSubmit={onSubmit} className="auth-form">
          <label>Email
            <input name="email" type="email" required value={form.email} onChange={onChange} autoComplete="email" />
          </label>
          <label>Password
            <input name="password" type="password" required minLength={6} value={form.password} onChange={onChange} autoComplete="current-password" />
          </label>
          {err && <p className="auth-error">{err}</p>}
          <button className="btn primary" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
        </form>
        <p className="muted small">No account? <Link to="/signup">Create one</Link></p>
      </div>
    </section>
  );
}
