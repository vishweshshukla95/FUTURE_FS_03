import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import Packages from "./pages/Packages";
import Hotels from "./pages/Hotels";
import Adventures from "./pages/Adventures";
import FlightBooking from "./pages/FlightBooking";
import TrainBooking from "./pages/TrainBooking";
import BusBooking from "./pages/BusBooking";
import CarBooking from "./pages/CarBooking";
import CustomerDashboard from "./pages/CustomerDashboard";
import AgentDashboard from "./pages/AgentDashboard";
import "./App.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🌿</span>
          <span>A2V2 <span className="logo-accent">Travel</span></span>
        </Link>
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/destinations" onClick={() => setMenuOpen(false)}>Destinations</Link></li>
          <li><Link to="/packages" onClick={() => setMenuOpen(false)}>Packages</Link></li>
          <li><Link to="/hotels" onClick={() => setMenuOpen(false)}>Hotels</Link></li>
          <li><Link to="/adventures" onClick={() => setMenuOpen(false)}>Adventures</Link></li>
          <li className="dropdown">
            <button onClick={() => setBookingOpen(!bookingOpen)} className="dropdown-btn">
              Book Now ▾
            </button>
            {bookingOpen && (
              <div className="dropdown-menu">
                <Link to="/flights" onClick={() => { setMenuOpen(false); setBookingOpen(false); }}>✈️ Flights</Link>
                <Link to="/trains" onClick={() => { setMenuOpen(false); setBookingOpen(false); }}>🚂 Trains</Link>
                <Link to="/buses" onClick={() => { setMenuOpen(false); setBookingOpen(false); }}>🚌 Buses</Link>
                <Link to="/cars" onClick={() => { setMenuOpen(false); setBookingOpen(false); }}>🚗 Car Rental</Link>
              </div>
            )}
          </li>
          <li><Link to="/dashboard" onClick={() => setMenuOpen(false)} className="nav-dashboard">My Trips</Link></li>
          <li><Link to="/agent" onClick={() => setMenuOpen(false)} className="nav-agent">Agent Portal</Link></li>
        </ul>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "✕" : "☰"}</button>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>🌿 A2V2 Travel</h3>
          <p>Your trusted travel partner for adventures around the world. We make your dream trips a reality.</p>
          <div className="footer-socials">
            <span>📘</span><span>📸</span><span>🐦</span><span>▶️</span>
          </div>
        </div>
        <div className="footer-links">
          <h4>Destinations</h4>
          <ul>
            <li><Link to="/destinations">India</Link></li>
            <li><Link to="/destinations">Europe</Link></li>
            <li><Link to="/destinations">Southeast Asia</Link></li>
            <li><Link to="/destinations">Middle East</Link></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Bookings</h4>
          <ul>
            <li><Link to="/flights">Flights</Link></li>
            <li><Link to="/trains">Trains</Link></li>
            <li><Link to="/buses">Buses</Link></li>
            <li><Link to="/cars">Car Rental</Link></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Contact</h4>
          <ul>
            <li>📞 +91 98765 43210</li>
            <li>📧 info@a2v2travel.com</li>
            <li>📍 Mumbai, India</li>
            <li>🕐 24/7 Support</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 A2V2 Travel. All rights reserved. | Made with 🌿 for travelers</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/adventures" element={<Adventures />} />
            <Route path="/flights" element={<FlightBooking />} />
            <Route path="/trains" element={<TrainBooking />} />
            <Route path="/buses" element={<BusBooking />} />
            <Route path="/cars" element={<CarBooking />} />
            <Route path="/dashboard" element={<CustomerDashboard />} />
            <Route path="/agent" element={<AgentDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
