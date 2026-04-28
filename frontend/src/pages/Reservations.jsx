import { useState } from 'react';
import { ReservationAPI } from '../api/client.js';

export default function Reservations() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', time: '19:00', guests: 2, notes: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setStatus(null);
    try {
      await ReservationAPI.create(form);
      setStatus({ ok: true, msg: 'Reservation received! We\'ll confirm shortly by email.' });
      setForm({ name: '', email: '', phone: '', date: '', time: '19:00', guests: 2, notes: '' });
    } catch (err) {
      setStatus({ ok: false, msg: err.response?.data?.message || 'Something went wrong. Is the backend running?' });
    } finally { setLoading(false); }
  };

  return (
    <>
      <header className="page-head">
        <div className="container">
          <span className="eyebrow">Twelve tables. One quiet evening.</span>
          <h1 data-gsap="page-title">Reserve a Table</h1>
        </div>
      </header>
      <section className="section">
        <div className="container" style={{ maxWidth: 720 }}>
          {status && <div className={`notice ${status.ok ? '' : 'error'} anim-fade-up`}>{status.msg}</div>}
          <form onSubmit={submit} className="card anim-fade-up">
            <div className="row-2">
              <div className="field"><label>Name</label><input required value={form.name} onChange={update('name')} /></div>
              <div className="field"><label>Phone</label><input required value={form.phone} onChange={update('phone')} /></div>
            </div>
            <div className="field"><label>Email</label><input type="email" required value={form.email} onChange={update('email')} /></div>
            <div className="row-2">
              <div className="field"><label>Date</label><input type="date" required value={form.date} onChange={update('date')} /></div>
              <div className="field"><label>Time</label>
                <select value={form.time} onChange={update('time')}>
                  {['17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="field"><label>Guests</label>
              <select value={form.guests} onChange={update('guests')}>
                {Array.from({ length: 10 }, (_, i) => i + 1).map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div className="field"><label>Special requests</label><textarea rows="3" value={form.notes} onChange={update('notes')} placeholder="Allergies, occasion, seating…" /></div>
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
              {loading ? 'Sending…' : 'Request Reservation'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
