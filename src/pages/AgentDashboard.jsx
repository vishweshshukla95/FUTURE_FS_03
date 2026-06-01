import { useState, useEffect } from "react";

export default function AgentDashboard() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("All");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const AGENT_PASSWORD = "agent123";

  useEffect(() => {
    if (loggedIn) {
      const saved = JSON.parse(localStorage.getItem("bookings") || "[]");
      setBookings(saved);
    }
  }, [loggedIn]);

  const login = () => {
    if (password === AGENT_PASSWORD) { setLoggedIn(true); setError(""); }
    else setError("❌ Invalid password! (Hint: agent123)");
  };

  if (!loggedIn) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <div style={{ background: "white", borderRadius: 20, padding: "2.5rem", maxWidth: 400, width: "100%", boxShadow: "var(--shadow-lg)", textAlign: "center" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🏢</div>
          <h2 style={{ fontWeight: 800, marginBottom: "0.5rem", color: "var(--green)" }}>Agent Portal</h2>
          <p style={{ color: "var(--text2)", marginBottom: "1.5rem", fontSize: "0.9rem" }}>Login to access the agent dashboard and manage all bookings</p>
          <div className="form-group" style={{ textAlign: "left", marginBottom: "1rem" }}>
            <label>Agent Password</label>
            <input type="password" placeholder="Enter password" value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && login()}
            />
          </div>
          {error && <p style={{ color: "#ef4444", fontSize: "0.85rem", marginBottom: "0.8rem" }}>{error}</p>}
          <button className="btn-green" style={{ width: "100%" }} onClick={login}>Login to Agent Portal 🔐</button>
          <p style={{ color: "var(--text2)", fontSize: "0.8rem", marginTop: "1rem" }}>Demo password: <strong>agent123</strong></p>
        </div>
      </div>
    );
  }

  const types = ["All", ...new Set(bookings.map(b => b.type))];
  const filtered = filter === "All" ? bookings : bookings.filter(b => b.type === filter);
  const totalRevenue = bookings.filter(b => b.status !== "Cancelled").reduce((sum, b) => sum + (b.price || 0), 0);
  const typeIcon = { Flight: "✈️", Train: "🚂", Bus: "🚌", Car: "🚗", Hotel: "🏨", Package: "📦", Adventure: "🏔️" };

  const typeCounts = {};
  bookings.forEach(b => { typeCounts[b.type] = (typeCounts[b.type] || 0) + 1; });

  return (
    <div className="dashboard-page">
      <div className="dashboard-header" style={{ background: "linear-gradient(135deg, #0d2818, var(--green))" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1>🏢 Agent Dashboard</h1>
            <p>Complete overview of all bookings and revenue</p>
          </div>
          <button onClick={() => setLoggedIn(false)} style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.3)", padding: "0.5rem 1rem", borderRadius: 8, cursor: "pointer", fontSize: "0.85rem" }}>
            Logout
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="dashboard-stats">
        {[
          { icon: "🎫", value: bookings.length, label: "Total Bookings" },
          { icon: "✅", value: bookings.filter(b => b.status === "Confirmed").length, label: "Confirmed" },
          { icon: "❌", value: bookings.filter(b => b.status === "Cancelled").length, label: "Cancelled" },
          { icon: "💰", value: `₹${totalRevenue.toLocaleString()}`, label: "Total Revenue" },
        ].map((s, i) => (
          <div key={i} className="dash-stat">
            <div className="dash-stat-icon">{s.icon}</div>
            <div className="dash-stat-value">{s.value}</div>
            <div className="dash-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* BOOKINGS BY TYPE */}
      {Object.keys(typeCounts).length > 0 && (
        <div style={{ background: "white", borderRadius: 14, padding: "1.5rem", boxShadow: "var(--shadow)", marginBottom: "1.5rem" }}>
          <h2 style={{ fontWeight: 700, marginBottom: "1rem", fontSize: "1.1rem" }}>📊 Bookings by Type</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem" }}>
            {Object.entries(typeCounts).map(([type, count]) => (
              <div key={type} style={{ background: "var(--bg)", borderRadius: 10, padding: "1rem", textAlign: "center", border: "1px solid var(--border)" }}>
                <div style={{ fontSize: "1.8rem" }}>{typeIcon[type] || "📋"}</div>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--green)" }}>{count}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text2)" }}>{type}s</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REVENUE BREAKDOWN */}
      <div style={{ background: "white", borderRadius: 14, padding: "1.5rem", boxShadow: "var(--shadow)", marginBottom: "1.5rem" }}>
        <h2 style={{ fontWeight: 700, marginBottom: "1rem", fontSize: "1.1rem" }}>💰 Revenue Breakdown</h2>
        {Object.entries(typeCounts).length === 0 ? (
          <p style={{ color: "var(--text2)" }}>No bookings yet.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {Object.keys(typeCounts).map(type => {
              const typeRevenue = bookings.filter(b => b.type === type && b.status !== "Cancelled").reduce((sum, b) => sum + (b.price || 0), 0);
              const pct = totalRevenue > 0 ? Math.round((typeRevenue / totalRevenue) * 100) : 0;
              return (
                <div key={type}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", marginBottom: "0.3rem" }}>
                    <span>{typeIcon[type]} {type}</span>
                    <span>₹{typeRevenue.toLocaleString()} ({pct}%)</span>
                  </div>
                  <div style={{ background: "var(--border)", borderRadius: 50, height: 8, overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: "linear-gradient(90deg, var(--green), var(--green-light))", borderRadius: 50 }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ALL BOOKINGS TABLE */}
      <div className="bookings-table">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.2rem 1.5rem", borderBottom: "1px solid var(--border)", flexWrap: "wrap", gap: "0.5rem" }}>
          <h2 style={{ margin: 0 }}>All Bookings</h2>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {types.map(t => (
              <button key={t} className={`filter-tab ${filter === t ? "active" : ""}`} onClick={() => setFilter(t)} style={{ fontSize: "0.78rem", padding: "0.3rem 0.8rem" }}>{t}</button>
            ))}
          </div>
        </div>
        {filtered.length === 0 ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "var(--text2)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📋</div>
            <p>No bookings found. Share the platform to get started!</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Type</th>
                  <th>Customer</th>
                  <th>Details</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(b => (
                  <tr key={b.id}>
                    <td><strong style={{ color: "var(--green)" }}>{b.id}</strong></td>
                    <td>{typeIcon[b.type] || "📋"} {b.type}</td>
                    <td>{b.passenger || "—"}</td>
                    <td style={{ maxWidth: 200, fontSize: "0.85rem" }}>
                      {b.type === "Flight" && `${b.from} → ${b.to}`}
                      {b.type === "Train" && `${b.from} → ${b.to}`}
                      {b.type === "Bus" && `${b.from} → ${b.to}`}
                      {b.type === "Car" && `${b.car} · ${b.city}`}
                      {b.type === "Hotel" && `${b.hotel} · ${b.city}`}
                      {b.type === "Package" && `${b.package}`}
                      {b.type === "Adventure" && `${b.activity}`}
                    </td>
                    <td style={{ fontSize: "0.85rem" }}>{b.date || b.checkin || b.pickupDate || "—"}</td>
                    <td><strong>₹{(b.price || 0).toLocaleString()}</strong></td>
                    <td>
                      <span className={`status-badge ${b.status === "Confirmed" ? "status-confirmed" : b.status === "Cancelled" ? "status-cancelled" : "status-pending"}`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
