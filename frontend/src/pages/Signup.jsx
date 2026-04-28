import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Signup() {
  const { signup } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setBusy(true);
    try {
      await signup(form.name.trim(), form.email.trim(), form.password);
      nav('/', { replace: true });
    } catch (e) {
      setErr(e?.response?.data?.message || 'Signup failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="container auth-page">
      <div className="auth-card">
        <h1>Create your account</h1>
        <p className="muted">Join Verdant to reserve, order, and more.</p>
        <form onSubmit={onSubmit} className="auth-form">
          <label>Name
            <input name="name" type="text" required maxLength={100} value={form.name} onChange={onChange} autoComplete="name" />
          </label>
          <label>Email
            <input name="email" type="email" required value={form.email} onChange={onChange} autoComplete="email" />
          </label>
          <label>Password
            <input name="password" type="password" required minLength={6} value={form.password} onChange={onChange} autoComplete="new-password" />
            <small className="muted">At least 6 characters.</small>
          </label>
          {err && <p className="auth-error">{err}</p>}
          <button className="btn primary" disabled={busy}>{busy ? 'Creating…' : 'Create account'}</button>
        </form>
        <p className="muted small">Already have an account? <Link to="/login">Sign in</Link></p>
      </div>
    </section>
  );
}
