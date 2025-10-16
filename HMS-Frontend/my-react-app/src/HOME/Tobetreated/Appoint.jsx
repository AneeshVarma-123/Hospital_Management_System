import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TBT.css';
const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function Appoint(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(()=>{
    let mounted = true;
    const fetchDocs = async ()=>{
  try{
  const res = await fetch(`${apiBase}/api/doctors`);
        const data = await res.json();
        if(mounted) setDoctors(data);
      }catch(err){ console.error(err); if(mounted) setError('Failed to load doctors') }
      finally{ if(mounted) setLoading(false) }
    }
    fetchDocs();
    return ()=> mounted = false;
  },[])

  const assign = async ()=>{
    if(!selected) return alert('Select a doctor');
    try{
      setLoading(true);
      // call assign endpoint
      const token = localStorage.getItem('hms_admin_token');
  const res = await fetch(`${apiBase}/api/appointments/${id}/assign`, {
        method: 'PATCH', headers: {'Content-Type':'application/json', Authorization: token? `Bearer ${token}` : ''},
        body: JSON.stringify({ doctorId: selected })
      });

      let data = null;
      try { data = await res.json(); } catch(e) { /* non-json response */ }

      if (!res.ok) {
        const msg = (data && (data.error || data.message)) || `Assign failed (status ${res.status})`;
        setError(msg);
        console.error('Assign failed', msg, data);
        setLoading(false);
        return;
      }

      alert('Doctor assigned');
      navigate('/Tobetreated');
    }catch(err){ console.error(err); alert('Assign error') }
  }

  if(loading) return <div className="TBT-container">Loading doctors...</div>
  if(error) return <div className="TBT-container">Error: {error}</div>

  return (
    <div className="TBT-container">
      <h2>Assign Doctor</h2>
      <div className="Doctors-list">
        {doctors.map(d=> (
          <div key={d._id} className={`Doctor-card ${selected===d._id? 'selected':''}`} onClick={()=>setSelected(d._id)}>
            <div className="Doctor-name">{d.name}</div>
            <div className="Doctor-meta">{d.speciality}</div>
            <div className="Doctor-meta-small">{d.honours}</div>
          </div>
        ))}
      </div>
      <div style={{marginTop:16}}>
        <button onClick={assign} className="TBT-appoint" disabled={loading}>Assign</button>
        <button onClick={()=>navigate('/Tobetreated')} style={{marginLeft:8}}>Cancel</button>
        {error && <div style={{color:'crimson', marginTop:8}}>{error}</div>}
      </div>
    </div>
  )
}

export default Appoint;
