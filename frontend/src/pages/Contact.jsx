import { useState } from 'react';
import { ContactAPI } from '../api/client.js';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault(); setStatus(null);
    try {
      const res = await ContactAPI.create(form);
      setStatus({ ok: true, msg: res.message });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ ok: false, msg: err.response?.data?.message || 'Could not reach server.' });
    }
  };

  return (
    <>
      <header className="page-head">
        <div className="container">
          <span className="eyebrow">Say hello</span>
          <h1 data-gsap="page-title">Contact</h1>
        </div>
      </header>
      <section className="section">
        <div className="container grid grid-2" style={{ gap: 60 }}>
          <div className="anim-slide">
            <h2>Visit us</h2>
            <p style={{ marginTop: 16 }}>248 Linden Lane<br/>Portland, OR 97204</p>
            <p style={{ marginTop: 16 }}><strong>Phone:</strong> +1 (503) 555-0148<br/><strong>Email:</strong> hello@verdant.kitchen</p>
            <h3 style={{ marginTop: 32 }}>Hours</h3>
            <p style={{ marginTop: 8 }}>Tue – Sat · 5pm – 10pm<br/>Sunday Brunch · 10am – 2pm<br/>Closed Mondays</p>
            <h3 style={{ marginTop: 32 }}>Parking</h3>
            <p style={{ marginTop: 8 }}>Street parking on Linden Lane. Validated lot one block south on Pine.</p>
            <iframe title="Map" src="https://maps.google.com/maps?q=Portland+OR&t=&z=13&ie=UTF8&iwloc=&output=embed" style={{ width: '100%', height: 280, border: 0, borderRadius: 'var(--radius)', marginTop: 24 }}></iframe>
          </div>
          <form onSubmit={submit} className="card anim-fade-up">
            {status && <div className={`notice ${status.ok ? '' : 'error'}`}>{status.msg}</div>}
            <div className="field"><label>Name</label><input required value={form.name} onChange={update('name')} /></div>
            <div className="field"><label>Email</label><input type="email" required value={form.email} onChange={update('email')} /></div>
            <div className="field"><label>Subject</label><input value={form.subject} onChange={update('subject')} /></div>
            <div className="field"><label>Message</label><textarea required rows="5" value={form.message} onChange={update('message')} /></div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Send Message</button>
          </form>
        </div>
      </section>
    </>
  );
}
