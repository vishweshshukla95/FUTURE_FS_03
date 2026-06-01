import { useState } from "react";
import { trains } from "../data/travelData";

export default function TrainBooking() {
  const [region, setRegion] = useState("India");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [modal, setModal] = useState(null);
  const [passengerName, setPassengerName] = useState("");
  const [classType, setClassType] = useState("Sleeper");

  const allCities = [...new Set(trains[region]?.routes.flatMap(r => [r.from, r.to]) || [])];

  const search = () => {
    const routes = trains[region]?.routes || [];
    const found = routes.filter(r => (!from || r.from === from) && (!to || r.to === to));
    setResults(found);
    setSearched(true);
  };

  const book = (route) => {
    if (!passengerName) { alert("Please enter passenger name!"); return; }
    const booking = {
      id: "TRN" + Math.random().toString(36).substr(2, 6).toUpperCase(),
      type: "Train", from: route.from, to: route.to,
      train: route.train, duration: route.duration,
      price: route.price, date, passenger: passengerName,
      class: classType, status: "Confirmed"
    };
    const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
    localStorage.setItem("bookings", JSON.stringify([...existing, booking]));
    setModal(booking);
  };

  return (
    <div className="booking-page">
      <div className="booking-hero" style={{ background: "linear-gradient(135deg, #1a3a4f, #0096c7)" }}>
        <h1>🚂 Train Booking</h1>
        <p>Travel comfortably by rail across India and Europe</p>
      </div>

      <div className="booking-form">
        <h2>Search Trains</h2>
        <div className="form-row">
          <div className="form-group">
            <label>Region</label>
            <select value={region} onChange={e => { setRegion(e.target.value); setFrom(""); setTo(""); setResults([]); setSearched(false); }}>
              {Object.keys(trains).map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Class</label>
            <select value={classType} onChange={e => setClassType(e.target.value)}>
              <option>Sleeper</option>
              <option>3AC</option>
              <option>2AC</option>
              <option>1AC</option>
              <option>General</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>From Station</label>
            <select value={from} onChange={e => setFrom(e.target.value)}>
              <option value="">All Stations</option>
              {allCities.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>To Station</label>
            <select value={to} onChange={e => setTo(e.target.value)}>
              <option value="">All Stations</option>
              {allCities.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Travel Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} min={new Date().toISOString().split("T")[0]} />
          </div>
          <div className="form-group">
            <label>Passenger Name</label>
            <input type="text" placeholder="Enter full name" value={passengerName} onChange={e => setPassengerName(e.target.value)} />
          </div>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <button className="btn-green" onClick={search}>🔍 Search Trains</button>
        </div>
      </div>

      {searched && (
        <div className="results-section">
          <h2>🚂 Available Trains ({results.length} found)</h2>
          {results.length === 0 ? (
            <p style={{ color: "var(--text2)", padding: "1rem" }}>No trains found. Try different stations.</p>
          ) : results.map((r, i) => (
            <div key={i} className="result-card">
              <div className="result-info">
                <h3>{r.from} → {r.to}</h3>
                <p>🚂 {r.train} &nbsp;|&nbsp; ⏱ {r.duration} &nbsp;|&nbsp; 🎫 {classType} Class</p>
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
            <h2>Train Booked!</h2>
            <p>Your train ticket has been confirmed.</p>
            <div className="booking-details">
              <p><strong>PNR Number:</strong> {modal.id}</p>
              <p><strong>Passenger:</strong> {modal.passenger}</p>
              <p><strong>Route:</strong> {modal.from} → {modal.to}</p>
              <p><strong>Train:</strong> {modal.train}</p>
              <p><strong>Class:</strong> {modal.class}</p>
              <p><strong>Duration:</strong> {modal.duration}</p>
              <p><strong>Date:</strong> {modal.date || "Flexible"}</p>
              <p><strong>Fare:</strong> ₹{modal.price.toLocaleString()}</p>
            </div>
            <button className="btn-green" onClick={() => setModal(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
