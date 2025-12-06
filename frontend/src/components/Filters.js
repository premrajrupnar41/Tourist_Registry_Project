import React, { useEffect, useState } from 'react';
import { fetchCountries, fetchStates, fetchCities } from '../api';

export default function Filters({ filters, setFilters, onApply, onReset }) {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchCountries().then(setCountries).catch(() => setCountries([]));
  }, []);

  useEffect(() => {
    if (!filters.country) { setStates([]); return; }
    fetchStates(filters.country).then(setStates).catch(() => setStates([]));
  }, [filters.country]);

  useEffect(() => {
    if (!filters.state) { setCities([]); return; }
    fetchCities(filters.state).then(setCities).catch(() => setCities([]));
  }, [filters.state]);

  return (
    <div className='card filter'>
      <h3 style={{marginTop:0}}>Filters</h3>
      <select value={filters.country} onChange={e => setFilters({...filters, country: e.target.value, state:'', city:''})}>
        <option value=''>All countries</option>
        {countries.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <select value={filters.state} onChange={e => setFilters({...filters, state: e.target.value, city:''})}>
        <option value=''>All states</option>
        {states.map(s => <option key={s} value={s}>{s}</option>)}
      </select>

      <select value={filters.city} onChange={e => setFilters({...filters, city: e.target.value})}>
        <option value=''>All cities</option>
        {cities.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <div className='btn-row'>
        <button className='btn primary' onClick={onApply}>Apply</button>
        <button className='btn ghost' onClick={onReset}>Reset</button>
      </div>
    </div>
  );
}
