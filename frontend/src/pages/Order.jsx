import { useEffect, useState } from 'react';
import { MenuAPI, OrderAPI } from '../api/client.js';
import { useCart } from '../context/CartContext.jsx';

export default function Order() {
  const [items, setItems] = useState([]);
  const { items: cart, subtotal, dispatch } = useCart();
  const [customer, setCustomer] = useState({ name: '', phone: '', email: '', address: '' });
  const [pay, setPay] = useState('cash');
  const [status, setStatus] = useState(null);
  const [toast, setToast] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { MenuAPI.list().then(setItems).catch(() => {}); }, []);

  const showToast = (msg, ok = true) => {
    setToast({ ok, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const place = async (e) => {
    e.preventDefault();
    setStatus(null);
    if (cart.length === 0) {
      setStatus({ ok: false, msg: 'Your cart is empty.' });
      showToast('Your cart is empty.', false);
      return;
    }
    setSubmitting(true);
    try {
      const order = await OrderAPI.create({
        customer,
        items: cart.map(i => ({ itemId: i._id, name: i.name, price: i.price, qty: i.qty })),
        paymentMethod: pay,
      });
      const ref = order?._id ? order._id.slice(-6).toUpperCase() : Math.random().toString(36).slice(-6).toUpperCase();
      const successMsg = `Order placed successfully! Reference #${ref}. Estimated 35–45 min.`;
      setStatus({ ok: true, msg: successMsg });
      showToast('🎉 Order placed successfully!');
      dispatch({ type: 'CLEAR' });
      setCustomer({ name: '', phone: '', email: '', address: '' });
    } catch (err) {
      const msg = err.response?.data?.message || 'Could not place order. Please ensure the backend is running.';
      setStatus({ ok: false, msg });
      showToast(msg, false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {toast && (
        <div className={`order-toast ${toast.ok ? 'success' : 'error'}`} role="status" aria-live="polite">
          {toast.msg}
        </div>
      )}
      <header className="page-head">
        <div className="container">
          <span className="eyebrow">Delivery & takeaway</span>
          <h1 data-gsap="page-title">Order Online</h1>
        </div>
      </header>
      <section className="section">
        <div className="container grid" style={{ gridTemplateColumns: '1.4fr 1fr', gap: 40 }}>
          <div>
            <h2 style={{ marginBottom: 24 }}>Choose your dishes</h2>
            {items.length === 0 && <p style={{ color: 'var(--muted)' }}>No items yet. Seed the database to populate the menu.</p>}
            {items.map(d => (
              <div key={d._id} className="dish">
                <div className="dish-info">
                  <div className="dish-name"><span className={`veg-dot ${d.isVeg ? 'veg' : 'nonveg'}`} />{d.name}</div>
                  <p className="dish-desc">{d.description}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="dish-price">${d.price}</div>
                  <button className="btn btn-ghost" style={{ padding: '6px 14px', fontSize: '.8rem', marginTop: 6 }} onClick={() => dispatch({ type: 'ADD', item: d })}>Add</button>
                </div>
              </div>
            ))}
          </div>

          <aside>
            <div className="cart anim-fade-up">
              <h3 style={{ marginBottom: 14 }}>Your Cart</h3>
              {cart.length === 0 && <p style={{ color: 'var(--muted)' }}>No items yet.</p>}
              {cart.map(i => (
                <div key={i._id} className="cart-row">
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500 }}>{i.name}</div>
                    <div style={{ fontSize: '.85rem', color: 'var(--muted)' }}>${i.price} ea</div>
                  </div>
                  <div className="qty-ctrl">
                    <button onClick={() => dispatch({ type: 'DEC', id: i._id })}>−</button>
                    <span>{i.qty}</span>
                    <button onClick={() => dispatch({ type: 'INC', id: i._id })}>+</button>
                  </div>
                  <div style={{ width: 60, textAlign: 'right' }}>${(i.price * i.qty).toFixed(2)}</div>
                </div>
              ))}
              {cart.length > 0 && (
                <>
                  <div className="cart-row" style={{ fontWeight: 600, fontSize: '1.1rem', borderBottom: 0 }}>
                    <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
                  </div>
                  <form onSubmit={place} style={{ marginTop: 16 }}>
                    {status && <div className={`notice ${status.ok ? '' : 'error'}`}>{status.msg}</div>}
                    <div className="field"><label>Name</label><input required value={customer.name} onChange={e => setCustomer({ ...customer, name: e.target.value })} /></div>
                    <div className="field"><label>Phone</label><input required value={customer.phone} onChange={e => setCustomer({ ...customer, phone: e.target.value })} /></div>
                    <div className="field"><label>Email</label><input type="email" value={customer.email} onChange={e => setCustomer({ ...customer, email: e.target.value })} /></div>
                    <div className="field"><label>Delivery Address</label><textarea required rows="2" value={customer.address} onChange={e => setCustomer({ ...customer, address: e.target.value })} /></div>
                    <div className="field"><label>Payment</label>
                      <select value={pay} onChange={e => setPay(e.target.value)}>
                        <option value="cash">Cash on delivery</option>
                        <option value="card">Card on delivery</option>
                        <option value="upi">UPI</option>
                      </select>
                    </div>
                    <button className="btn btn-primary" disabled={submitting} style={{ width: '100%', justifyContent: 'center' }}>
                      {submitting ? 'Placing…' : 'Place Order'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
