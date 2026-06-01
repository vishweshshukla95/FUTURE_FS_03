import { useState, useEffect } from "react";

export default function CustomerDashboard() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(saved);
  }, []);

  const types = ["All", ...new Set(bookings.map(b => b.type))];
  const filtered = filter === "All" ? bookings : bookings.filter(b => b.type === filter);

  const cancel = (id) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status: "Cancelled" } : b);
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  };

  const totalSpent = bookings.filter(b => b.status !== "Cancelled").reduce((sum, b) => sum + (b.price || 0), 0);

  const typeIcon = { Flight: "✈️", Train: "🚂", Bus: "🚌", Car: "🚗", Hotel: "🏨", Package: "📦", Adventure: "🏔️" };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>👤 My Travel Dashboard</h1>
        <p>Manage all your bookings in one place</p>
      </div>

      {/* STATS */}
      <div className="dashboard-stats">
        {[
          { icon: "🎫", value: bookings.length, label: "Total Bookings" },
          { icon: "✅", value: bookings.filter(b => b.status === "Confirmed").length, label: "Confirmed" },
          { icon: "❌", value: bookings.filter(b => b.status === "Cancelled").length, label: "Cancelled" },
          { icon: "💰", value: `₹${totalSpent.toLocaleString()}`, label: "Total Spent" },
        ].map((s, i) => (
          <div key={i} className="dash-stat">
            <div className="dash-stat-icon">{s.icon}</div>
            <div className="dash-stat-value">{s.value}</div>
            <div className="dash-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* FILTER */}
      <div className="filter-tabs" style={{ justifyContent: "flex-start", marginBottom: "1rem" }}>
        {types.map(t => (
          <button key={t} className={`filter-tab ${filter === t ? "active" : ""}`} onClick={() => setFilter(t)}>{t}</button>
        ))}
      </div>

      {/* BOOKINGS */}
      <div className="bookings-table">
        <h2>My Bookings</h2>
        {filtered.length === 0 ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "var(--text2)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🌍</div>
            <p>No bookings yet! Start exploring and book your dream trip.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Type</th>
                  <th>Details</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(b => (
                  <tr key={b.id}>
                    <td><strong>{b.id}</strong></td>
                    <td>{typeIcon[b.type] || "📋"} {b.type}</td>
                    <td style={{ maxWidth: 200 }}>
                      {b.type === "Flight" && `${b.from} → ${b.to} (${b.airline})`}
                      {b.type === "Train" && `${b.from} → ${b.to} (${b.train})`}
                      {b.type === "Bus" && `${b.from} → ${b.to} (${b.operator})`}
                      {b.type === "Car" && `${b.car} · ${b.city}, ${b.country}`}
                      {b.type === "Hotel" && `${b.hotel} · ${b.city}`}
                      {b.type === "Package" && `${b.package} · ${b.country}`}
                      {b.type === "Adventure" && `${b.activity} · ${b.location}`}
                    </td>
                    <td>{b.date || b.checkin || b.pickupDate || "—"}</td>
                    <td><strong>₹{(b.price || 0).toLocaleString()}</strong></td>
                    <td>
                      <span className={`status-badge ${b.status === "Confirmed" ? "status-confirmed" : b.status === "Cancelled" ? "status-cancelled" : "status-pending"}`}>
                        {b.status}
                      </span>
                    </td>
                    <td>
                      {b.status === "Confirmed" && (
                        <button onClick={() => cancel(b.id)} style={{ background: "#fee2e2", color: "#ef4444", border: "none", padding: "0.3rem 0.8rem", borderRadius: 6, fontSize: "0.8rem", cursor: "pointer" }}>
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* QUICK LINKS */}
      <div style={{ marginTop: "2rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px,1fr))", gap: "1rem" }}>
        {[
          { icon: "✈️", label: "Book Flight", link: "/flights" },
          { icon: "🚂", label: "Book Train", link: "/trains" },
          { icon: "🚌", label: "Book Bus", link: "/buses" },
          { icon: "🚗", label: "Rent Car", link: "/cars" },
          { icon: "🏨", label: "Book Hotel", link: "/hotels" },
          { icon: "📦", label: "Tour Package", link: "/packages" },
        ].map((item, i) => (
          <a key={i} href={item.link} style={{ background: "white", border: "1px solid var(--border)", borderRadius: 12, padding: "1.2rem", textAlign: "center", textDecoration: "none", color: "var(--text)", transition: "all 0.2s", display: "block" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "var(--green)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
          >
            <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>{item.icon}</div>
            <div style={{ fontSize: "0.85rem", fontWeight: 600 }}>{item.label}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
