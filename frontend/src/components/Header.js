import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="brand" style={{textDecoration:"none", color:"inherit"}}>
          <div className="logo">TR</div>
          <div>
            <div style={{fontWeight:700}}>Tourist Registry</div>
            <div className="small-muted">Discover & register attractions</div>
          </div>
        </Link>
        <nav>
          <Link to="/" className="link" style={{marginRight:12}}>Home</Link>
          <Link to="/add" className="btn primary" style={{padding:"8px 14px", textDecoration:"none"}}>Add Attraction</Link>
        </nav>
      </div>
    </header>
  );
}
