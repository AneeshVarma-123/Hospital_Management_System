import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function DoctorLogin(){
  const [docId, setDocId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
  const res = await fetch(`${apiBase}/api/doctors/login`, {
        method: 'POST', headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ docId, password })
      });
      const data = await res.json();
      if (!res.ok) return alert(data.error || 'Login failed');
  // store doctor session and token
  localStorage.setItem('hms_doc', JSON.stringify({ id: data.doctor.id, docId: data.doctor.docId, name: data.doctor.name }));
  if (data.token) localStorage.setItem('hms_doc_token', data.token);
      navigate('/doc');
    } catch (err) { console.error(err); alert('Login error') }
  }

  return (
    <div className="Auth-container">
      <h2>Doctor Login</h2>
      <form onSubmit={submit} className="Auth-form">
        <input placeholder="Doctor ID (e.g. DOC1001)" value={docId} onChange={e=>setDocId(e.target.value)} required />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default DoctorLogin;
