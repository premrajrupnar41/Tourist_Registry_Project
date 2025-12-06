import React, { useEffect, useState } from "react";
import { createAttraction } from "../api"; // keep your api import
import { useNavigate } from "react-router-dom";

export default function AddAttraction() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    latitude: "",
    longitude: "",
    city: "",
    district: "",
    state: "",
    country: "",
    mediaUrl: "",
    ticketPrice: "",
    category: "",
    rating: "",
    timings: "",
    openingHours: "",
    contact: ""
  });

  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("AddAttraction mounted — form:", form);
    // run only once on mount; log will show component is active
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onChange(e) {
    const { name, value } = e.target;
    setForm(prev => {
      const next = { ...prev, [name]: value };
      console.log("form changed:", name, value);
      return next;
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        name: form.name || null,
        description: form.description || null,
        latitude: form.latitude !== "" ? parseFloat(form.latitude) : null,
        longitude: form.longitude !== "" ? parseFloat(form.longitude) : null,
        city: form.city || null,
        district: form.district || null,
        state: form.state || null,
        country: form.country || null,
        mediaUrl: form.mediaUrl || null,
        ticketPrice: form.ticketPrice !== "" ? parseFloat(form.ticketPrice) : null,
        category: form.category || null,
        rating: form.rating !== "" ? parseFloat(form.rating) : null,
        timings: form.timings || null,
        openingHours: form.openingHours || null,
        contact: form.contact !== "" ? parseFloat(form.contact) : null
      };
      console.log("Submitting payload:", payload);
      await createAttraction(payload);
      navigate("/");
    } catch (err) {
      console.error("Save failed:", err);
      alert("Error saving attraction. See console.");
    } finally {
      setSaving(false);
    }
  }

  // Inline simple styles so nothing can hide inputs
  const wrapperStyle = { maxWidth: 920, margin: "28px auto", padding: 20, background: "#fff", borderRadius: 12, boxShadow: "0 6px 20px rgba(0,0,0,0.06)" };
  const gridStyle = { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 };
  const fullStyle = { gridColumn: "1 / span 3" };
  const inputStyle = { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #e6e9ef", fontSize: 14, boxSizing: "border-box" };
  const labelStyle = { display: "block", marginBottom: 6, fontSize: 13, color: "#374151" };
  const btnStyle = { background: "#5b21b6", color: "#fff", border: "none", padding: "10px 16px", borderRadius: 10, cursor: "pointer" };

  return (
    <div style={{ padding: 18 }}>
      <div style={wrapperStyle}>
        <h2 style={{ marginTop: 0 }}>Register a new Attraction</h2>

        <form onSubmit={onSubmit}>
          <div style={gridStyle}>

            <div style={fullStyle}>
              <label style={labelStyle}>Name</label>
              <input name="name" value={form.name} onChange={onChange} placeholder="Name" style={inputStyle} />
            </div>

            <div style={fullStyle}>
              <label style={labelStyle}>Description</label>
              <textarea name="description" value={form.description} onChange={onChange} placeholder="Description" rows={3} style={{ ...inputStyle, minHeight: 80 }} />
            </div>

            <div>
              <label style={labelStyle}>Latitude</label>
              <input name="latitude" value={form.latitude} onChange={onChange} placeholder="Latitude" style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Longitude</label>
              <input name="longitude" value={form.longitude} onChange={onChange} placeholder="Longitude" style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>City</label>
              <input name="city" value={form.city} onChange={onChange} placeholder="City" style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>District</label>
              <input name="district" value={form.district} onChange={onChange} placeholder="District" style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>State</label>
              <input name="state" value={form.state} onChange={onChange} placeholder="State" style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Country</label>
              <input name="country" value={form.country} onChange={onChange} placeholder="Country" style={inputStyle} />
            </div>

            <div style={fullStyle}>
              <label style={labelStyle}>Image URL (mediaUrl)</label>
              <input name="mediaUrl" value={form.mediaUrl} onChange={onChange} placeholder="Image URL" style={inputStyle} />
            </div>

            {/* New fields */}
            <div>
              <label style={labelStyle}>Ticket Price</label>
              <input name="ticketPrice" value={form.ticketPrice} onChange={onChange} placeholder="Ticket Price" style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Category</label>
              <input name="category" value={form.category} onChange={onChange} placeholder="Category" style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Rating</label>
              <input name="rating" value={form.rating} onChange={onChange} placeholder="Rating (out of 10)" style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Timings</label>
              <input name="timings" value={form.timings} onChange={onChange} placeholder="Timings (e.g. 6AM-7PM)" style={inputStyle} />
            </div>

            
            <div style={fullStyle}>
              <div style={{ textAlign: "right", marginTop: 8 }}>
                <button type="submit" style={btnStyle} disabled={saving}>{saving ? "Saving..." : "Save"}</button>
              </div>
            </div>

          </div>
        </form>

        <hr style={{ margin: "18px 0" }} />

      
      </div>
    </div>
  );
}
