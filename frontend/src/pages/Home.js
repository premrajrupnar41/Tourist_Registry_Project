import React, { useEffect, useState } from 'react';
import { fetchAttractions, fetchFiltered } from '../api';
import Filters from '../components/Filters';
import AttractionCard from '../components/AttractionCard';

export default function Home() {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ country: '', state: '', city: '' });

  async function loadAll() {
    setLoading(true);
    try {
      const data = await fetchAttractions();
      setAttractions(data || []);
    } catch (e) {
      console.error(e);
      setAttractions([]);
    } finally { setLoading(false); }
  }

  async function loadFiltered() {
    setLoading(true);
    try {
      const data = await fetchFiltered(filters);
      setAttractions(data || []);
    } catch (e) {
      console.error(e);
      setAttractions([]);
    } finally { setLoading(false); }
  }

  useEffect(() => { loadAll(); }, []);

  return (
    <div className='container'>
      <div className='grid cols-4'>
        <div>
          <Filters filters={filters} setFilters={setFilters} onApply={loadFiltered} onReset={() => { setFilters({country:'',state:'',city:''}); loadAll(); }} />
        </div>

        <div>
          <div style={{marginBottom:12}}>
            <h2 style={{margin:'6px 0'}}>Attractions</h2>
            <div className='small-muted'>Browse attractions registered in the system</div>
          </div>

          {loading ? <div className='card center'>Loading...</div> :
            (attractions.length === 0 ? <div className='card center'>No attractions found.</div> :
              <div className='grid' style={{gap:12}}>
                {attractions.map(a => <AttractionCard key={a.id} attraction={a} />)}
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
