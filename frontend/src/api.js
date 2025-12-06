const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8081/api';

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const resp = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!resp.ok) {
    const text = await resp.text();
    const err = new Error(`HTTP ${resp.status}: ${text || resp.statusText}`);
    err.status = resp.status;
    throw err;
  }
  if (resp.status === 204) return null;
  return resp.json();
}

export function fetchAttractions() {
  return request('/attractions');
}

export function fetchFiltered(params = {}) {
  const qs = new URLSearchParams(params).toString();
  return request(`/attractions/filter${qs ? '?' + qs : ''}`);
}

export function fetchAttractionById(id) {
  return request(`/attractions/${id}`);
}

export function createAttraction(payload) {
  return request('/attractions', { method: 'POST', body: JSON.stringify(payload) });
}

export function fetchCountries() {
  return request('/attractions/meta/countries');
}

export function fetchStates(country) {
  return request(`/attractions/meta/states?country=${encodeURIComponent(country)}`);
}

export function fetchCities(state) {
  return request(`/attractions/meta/cities?state=${encodeURIComponent(state)}`);
}
