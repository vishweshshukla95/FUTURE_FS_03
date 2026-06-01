import { useState } from "react";
import { hotels } from "../data/travelData";

export default function Hotels() {
  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState(null);
  const [bookModal, setBookModal] = useState(null);
  const [name, setName] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [confirmed, setConfirmed] = useState(null);

  const countries = ["All", ...new Set(hotels.map(h => h.country))];
  const filtered = filter === "All" ? hotels : hotels.filter(h => h.country === filter);

  const getDays = () => {
    if (!checkin || !checkout) return 1;
    const diff = new Date(checkout) - new Date(checkin);
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const book = () => {
    if (!name || !checkin || !checkout) { alert("Please fill all fields!"); return; }
    const days = getDays();
    const booking = {
      id: "HTL" + Math.random().toString(36).substr(2, 6).toUpperCase(),
      type: "Hotel", hotel: bookModal.name,
      city: bookModal.city, country: bookModal.country,
      checkin, checkout, days,
      price: bookModal.price * days,
      passenger: name, status: "Confirmed"
    };
    const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
    localStorage.setItem("bookings", JSON.stringify([...existing, booking]));
    setConfirmed(booking);
    setBookModal(null);
  };

  return (
    <div style={{ minHeight: "80vh" }}>
      <div style={{ background: "linear-gradient(135deg, #0d2818, #2d6a4f)", padding: "4rem 2rem", textAlign: "center" }}>
        <h1 style={{ color: "white", fontSize: "2.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>🏨 Hotels & Resorts</h1>
        <p style={{ color: "rgba(255,255,255,0.8)" }}>Luxury stays and budget stays for every traveler</p>
      </div>

      <div className="section">
        <div className="filter-tabs">
          {countries.map(c => (
            <button key={c} className={`filter-tab ${filter === c ? "active" : ""}`} onClick={() => setFilter(c)}>{c}</button>
          ))}
        </div>
        <div className="hotels-grid">
          {filtered.map(h => (
            <div key={h.id} className="hotel-card">
              <div className="hotel-img">
                <img src={h.image} alt={h.name} loading="lazy" />
              </div>
              <div className="hotel-body">
                <div className="hotel-stars">{"⭐".repeat(h.stars)}</div>
                <h3>{h.name}</h3>
                <p className="hotel-location">📍 {h.city}, {h.country}</p>
                <div className="hotel-amenities">
                  {h.amenities.map(a => <span key={a} className="amenity-chip">{a}</span>)}
                </div>
                <div className="hotel-footer">
                  <div className="hotel-price">₹{h.price.toLocaleString()} <span>/night</span></div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button style={{ background: "var(--bg)", color: "var(--green)", border: "1px solid var(--border)", padding: "0.4rem 0.8rem", borderRadius: 8, fontSize: "0.8rem", cursor: "pointer" }} onClick={() => setModal(h)}>View</button>
                    <button className="btn-green" onClick={() => setBookModal(h)}>Book</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" style={{ maxWidth: 500 }} onClick={e => e.stopPropagation()}>
            <img src={modal.image} alt={modal.name} style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 12, marginBottom: "1rem" }} />
            <div className="hotel-stars">{"⭐".repeat(modal.stars)}</div>
            <h2 style={{ color: "var(--green)", margin: "0.5rem 0" }}>{modal.name}</h2>
            <p style={{ color: "var(--text2)", marginBottom: "1rem" }}>📍 {modal.city}, {modal.country}</p>
            <h4 style={{ marginBottom: "0.5rem" }}>Amenities:</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
              {modal.amenities.map(a => <span key={a} style={{ background: "rgba(45,106,79,0.1)", color: "var(--green)", padding: "0.3rem 0.8rem", borderRadius: 20, fontSize: "0.82rem" }}>✓ {a}</span>)}
            </div>
            <div style={{ display: "flex", gap: "0.8rem" }}>
              <button className="btn-green" style={{ flex: 1 }} onClick={() => { setModal(null); setBookModal(modal); }}>Book Now — ₹{modal.price.toLocaleString()}/night</button>
              <button style={{ background: "var(--bg)", border: "1px solid var(--border)", padding: "0.7rem 1rem", borderRadius: 10, cursor: "pointer" }} onClick={() => setModal(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {bookModal && (
        <div className="modal-overlay" onClick={() => setBookModal(null)}>
          <div className="modal" style={{ maxWidth: 420 }} onClick={e => e.stopPropagation()}>
            <div className="modal-icon">🏨</div>
            <h2>Book: {bookModal.name}</h2>
            <p style={{ marginBottom: "1rem" }}>₹{bookModal.price.toLocaleString()} per night</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", textAlign: "left" }}>
              <div className="form-group">
                <label>Guest Name</label>
                <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Check In</label>
                <input type="date" value={checkin} onChange={e => setCheckin(e.target.value)} min={new Date().toISOString().split("T")[0]} />
              </div>
              <div className="form-group">
                <label>Check Out</label>
                <input type="date" value={checkout} onChange={e => setCheckout(e.target.value)} min={checkin || new Date().toISOString().split("T")[0]} />
              </div>
              {checkin && checkout && (
                <div style={{ background: "var(--bg)", padding: "0.8rem", borderRadius: 10, fontSize: "0.9rem" }}>
                  <strong>Total: ₹{(bookModal.price * getDays()).toLocaleString()}</strong> ({getDays()} nights)
                </div>
              )}
            </div>
            <div style={{ display: "flex", gap: "0.8rem", marginTop: "1.2rem" }}>
              <button className="btn-green" style={{ flex: 1 }} onClick={book}>Confirm Booking ✅</button>
              <button style={{ background: "var(--bg)", border: "1px solid var(--border)", padding: "0.7rem 1rem", borderRadius: 10, cursor: "pointer" }} onClick={() => setBookModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {confirmed && (
        <div className="modal-overlay" onClick={() => setConfirmed(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-icon">✅</div>
            <h2>Hotel Booked!</h2>
            <p>Your stay is confirmed. Have a wonderful trip!</p>
            <div className="booking-details">
              <p><strong>Booking ID:</strong> {confirmed.id}</p>
              <p><strong>Guest:</strong> {confirmed.passenger}</p>
              <p><strong>Hotel:</strong> {confirmed.hotel}</p>
              <p><strong>Location:</strong> {confirmed.city}, {confirmed.country}</p>
              <p><strong>Check In:</strong> {confirmed.checkin}</p>
              <p><strong>Check Out:</strong> {confirmed.checkout}</p>
              <p><strong>Duration:</strong> {confirmed.days} night(s)</p>
              <p><strong>Total:</strong> ₹{confirmed.price.toLocaleString()}</p>
            </div>
            <button className="btn-green" onClick={() => setConfirmed(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
