import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Register failed');
        setLoading(false);
        return;
      }
      localStorage.setItem('hms_user', JSON.stringify({ userId: data.userId, name, email }));
      navigate('/book');
    } catch (err) { console.error(err); setError('Network or server error') }
    finally { setLoading(false); }
  }

  return (
    <div className="Auth-container">
      <h2>Register</h2>
      <form onSubmit={submit} className="Auth-form">
        <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} required />
        <input placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
      </form>
      {error && <div style={{color:'crimson', marginTop:8}}>{error}</div>}
      <p style={{marginTop:10}}>Already have an account? <button className="link-button" onClick={()=>navigate('/login')}>Login</button></p>
    </div>
  );
}

export default Register;
