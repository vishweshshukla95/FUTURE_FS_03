import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { countries, packages, adventures, testimonials } from "../data/travelData";

export default function Home() {
  const navigate = useNavigate();
  const [searchTab, setSearchTab] = useState("packages");

  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-badge">🌿 Explore the World with Nature</div>
          <h1>Discover the World's<br /><span>Hidden Wonders</span></h1>
          <p>From misty Himalayan peaks to azure island shores — A2V2 Travel crafts journeys that connect you with nature's finest moments.</p>
          <div className="hero-stats">
            <div className="hero-stat"><strong>150+</strong><span>Destinations</span></div>
            <div className="hero-stat"><strong>50K+</strong><span>Happy Travelers</span></div>
            <div className="hero-stat"><strong>500+</strong><span>Tour Packages</span></div>
            <div className="hero-stat"><strong>24/7</strong><span>Support</span></div>
          </div>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate("/packages")}>🌍 Explore Packages</button>
            <button className="btn-outline" onClick={() => navigate("/destinations")}>View Destinations</button>
          </div>
        </div>
      </section>

      {/* SEARCH BOX */}
      <div style={{ background: "linear-gradient(to bottom, #1b4332, var(--bg))", padding: "0 2rem 3rem" }}>
        <div className="search-box" style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className="search-tabs">
            {[
              { id: "packages", label: "📦 Packages" },
              { id: "flights", label: "✈️ Flights" },
              { id: "hotels", label: "🏨 Hotels" },
              { id: "trains", label: "🚂 Trains" },
              { id: "buses", label: "🚌 Buses" },
              { id: "cars", label: "🚗 Cars" },
            ].map(t => (
              <button key={t.id} className={`search-tab ${searchTab === t.id ? "active" : ""}`} onClick={() => setSearchTab(t.id)}>{t.label}</button>
            ))}
          </div>
          <div className="search-fields">
            <div className="search-field">
              <label>Where To</label>
              <input type="text" placeholder="Enter destination..." />
            </div>
            <div className="search-field">
              <label>Check In</label>
              <input type="date" />
            </div>
            <div className="search-field">
              <label>Travelers</label>
              <select>
                <option>1 Adult</option>
                <option>2 Adults</option>
                <option>2 Adults + 1 Child</option>
                <option>Group (5+)</option>
              </select>
            </div>
            <button className="btn-search" onClick={() => navigate(`/${searchTab}`)}>🔍 Search</button>
          </div>
        </div>
      </div>

      {/* TOP DESTINATIONS */}
      <div className="section">
        <div className="section-header">
          <h2>Top <span>Destinations</span> Worldwide 🌍</h2>
          <p>Handpicked destinations for every kind of traveler</p>
        </div>
        <div className="destinations-grid">
          {countries.slice(0, 8).map(c => (
            <div key={c.id} className="dest-card" onClick={() => navigate("/destinations")}>
              <div className="dest-card-img">
                <img src={c.image} alt={c.name} loading="lazy" />
                <div className="dest-card-flag">{c.flag}</div>
              </div>
              <div className="dest-card-body">
                <h3>{c.name}</h3>
                <p>{c.description}</p>
                <div className="dest-cities">
                  {c.cities.slice(0, 3).map(city => <span key={city} className="city-chip">{city}</span>)}
                  {c.cities.length > 3 && <span className="city-chip">+{c.cities.length - 3} more</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button className="btn-green" onClick={() => navigate("/destinations")}>View All Destinations 🌍</button>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="section-full">
        <div className="inner">
          <div className="section-header">
            <h2>Why Choose <span>A2V2 Travel</span> 🌿</h2>
            <p>We bring nature, adventure and comfort together</p>
          </div>
          <div className="features">
            {[
              { icon: "🌿", title: "Eco-Friendly Travel", desc: "We promote sustainable tourism and eco-friendly accommodations across all our packages." },
              { icon: "🏆", title: "Best Price Guarantee", desc: "Get the best prices on flights, hotels, and packages. We match any lower price you find." },
              { icon: "🎯", title: "Expert Local Guides", desc: "Our certified guides have deep local knowledge and create authentic cultural experiences." },
              { icon: "🛡️", title: "Safe & Secure", desc: "Travel insurance, 24/7 emergency support, and fully vetted accommodations for peace of mind." },
              { icon: "⚡", title: "Instant Booking", desc: "Book flights, hotels, trains and buses instantly with immediate confirmation." },
              { icon: "💚", title: "Give Back to Nature", desc: "1% of every booking goes to forest conservation and wildlife protection programs." },
            ].map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* POPULAR PACKAGES */}
      <div className="section">
        <div className="section-header">
          <h2>Popular <span>Tour Packages</span> 📦</h2>
          <p>Curated experiences for every budget and style</p>
        </div>
        <div className="packages-grid">
          {packages.slice(0, 6).map(p => (
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
                  <span style={{ color: "var(--text2)", fontSize: "0.8rem" }}>{p.rating} ({p.reviews} reviews)</span>
                </div>
                <div className="pkg-highlights">
                  {p.highlights.slice(0, 3).map(h => <span key={h} className="highlight-chip">✓ {h}</span>)}
                </div>
                <div className="pkg-footer">
                  <div className="pkg-price">₹{p.price.toLocaleString()} <span>/ person</span></div>
                  <button className="btn-green" onClick={() => navigate("/packages")}>Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button className="btn-green" onClick={() => navigate("/packages")}>View All Packages 📦</button>
        </div>
      </div>

      {/* ADVENTURE SECTION */}
      <div className="section-full" style={{ background: "var(--bg)" }}>
        <div className="inner">
          <div className="section-header">
            <h2>Thrilling <span>Adventures</span> Await 🏔️</h2>
            <p>From serene nature walks to extreme adrenaline rushes</p>
          </div>
          <div className="adventures-grid">
            {adventures.slice(0, 8).map(a => (
              <div key={a.id} className="adv-card">
                <div className="adv-icon">{a.icon}</div>
                <h3>{a.name}</h3>
                <p className="adv-location">📍 {a.location}</p>
                <div className="adv-meta">
                  <span className={`difficulty-${a.difficulty.toLowerCase()}`}>{a.difficulty}</span>
                  <span>⏱ {a.duration}</span>
                </div>
                <div className="adv-footer">
                  <span className="adv-price">₹{a.price.toLocaleString()}</span>
                  <button className="btn-green" onClick={() => navigate("/adventures")}>Book</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="testimonials">
        <div className="testimonials-inner">
          <h2>What Our Travelers Say 💬</h2>
          <p className="sub">Real experiences from real adventurers</p>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-avatar">{t.avatar}</div>
                <div className="testimonial-stars">{"⭐".repeat(t.rating)}</div>
                <p>"{t.comment}"</p>
                <div className="testimonial-name">{t.name}</div>
                <div className="testimonial-trip">📍 {t.location} · {t.trip}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "linear-gradient(135deg, var(--green), var(--sky-dark))", padding: "5rem 2rem", textAlign: "center" }}>
        <h2 style={{ color: "white", fontSize: "2.2rem", fontWeight: 800, marginBottom: "1rem" }}>Ready to Start Your Adventure? 🌿</h2>
        <p style={{ color: "rgba(255,255,255,0.85)", marginBottom: "2rem", fontSize: "1.1rem" }}>Let us craft your perfect journey. Contact us today!</p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-outline" onClick={() => navigate("/packages")}>Browse Packages</button>
          <button style={{ background: "white", color: "var(--green)", border: "none", padding: "0.8rem 2rem", borderRadius: "50px", fontWeight: 700, fontSize: "1rem", cursor: "pointer" }}>📞 Call Us Now</button>
        </div>
      </div>
    </div>
  );
}
