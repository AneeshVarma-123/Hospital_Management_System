import React, { useEffect, useState } from 'react';
import './Doc.css';

function TobeAccepted(){
  const [appts, setAppts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    let mounted = true;
    const fetchAssigned = async ()=>{
      try{
  const stored = localStorage.getItem('hms_doc');
  if(!stored) return setAppts([]);
  const { id } = JSON.parse(stored);
  const token = localStorage.getItem('hms_doc_token');
  const res = await fetch(`http://localhost:5000/api/appointments/doctor/${id}`, { headers: { Authorization: token? `Bearer ${token}` : '' } });
        const data = await res.json();
        if(mounted) setAppts(data);
      }catch(err){ console.error(err) }
      finally{ if(mounted) setLoading(false) }
    }
    fetchAssigned();
    return ()=> mounted = false;
  },[])

  const accept = async (id)=>{
    try{
  const token = localStorage.getItem('hms_doc_token');
  const res = await fetch(`http://localhost:5000/api/appointments/${id}/accept`, { method: 'PATCH', headers: { Authorization: token? `Bearer ${token}` : '' } });
      const data = await res.json();
      if(!res.ok) return alert(data.error || 'Accept failed');
      alert('Accepted');
      setAppts(prev=>prev.filter(a=>a._id !== id));
    }catch(err){ console.error(err); alert('Error') }
  }

  const reject = async (id)=>{
    const reason = prompt('Please provide reason for rejection:');
    if(reason === null) return; // cancelled
    try{
  const token = localStorage.getItem('hms_doc_token');
  const res = await fetch(`http://localhost:5000/api/appointments/${id}/reject`, { method: 'PATCH', headers: {'Content-Type':'application/json', Authorization: token? `Bearer ${token}` : ''}, body: JSON.stringify({ reason }) });
      const data = await res.json();
      if(!res.ok) return alert(data.error || 'Reject failed');
      alert('Rejected');
      setAppts(prev=>prev.filter(a=>a._id !== id));
    }catch(err){ console.error(err); alert('Error') }
  }

  if(loading) return <div className="Doctor-Section">Loading...</div>
  if(appts.length === 0) return <div className="Doctor-Section"><h3>No assigned cases</h3></div>

  return (
    <div className="Doctor-Section">
      <h2 style={{marginTop:20}}>Assigned Cases</h2>
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
                <button className="Dbutton" onClick={()=>accept(a._id)}>Accept</button>
                <button className="Dbutton" style={{background:'#e25a5a'}} onClick={()=>reject(a._id)}>Reject</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TobeAccepted;
