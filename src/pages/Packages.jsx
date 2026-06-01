import { useState } from "react";
import { packages } from "../data/travelData";

export default function Packages() {
  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState(null);
  const [bookModal, setBookModal] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [confirmed, setConfirmed] = useState(null);

  const categories = ["All", ...new Set(packages.map(p => p.category))];
  const filtered = filter === "All" ? packages : packages.filter(p => p.category === filter);

  const book = () => {
    if (!name || !email || !date) { alert("Please fill all fields!"); return; }
    const booking = {
      id: "PKG" + Math.random().toString(36).substr(2, 6).toUpperCase(),
      type: "Package", package: bookModal.name,
      country: bookModal.country, duration: bookModal.duration,
      price: bookModal.price * travelers, travelers,
      passenger: name, email, date, status: "Confirmed"
    };
    const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
    localStorage.setItem("bookings", JSON.stringify([...existing, booking]));
    setConfirmed(booking);
    setBookModal(null);
  };

  return (
    <div style={{ minHeight: "80vh" }}>
      <div style={{ background: "linear-gradient(135deg, #1b4332, #40916c)", padding: "4rem 2rem", textAlign: "center" }}>
        <h1 style={{ color: "white", fontSize: "2.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>📦 Tour Packages</h1>
        <p style={{ color: "rgba(255,255,255,0.8)" }}>Handcrafted journeys for every kind of traveler</p>
      </div>

      <div className="section">
        <div className="filter-tabs">
          {categories.map(c => (
            <button key={c} className={`filter-tab ${filter === c ? "active" : ""}`} onClick={() => setFilter(c)}>{c}</button>
          ))}
        </div>
        <div className="packages-grid">
          {filtered.map(p => (
            <div key={p.id} className="pkg-card">
              <div className="pkg-img">
                <img src={p.image} alt={p.name} loading="lazy" />
                <div className="pkg-badge">{p.category}</div>
              </div>
              <div className="pkg-body">
                <h3>{p.name}</h3>
                <div className="pkg-meta">
                  <span>📍 {p.country}</span>
                  <span>⏱ {p.duration}</span>
                </div>
                <div className="pkg-rating">
                  <span style={{ color: "#f59e0b" }}>{"⭐".repeat(Math.floor(p.rating))}</span>
                  <span style={{ color: "var(--text2)", fontSize: "0.8rem" }}>{p.rating} ({p.reviews})</span>
                </div>
                <div className="pkg-highlights">
                  {p.highlights.slice(0, 3).map(h => <span key={h} className="highlight-chip">✓ {h}</span>)}
                </div>
                <div style={{ marginBottom: "0.8rem" }}>
                  <p style={{ fontSize: "0.8rem", color: "var(--text2)", marginBottom: "0.3rem" }}>Includes:</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                    {p.includes.map(i => <span key={i} style={{ background: "rgba(72,202,228,0.1)", color: "var(--sky-dark)", padding: "0.2rem 0.6rem", borderRadius: 20, fontSize: "0.72rem" }}>✓ {i}</span>)}
                  </div>
                </div>
                <div className="pkg-footer">
                  <div className="pkg-price">₹{p.price.toLocaleString()} <span>/ person</span></div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button style={{ background: "var(--bg)", color: "var(--green)", border: "1px solid var(--border)", padding: "0.4rem 0.8rem", borderRadius: 8, fontSize: "0.8rem", cursor: "pointer" }} onClick={() => setModal(p)}>Details</button>
                    <button className="btn-green" onClick={() => setBookModal(p)}>Book</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DETAIL MODAL */}
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" style={{ maxWidth: 550 }} onClick={e => e.stopPropagation()}>
            <img src={modal.image} alt={modal.name} style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 12, marginBottom: "1rem" }} />
            <h2 style={{ color: "var(--green)", marginBottom: "0.5rem" }}>{modal.name}</h2>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text2)" }}>📍 {modal.country}</span>
              <span style={{ fontSize: "0.85rem", color: "var(--text2)" }}>⏱ {modal.duration}</span>
              <span style={{ fontSize: "0.85rem", color: "#f59e0b" }}>⭐ {modal.rating}</span>
            </div>
            <h4 style={{ marginBottom: "0.5rem" }}>Highlights:</h4>
            <ul style={{ paddingLeft: "1.2rem", marginBottom: "1rem" }}>
              {modal.highlights.map(h => <li key={h} style={{ fontSize: "0.88rem", color: "var(--text2)", marginBottom: "0.2rem" }}>{h}</li>)}
            </ul>
            <h4 style={{ marginBottom: "0.5rem" }}>Includes:</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
              {modal.includes.map(i => <span key={i} style={{ background: "rgba(45,106,79,0.1)", color: "var(--green)", padding: "0.3rem 0.8rem", borderRadius: 20, fontSize: "0.82rem" }}>✓ {i}</span>)}
            </div>
            <div style={{ display: "flex", gap: "0.8rem" }}>
              <button className="btn-green" style={{ flex: 1 }} onClick={() => { setModal(null); setBookModal(modal); }}>Book Now — ₹{modal.price.toLocaleString()}</button>
              <button style={{ background: "var(--bg)", border: "1px solid var(--border)", padding: "0.7rem 1rem", borderRadius: 10, cursor: "pointer" }} onClick={() => setModal(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* BOOKING MODAL */}
      {bookModal && (
        <div className="modal-overlay" onClick={() => setBookModal(null)}>
          <div className="modal" style={{ maxWidth: 450 }} onClick={e => e.stopPropagation()}>
            <div className="modal-icon">📦</div>
            <h2>Book: {bookModal.name}</h2>
            <p style={{ marginBottom: "1rem" }}>₹{bookModal.price.toLocaleString()} per person · {bookModal.duration}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", textAlign: "left" }}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Travel Date</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} min={new Date().toISOString().split("T")[0]} />
              </div>
              <div className="form-group">
                <label>Number of Travelers</label>
                <select value={travelers} onChange={e => setTravelers(Number(e.target.value))}>
                  {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n}>{n}</option>)}
                </select>
              </div>
              <div style={{ background: "var(--bg)", padding: "0.8rem", borderRadius: 10, fontSize: "0.9rem" }}>
                <strong>Total: ₹{(bookModal.price * travelers).toLocaleString()}</strong> ({travelers} × ₹{bookModal.price.toLocaleString()})
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.8rem", marginTop: "1.2rem" }}>
              <button className="btn-green" style={{ flex: 1 }} onClick={book}>Confirm Booking ✅</button>
              <button style={{ background: "var(--bg)", border: "1px solid var(--border)", padding: "0.7rem 1rem", borderRadius: 10, cursor: "pointer" }} onClick={() => setBookModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRMED MODAL */}
      {confirmed && (
        <div className="modal-overlay" onClick={() => setConfirmed(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-icon">🎉</div>
            <h2>Package Booked!</h2>
            <p>Your tour package is confirmed. Get ready for an amazing journey!</p>
            <div className="booking-details">
              <p><strong>Booking ID:</strong> {confirmed.id}</p>
              <p><strong>Package:</strong> {confirmed.package}</p>
              <p><strong>Destination:</strong> {confirmed.country}</p>
              <p><strong>Duration:</strong> {confirmed.duration}</p>
              <p><strong>Travelers:</strong> {confirmed.travelers}</p>
              <p><strong>Travel Date:</strong> {confirmed.date}</p>
              <p><strong>Total:</strong> ₹{confirmed.price.toLocaleString()}</p>
            </div>
            <button className="btn-green" onClick={() => setConfirmed(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
