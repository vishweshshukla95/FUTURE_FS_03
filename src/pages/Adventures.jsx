import { useState } from "react";
import { adventures } from "../data/travelData";

export default function Adventures() {
  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState(null);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [persons, setPersons] = useState(1);
  const [confirmed, setConfirmed] = useState(null);

  const categories = ["All", ...new Set(adventures.map(a => a.category))];
  const filtered = filter === "All" ? adventures : adventures.filter(a => a.category === filter);

  const book = (adv) => {
    if (!name || !date) { alert("Please enter name and date!"); return; }
    const booking = {
      id: "ADV" + Math.random().toString(36).substr(2, 6).toUpperCase(),
      type: "Adventure", activity: adv.name,
      location: adv.location, duration: adv.duration,
      price: adv.price * persons, persons,
      passenger: name, date, status: "Confirmed"
    };
    const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
    localStorage.setItem("bookings", JSON.stringify([...existing, booking]));
    setConfirmed(booking);
    setModal(null);
  };

  return (
    <div style={{ minHeight: "80vh" }}>
      <div style={{ background: "linear-gradient(135deg, #1a3a1a, #2d6a4f, #48cae4)", padding: "4rem 2rem", textAlign: "center" }}>
        <h1 style={{ color: "white", fontSize: "2.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>🏔️ Adventure Activities</h1>
        <p style={{ color: "rgba(255,255,255,0.8)" }}>Thrilling experiences across the globe</p>
      </div>

      <div className="section">
        <div className="filter-tabs">
          {categories.map(c => (
            <button key={c} className={`filter-tab ${filter === c ? "active" : ""}`} onClick={() => setFilter(c)}>{c}</button>
          ))}
        </div>
        <div className="adventures-grid">
          {filtered.map(a => (
            <div key={a.id} className="adv-card">
              <div className="adv-icon">{a.icon}</div>
              <h3>{a.name}</h3>
              <p className="adv-location">📍 {a.location}</p>
              <div className="adv-meta">
                <span className={`difficulty-${a.difficulty.toLowerCase()}`}>{a.difficulty}</span>
                <span>⏱ {a.duration}</span>
                <span style={{ background: "rgba(45,106,79,0.1)", color: "var(--green)" }}>{a.category}</span>
              </div>
              <div className="adv-footer">
                <span className="adv-price">₹{a.price.toLocaleString()}</span>
                <button className="btn-green" onClick={() => setModal(a)}>Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" style={{ maxWidth: 420 }} onClick={e => e.stopPropagation()}>
            <div className="modal-icon">{modal.icon}</div>
            <h2>{modal.name}</h2>
            <p style={{ color: "var(--text2)", marginBottom: "1rem" }}>📍 {modal.location} · ⏱ {modal.duration}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", textAlign: "left" }}>
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} min={new Date().toISOString().split("T")[0]} />
              </div>
              <div className="form-group">
                <label>Number of Persons</label>
                <select value={persons} onChange={e => setPersons(Number(e.target.value))}>
                  {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n}>{n}</option>)}
                </select>
              </div>
              <div style={{ background: "var(--bg)", padding: "0.8rem", borderRadius: 10, fontSize: "0.9rem" }}>
                <strong>Total: ₹{(modal.price * persons).toLocaleString()}</strong> ({persons} × ₹{modal.price.toLocaleString()})
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.8rem", marginTop: "1.2rem" }}>
              <button className="btn-green" style={{ flex: 1 }} onClick={() => book(modal)}>Confirm Booking ✅</button>
              <button style={{ background: "var(--bg)", border: "1px solid var(--border)", padding: "0.7rem 1rem", borderRadius: 10, cursor: "pointer" }} onClick={() => setModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {confirmed && (
        <div className="modal-overlay" onClick={() => setConfirmed(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-icon">🎉</div>
            <h2>Adventure Booked!</h2>
            <p>Get ready for an unforgettable experience!</p>
            <div className="booking-details">
              <p><strong>Booking ID:</strong> {confirmed.id}</p>
              <p><strong>Activity:</strong> {confirmed.activity}</p>
              <p><strong>Location:</strong> {confirmed.location}</p>
              <p><strong>Date:</strong> {confirmed.date}</p>
              <p><strong>Persons:</strong> {confirmed.persons}</p>
              <p><strong>Total:</strong> ₹{confirmed.price.toLocaleString()}</p>
            </div>
            <button className="btn-green" onClick={() => setConfirmed(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
