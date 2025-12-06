import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAttractionById } from "../api";

export default function AttractionDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttractionById(id).then(d => { setData(d); setLoading(false); }).catch(err => { console.error(err); setLoading(false); });
  }, [id]);

  if (loading) return <div className='container'><div className='card center'>Loading…</div></div>;
  if (!data) return <div className='container'><div className='card center'>Not found</div></div>;

  return (
    <div className='container'>
      <div className='card'>
        <div style={{display:'flex', gap:12}}>
          <img src={data.mediaUrl || 'https://via.placeholder.com/400x240'} alt={data.name} style={{width:320, height:200, objectFit:'cover', borderRadius:8}} />
          <div style={{flex:1}}>
            <h2 style={{marginTop:0}}>{data.name}</h2>
            <div className='small-muted'>{data.city}, {data.state} — {data.country}</div>
            <p style={{marginTop:10}}>{data.description}</p>
            <div style={{marginTop:10}} className='small-muted'>Timings: {data.timings || '—'}</div>
            <div style={{marginTop:6}} className='small-muted'>Ticket: {data.ticketPrice ? `₹${data.ticketPrice}` : '—'}</div>
            <div style={{marginTop:6}} className='small-muted'>Rating: {data.rating ?? '—'}</div>
            <div style={{marginTop:8}} className='small-muted'>Lat: {data.latitude ?? '—'} | Lng: {data.longitude ?? '—'}</div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
