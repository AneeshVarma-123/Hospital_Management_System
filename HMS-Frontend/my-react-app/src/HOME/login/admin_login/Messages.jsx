import React, { useEffect, useState } from 'react';
import './Ad.css';
const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function Messages(){
  const [msgs, setMsgs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    let mounted = true;
    const fetchMsgs = async ()=>{
      try{
  const token = localStorage.getItem('hms_admin_token');
  const res = await fetch(`${apiBase}/api/messages`, { headers: { Authorization: token? `Bearer ${token}` : '' } });
        const data = await res.json();
        if(mounted) setMsgs(data);
      }catch(err){ console.error(err) }
      finally{ if(mounted) setLoading(false) }
    }
    fetchMsgs();
    return ()=> mounted = false;
  },[])

  if(loading) return <div className="AdContainer">Loading messages...</div>

  return (
    <div className="AdContainer">
      <h2>Doctor Messages</h2>
      <div style={{display:'flex', flexDirection:'column', gap:12, marginTop:12}}>
        {msgs.map(m=> (
          <div key={m._id} className="Doctor-card" style={{padding:12}}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <div>
                <div><strong>Doctor:</strong> {m.doctorId?.name} — {m.doctorId?.speciality}</div>
                <div><strong>Action:</strong> {m.action}</div>
                {m.reason && <div><strong>Reason:</strong> {m.reason}</div>}
                <div style={{marginTop:8}}><strong>Patient:</strong> {m.appointmentId?.name} — {m.appointmentId?.phone}</div>
                <div><strong>Symptoms:</strong> {m.appointmentId?.symptoms}</div>
              </div>
              <div style={{color:'#888'}}>At: {new Date(m.createdAt).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Messages;
