import React from "react";
import { Link } from "react-router-dom";

export default function AttractionCard({ attraction }) {
  return (
    <div className="card attraction">
      <img src={attraction.mediaUrl || "https://via.placeholder.com/400x240?text=Attraction"} alt={attraction.name} />
      <div>
        <h3>{attraction.name}</h3>
        <div className="small-muted">{attraction.city || "-"} — {attraction.state || "-"}</div>
        <p className="small-muted" style={{marginTop:8}}>{attraction.description ? attraction.description.slice(0,160) + (attraction.description.length>160 ? "..." : "") : "No description"}</p>

        
        <div style={{marginTop:12, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <div className="small-muted">Rating: {attraction.rating ?? "—"}</div>
          <div style={{ position: "absolute", right: 300 }}>
            <Link to={`/attraction/${attraction.id}`} className="link">View details </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
