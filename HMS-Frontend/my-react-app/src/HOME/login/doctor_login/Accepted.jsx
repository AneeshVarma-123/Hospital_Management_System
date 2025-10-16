import React, { useEffect, useState } from 'react';
import './Doc.css';

function Accepted(){
  const [appts, setAppts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    let mounted = true;
    const fetchAccepted = async ()=>{
      try{
  const stored = localStorage.getItem('hms_doc');
  if(!stored) return setAppts([]);
  const { id } = JSON.parse(stored);
  const token = localStorage.getItem('hms_doc_token');
  const res = await fetch(`http://localhost:5000/api/appointments/doctor/${id}/status/accepted`, { headers: { Authorization: token? `Bearer ${token}` : '' } });
        const data = await res.json();
        if(mounted) setAppts(data);
      }catch(err){ console.error(err) }
      finally{ if(mounted) setLoading(false) }
    }
    fetchAccepted();
    return ()=> mounted = false;
  },[])

  const treated = async (id)=>{
    try{
  const token = localStorage.getItem('hms_doc_token');
  const res = await fetch(`http://localhost:5000/api/appointments/${id}/treated`, { method: 'PATCH', headers: { Authorization: token? `Bearer ${token}` : '' } });
      const data = await res.json();
      if(!res.ok) return alert(data.error || 'Treated failed');
      alert('Marked as treated');
      setAppts(prev=>prev.filter(a=>a._id !== id));
    }catch(err){ console.error(err); alert('Error') }
  }

  if(loading) return <div className="Doctor-Section">Loading...</div>
  if(appts.length === 0) return <div className="Doctor-Section"><h3>No accepted cases</h3></div>

  return (
    <div className="Doctor-Section">
      <h2 style={{marginTop:20}}>Accepted Cases</h2>
      <div style={{display:'flex', flexDirection:'column', gap:12, width:'90%', marginTop:20}}>
        {appts.map(a=> (
          <div key={a._id} style={{background:'#fff', padding:12, borderRadius:8, boxShadow:'0 4px 14px rgba(0,0,0,0.06)'}}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <div>
                <div><strong>Patient:</strong> {a.name} — {a.age} yrs</div>
                <div><strong>Phone:</strong> {a.phone}</div>
                <div><strong>Reason:</strong> {a.symptoms}</div>
                <div><strong>Preferred:</strong> {a.preference}</div>
              </div>
              <div style={{display:'flex', flexDirection:'column', gap:8}}>
                <button className="Dbutton" onClick={()=>treated(a._id)}>Treated</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Accepted;
