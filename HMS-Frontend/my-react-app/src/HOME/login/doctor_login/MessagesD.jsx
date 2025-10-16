import React, { useEffect, useState } from 'react'
import './Doc.css'
const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function MessagesD(){
  const [msgs, setMsgs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    let mounted = true
    const fetchMsgs = async ()=>{
      try{
        const stored = localStorage.getItem('hms_doc')
        if(!stored){ if(mounted) setLoading(false); return }
        const doc = JSON.parse(stored)
        const token = localStorage.getItem('hms_doc_token')
  const res = await fetch(`${apiBase}/api/messages/doctor/${doc.id}`, { headers: { Authorization: token? `Bearer ${token}` : '' } })
        const data = await res.json()
        if(mounted) setMsgs(data)
      }catch(err){ console.error(err) }
      finally{ if(mounted) setLoading(false) }
    }
    fetchMsgs()
    return ()=> mounted = false
  },[])

  if(loading) return <div className="Doctor-Section">Loading messages...</div>

  return (
    <div className="Doctor-Section" style={{padding:20}}>
      <h2>Your Messages</h2>
      <div style={{display:'flex', flexDirection:'column', gap:12, marginTop:12}}>
        {msgs.length===0 && <div className="Doctor-card">No messages</div>}
        {msgs.map(m=> (
          <div key={m._id} className="Doctor-card" style={{padding:12}}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <div>
                {m.content && <div><strong>Message:</strong> {m.content}</div>}
                {m.reason && <div><strong>Reason:</strong> {m.reason}</div>}
                {m.appointmentId && <div style={{marginTop:8}}><strong>Related appointment:</strong> {m.appointmentId?.symptoms || m.appointmentId?._id}</div>}
              </div>
              <div style={{color:'#888'}}>At: {new Date(m.createdAt).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MessagesD
