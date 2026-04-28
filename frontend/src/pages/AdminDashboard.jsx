import { useEffect, useState } from 'react';
import { OrderAPI, ReservationAPI, ContactAPI, BlogAPI } from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';

const TABS = [
  { key: 'orders', label: 'Orders' },
  { key: 'reservations', label: 'Reservations' },
  { key: 'contacts', label: 'Messages' },
  { key: 'blog', label: 'Blog' },
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [tab, setTab] = useState('orders');
  const [data, setData] = useState({ orders: [], reservations: [], contacts: [], blog: [] });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const load = async () => {
    setLoading(true);
    setErr('');
    try {
      const [orders, reservations, contacts, blog] = await Promise.all([
        OrderAPI.list().catch(() => []),
        ReservationAPI.list().catch(() => []),
        ContactAPI.list().catch(() => []),
        BlogAPI.list().catch(() => []),
      ]);
      setData({
        orders: Array.isArray(orders) ? orders : (orders?.data || []),
        reservations: Array.isArray(reservations) ? reservations : (reservations?.data || []),
        contacts: Array.isArray(contacts) ? contacts : (contacts?.data || []),
        blog: Array.isArray(blog) ? blog : (blog?.data || []),
      });
    } catch (e) {
      setErr(e?.response?.data?.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const stats = [
    { label: 'Orders', value: data.orders.length },
    { label: 'Reservations', value: data.reservations.length },
    { label: 'Messages', value: data.contacts.length },
    { label: 'Blog posts', value: data.blog.length },
  ];

  return (
    <section className="container admin-page">
      <header className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p className="muted">Signed in as <strong>{user?.name}</strong> ({user?.email})</p>
        </div>
        <div className="admin-actions">
          <button className="btn ghost" onClick={load} disabled={loading}>{loading ? 'Refreshing…' : 'Refresh'}</button>
          <button className="btn" onClick={logout}>Logout</button>
        </div>
      </header>

      <div className="admin-stats">
        {stats.map(s => (
          <div key={s.label} className="stat-card">
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <nav className="admin-tabs">
        {TABS.map(t => (
          <button
            key={t.key}
            className={`admin-tab ${tab === t.key ? 'active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {err && <p className="auth-error">{err}</p>}

      <div className="admin-panel">
        {tab === 'orders' && <OrdersTable rows={data.orders} />}
        {tab === 'reservations' && <ReservationsTable rows={data.reservations} onRefresh={load} />}
        {tab === 'contacts' && <ContactsTable rows={data.contacts} />}
        {tab === 'blog' && <BlogTable rows={data.blog} />}
      </div>
    </section>
  );
}

function fmtDate(d) {
  if (!d) return '—';
  try { return new Date(d).toLocaleString(); } catch { return String(d); }
}

function Empty({ label }) {
  return <p className="muted">No {label} yet.</p>;
}

function OrdersTable({ rows }) {
  if (!rows.length) return <Empty label="orders" />;
  return (
    <div className="table-wrap">
      <table className="admin-table">
        <thead>
          <tr><th>Date</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th></tr>
        </thead>
        <tbody>
          {rows.map(o => (
            <tr key={o._id}>
              <td>{fmtDate(o.createdAt)}</td>
              <td>{o.customer?.name || o.name || '—'}<br/><small className="muted">{o.customer?.email || o.email || ''}</small></td>
              <td>{(o.items || []).map(i => `${i.name} ×${i.qty || i.quantity || 1}`).join(', ') || '—'}</td>
              <td>${Number(o.total ?? 0).toFixed(2)}</td>
              <td>{o.status || 'pending'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ReservationsTable({ rows, onRefresh }) {
  if (!rows.length) return <Empty label="reservations" />;
  const updateStatus = async (id, status) => {
    try {
      await ReservationAPI.updateStatus(id, status);
      onRefresh?.();
    } catch (e) {
      alert(e?.response?.data?.message || 'Failed to update');
    }
  };
  return (
    <div className="table-wrap">
      <table className="admin-table">
        <thead>
          <tr><th>Date</th><th>Name</th><th>Party</th><th>When</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r._id}>
              <td>{fmtDate(r.createdAt)}</td>
              <td>{r.name}<br/><small className="muted">{r.email} · {r.phone}</small></td>
              <td>{r.guests || r.partySize || '—'}</td>
              <td>{r.date ? `${r.date} ${r.time || ''}` : '—'}</td>
              <td>{r.status || 'pending'}</td>
              <td className="row-actions">
                <button className="btn small" onClick={() => updateStatus(r._id, 'confirmed')}>Confirm</button>
                <button className="btn small ghost" onClick={() => updateStatus(r._id, 'cancelled')}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ContactsTable({ rows }) {
  if (!rows.length) return <Empty label="messages" />;
  return (
    <div className="table-wrap">
      <table className="admin-table">
        <thead>
          <tr><th>Date</th><th>From</th><th>Message</th></tr>
        </thead>
        <tbody>
          {rows.map(c => (
            <tr key={c._id}>
              <td>{fmtDate(c.createdAt)}</td>
              <td>{c.name}<br/><small className="muted">{c.email}</small></td>
              <td>{c.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BlogTable({ rows }) {
  if (!rows.length) return <Empty label="posts" />;
  return (
    <div className="table-wrap">
      <table className="admin-table">
        <thead>
          <tr><th>Title</th><th>Slug</th><th>Category</th><th>Created</th></tr>
        </thead>
        <tbody>
          {rows.map(p => (
            <tr key={p._id}>
              <td>{p.title}</td>
              <td><code>{p.slug}</code></td>
              <td>{p.category}</td>
              <td>{fmtDate(p.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
