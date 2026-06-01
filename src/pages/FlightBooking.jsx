import { useState } from "react";
import { flights } from "../data/travelData";

export default function FlightBooking() {
  const [region, setRegion] = useState("India");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [modal, setModal] = useState(null);
  const [passengerName, setPassengerName] = useState("");

  const allCities = [...new Set(flights[region]?.routes.flatMap(r => [r.from, r.to]) || [])];

  const search = () => {
    const routes = flights[region]?.routes || [];
    const found = routes.filter(r =>
      (!from || r.from === from) && (!to || r.to === to)
    );
    setResults(found);
    setSearched(true);
  };

  const book = (route) => {
    if (!passengerName) { alert("Please enter passenger name!"); return; }
    const booking = {
      id: "FLT" + Math.random().toString(36).substr(2, 6).toUpperCase(),
      type: "Flight", from: route.from, to: route.to,
      airline: route.airline, duration: route.duration,
      price: route.price, date, passenger: passengerName,
      status: "Confirmed"
    };
    const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
    localStorage.setItem("bookings", JSON.stringify([...existing, booking]));
    setModal(booking);
  };

  return (
    <div className="booking-page">
      <div className="booking-hero">
        <h1>✈️ Flight Booking</h1>
        <p>Find the best flights at the best prices worldwide</p>
      </div>

      <div className="booking-form">
        <h2>Search Flights</h2>
        <div className="form-row">
          <div className="form-group">
            <label>Region / Country</label>
            <select value={region} onChange={e => { setRegion(e.target.value); setFrom(""); setTo(""); setResults([]); setSearched(false); }}>
              {Object.keys(flights).map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Travel Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} min={new Date().toISOString().split("T")[0]} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>From City</label>
            <select value={from} onChange={e => setFrom(e.target.value)}>
              <option value="">All Cities</option>
              {allCities.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>To City</label>
            <select value={to} onChange={e => setTo(e.target.value)}>
              <option value="">All Cities</option>
              {allCities.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>Passenger Name</label>
          <input type="text" placeholder="Enter full name" value={passengerName} onChange={e => setPassengerName(e.target.value)} />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <button className="btn-green" onClick={search}>🔍 Search Flights</button>
        </div>
      </div>

      {searched && (
        <div className="results-section">
          <h2>✈️ Available Flights ({results.length} found)</h2>
          {results.length === 0 ? (
            <p style={{ color: "var(--text2)", padding: "1rem" }}>No flights found. Try different cities.</p>
          ) : results.map((r, i) => (
            <div key={i} className="result-card">
              <div className="result-info">
                <h3>{r.from} → {r.to}</h3>
                <p>✈️ {r.airline} &nbsp;|&nbsp; ⏱ {r.duration} &nbsp;|&nbsp; 📅 {date || "Flexible"}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div className="result-price">₹{r.price.toLocaleString()}</div>
                <button className="btn-green" onClick={() => book(r)}>Book Now</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-icon">✅</div>
            <h2>Flight Booked!</h2>
            <p>Your flight has been confirmed successfully.</p>
            <div className="booking-details">
              <p><strong>Booking ID:</strong> {modal.id}</p>
              <p><strong>Passenger:</strong> {modal.passenger}</p>
              <p><strong>Route:</strong> {modal.from} → {modal.to}</p>
              <p><strong>Airline:</strong> {modal.airline}</p>
              <p><strong>Duration:</strong> {modal.duration}</p>
              <p><strong>Date:</strong> {modal.date || "Flexible"}</p>
              <p><strong>Amount Paid:</strong> ₹{modal.price.toLocaleString()}</p>
            </div>
            <button className="btn-green" onClick={() => setModal(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
