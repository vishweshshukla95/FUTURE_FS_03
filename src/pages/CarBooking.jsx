import { useState } from "react";
import { cars, countries } from "../data/travelData";

export default function CarBooking() {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [carType, setCarType] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [name, setName] = useState("");
  const [modal, setModal] = useState(null);

  const selectedCountry = countries.find(c => c.name === country);
  const filteredCars = carType ? cars.filter(c => c.type === carType) : cars;

  const getDays = () => {
    if (!pickupDate || !returnDate) return 1;
    const diff = new Date(returnDate) - new Date(pickupDate);
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const book = (car) => {
    if (!name || !country || !city || !pickupDate || !returnDate) {
      alert("Please fill all fields!"); return;
    }
    const days = getDays();
    const booking = {
      id: "CAR" + Math.random().toString(36).substr(2, 6).toUpperCase(),
      type: "Car", car: car.name, carType: car.type,
      country, city, pickupDate, returnDate,
      days, price: car.price * days,
      passenger: name, status: "Confirmed"
    };
    const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
    localStorage.setItem("bookings", JSON.stringify([...existing, booking]));
    setModal(booking);
  };

  return (
    <div className="booking-page">
      <div className="booking-hero" style={{ background: "linear-gradient(135deg, #1a2a1a, #2d6a4f)" }}>
        <h1>🚗 Car Rental</h1>
        <p>Explore destinations at your own pace with our premium cars</p>
      </div>

      <div className="booking-form">
        <h2>Select Your Car</h2>
        <div className="form-row">
          <div className="form-group">
            <label>Country</label>
            <select value={country} onChange={e => { setCountry(e.target.value); setCity(""); }}>
              <option value="">Select Country</option>
              {countries.map(c => <option key={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>City / Pickup Location</label>
            <select value={city} onChange={e => setCity(e.target.value)} disabled={!country}>
              <option value="">Select City</option>
              {selectedCountry?.cities.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Pickup Date</label>
            <input type="date" value={pickupDate} onChange={e => setPickupDate(e.target.value)} min={new Date().toISOString().split("T")[0]} />
          </div>
          <div className="form-group">
            <label>Return Date</label>
            <input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} min={pickupDate || new Date().toISOString().split("T")[0]} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Driver Name</label>
            <input type="text" placeholder="Enter full name" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Car Type</label>
            <select value={carType} onChange={e => setCarType(e.target.value)}>
              <option value="">All Types</option>
              {[...new Set(cars.map(c => c.type))].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="results-section">
        <h2>🚗 Available Cars</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))", gap: "1rem", marginTop: "1rem" }}>
          {filteredCars.map(car => (
            <div key={car.id} style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.4rem", transition: "all 0.2s" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.8rem" }}>{car.icon}</div>
              <h3 style={{ fontWeight: 700, marginBottom: "0.3rem" }}>{car.name}</h3>
              <p style={{ color: "var(--text2)", fontSize: "0.85rem", marginBottom: "0.5rem" }}>{car.type} · {car.seats} Seats · {car.ac ? "AC" : "Non-AC"}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1rem" }}>
                <div>
                  <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--green)" }}>₹{car.price.toLocaleString()}<span style={{ fontSize: "0.75rem", fontWeight: 400, color: "var(--text2)" }}>/day</span></div>
                  {pickupDate && returnDate && <div style={{ fontSize: "0.8rem", color: "var(--text2)" }}>Total: ₹{(car.price * getDays()).toLocaleString()} ({getDays()} days)</div>}
                </div>
                <button className="btn-green" onClick={() => book(car)}>Book Car</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-icon">✅</div>
            <h2>Car Booked!</h2>
            <p>Your car rental is confirmed.</p>
            <div className="booking-details">
              <p><strong>Booking ID:</strong> {modal.id}</p>
              <p><strong>Driver:</strong> {modal.passenger}</p>
              <p><strong>Car:</strong> {modal.car} ({modal.carType})</p>
              <p><strong>Location:</strong> {modal.city}, {modal.country}</p>
              <p><strong>Pickup:</strong> {modal.pickupDate}</p>
              <p><strong>Return:</strong> {modal.returnDate}</p>
              <p><strong>Duration:</strong> {modal.days} day(s)</p>
              <p><strong>Total:</strong> ₹{modal.price.toLocaleString()}</p>
            </div>
            <button className="btn-green" onClick={() => setModal(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
