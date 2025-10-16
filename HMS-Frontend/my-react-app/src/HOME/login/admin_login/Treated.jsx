import React, { useEffect, useState } from 'react';
import './Ad.css';

function Treated(){
  const [appts, setAppts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    let mounted = true;
    const fetchTreated = async ()=>{
      try{
  const token = localStorage.getItem('hms_admin_token');
  const res = await fetch('http://localhost:5000/api/appointments/status/treated', { headers: { Authorization: token? `Bearer ${token}` : '' } });
  const data = await res.json();
        if(mounted) setAppts(data);
      }catch(err){ console.error(err) }
      finally{ if(mounted) setLoading(false) }
    }
    fetchTreated();
    return ()=> mounted = false;
  },[])

  if(loading) return <div className="Admin-Section">Loading...</div>
  if(appts.length === 0) return <div className="Admin-Section"><h3>No treated cases</h3></div>

  return (
    <div className="Admin-Section">
      <h2 style={{marginTop:20}}>Treated Cases</h2>
      <div style={{display:'flex', flexDirection:'column', gap:12, width:'90%', marginTop:20}}>
        {appts.map(a=> (
          <div key={a._id} style={{background:'#fff', padding:12, borderRadius:8, boxShadow:'0 4px 14px rgba(0,0,0,0.06)'}}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <div>
                <div><strong>Patient:</strong> {a.name} — {a.age} yrs</div>
                <div><strong>Phone:</strong> {a.phone}</div>
                <div><strong>Doctor:</strong> {a.doctorId?.name || '—'}</div>
                <div><strong>Treated At:</strong> {a.treatedAt ? new Date(a.treatedAt).toLocaleString() : '—'}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Treated;
