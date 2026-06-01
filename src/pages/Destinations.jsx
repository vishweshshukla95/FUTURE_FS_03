import { useState } from "react";
import { countries } from "../data/travelData";

export default function Destinations() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = countries.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: "80vh" }}>
      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg, #1b4332, #40916c)", padding: "4rem 2rem", textAlign: "center" }}>
        <h1 style={{ color: "white", fontSize: "2.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>🌍 Explore Destinations</h1>
        <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "1.5rem" }}>Discover breathtaking places around the world</p>
        <input
          type="text" placeholder="🔍 Search country or city..."
          value={search} onChange={e => setSearch(e.target.value)}
          style={{ padding: "0.8rem 1.5rem", borderRadius: 50, border: "none", fontSize: "1rem", width: "100%", maxWidth: 400, outline: "none", fontFamily: "inherit" }}
        />
      </div>

      <div className="section">
        <div className="destinations-grid">
          {filtered.map(c => (
            <div key={c.id} className="dest-card" onClick={() => setSelected(c)}>
              <div className="dest-card-img">
                <img src={c.image} alt={c.name} loading="lazy" />
                <div className="dest-card-flag">{c.flag}</div>
              </div>
              <div className="dest-card-body">
                <h3>{c.name}</h3>
                <p>{c.description}</p>
                <div className="dest-cities">
                  {c.cities.map(city => <span key={city} className="city-chip">{city}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DETAIL MODAL */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" style={{ maxWidth: 600 }} onClick={e => e.stopPropagation()}>
            <img src={selected.image} alt={selected.name} style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 12, marginBottom: "1rem" }} />
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{selected.flag}</div>
            <h2 style={{ color: "var(--green)", marginBottom: "0.5rem" }}>{selected.name}</h2>
            <p style={{ color: "var(--text2)", marginBottom: "1rem" }}>{selected.description}</p>
            <h4 style={{ marginBottom: "0.5rem", color: "var(--text)" }}>📍 Top Cities & Destinations:</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
              {selected.cities.map(city => (
                <span key={city} style={{ background: "rgba(45,106,79,0.1)", color: "var(--green)", padding: "0.3rem 0.8rem", borderRadius: 20, fontSize: "0.85rem", fontWeight: 500 }}>{city}</span>
              ))}
            </div>
            <button className="btn-green" onClick={() => setSelected(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
