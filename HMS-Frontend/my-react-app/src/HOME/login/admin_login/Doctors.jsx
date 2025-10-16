import React, { useEffect, useState } from 'react';
import './Ad.css';
const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMessageFor, setActiveMessageFor] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(()=>{
    let mounted = true;
    const fetchDocs = async ()=>{
  try {
  const res = await fetch(`${apiBase}/api/doctors`);
        const data = await res.json();
        if(mounted) setDoctors(data);
      } catch(err){ console.error(err) }
      finally{ if(mounted) setLoading(false) }
    }
    fetchDocs();
    return ()=> mounted = false;
  },[])

  if(loading) return <div className="AdContainer">Loading...</div>

  return (
    <div className="AdContainer">
      <h2>Doctors</h2>
      <div className="Doctors-list">
        {doctors.map(d=> (
          <div key={d._id} className="Doctor-card">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div>
                <div><strong>{d.name}</strong> ({d.docId})</div>
                <div style={{fontSize:13, color:'#555'}}>{d.speciality} — {d.honours}</div>
              </div>
              <div>
                <button className="Admin-Button" onClick={()=> setActiveMessageFor(activeMessageFor===d._id? null : d._id)}>{activeMessageFor===d._id? 'Cancel' : 'Message'}</button>
              </div>
            </div>
            {activeMessageFor===d._id && (
              <div style={{marginTop:8}}>
                <textarea rows={3} value={messageText} onChange={e=>setMessageText(e.target.value)} style={{width:'100%', padding:8}} placeholder={`Message to ${d.name}`}></textarea>
                <div style={{marginTop:8, display:'flex', gap:8}}>
                  <button className="Admin-Button" disabled={sending || !messageText.trim()} onClick={async ()=>{
                    setSending(true);
                    try{
                      const token = localStorage.getItem('hms_admin_token');
                      const res = await fetch(`${apiBase}/api/messages`, { method:'POST', headers: { 'Content-Type':'application/json', Authorization: token? `Bearer ${token}` : '' }, body: JSON.stringify({ doctorId: d._id, content: messageText.trim() }) });
                      const data = await res.json();
                      if(!res.ok) return alert(data.error || 'Failed to send');
                      alert('Message sent');
                      setMessageText(''); setActiveMessageFor(null);
                    }catch(err){ console.error(err); alert('Network error') }
                    finally{ setSending(false) }
                  }}>{sending? 'Sending...' : 'Send'}</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Doctors;
