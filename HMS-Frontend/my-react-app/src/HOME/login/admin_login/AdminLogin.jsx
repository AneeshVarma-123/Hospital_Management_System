import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Ad.css';
const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function AdminLogin(){
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try{
  const res = await fetch(`${apiBase}/api/admin/login`, {
        method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ adminId, password })
      });
      const data = await res.json();
      if(!res.ok) return setError(data.error || 'Login failed');
  // store admin session and token in localStorage
  localStorage.setItem('hms_admin', JSON.stringify({ id: data.admin.id, adminId: data.admin.adminId, name: data.admin.name }));
  if (data.token) localStorage.setItem('hms_admin_token', data.token);
      navigate('/admin');
    }catch(err){ console.error(err); setError('Network error') }
    finally{ setLoading(false) }
  }

  return (
    <div className="Admin-Section" style={{alignItems:'center', justifyContent:'center'}}>
      <div className="Admin-LoginCard">
        <h2>Admin Sign In</h2>
        <p className="subtitle">Enter your administrator credentials to continue</p>
        <form onSubmit={submit} style={{display:'flex',flexDirection:'column',gap:12}}>
          <input className="Admin-Input" placeholder="Admin ID" value={adminId} onChange={e=>setAdminId(e.target.value)} required />
          <input className="Admin-Input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
          <div style={{display:'flex',gap:8}}>
            <button className="Admin-Primary" type="submit" disabled={loading}>{loading? 'Signing in...':'Sign In'}</button>
            <button type="button" onClick={()=>{setAdminId(''); setPassword('')}} style={{marginLeft:8}}>Clear</button>
          </div>
          {error && <div style={{color:'crimson'}}>{error}</div>}
        </form>
        <div className="Admin-Helper">Demo credentials: <strong>ADMIN01 / adminpass</strong></div>
      </div>
    </div>
  )
}

export default AdminLogin;
