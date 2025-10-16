import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function Login() {
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
  const res = await fetch(`${apiBase}/api/auth/login`, {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }
      localStorage.setItem('hms_user', JSON.stringify({ userId: data.userId, name: data.name, email: data.email }));
      navigate('/book');
    } catch (err) { 
      console.error(err); 
      setError('Network or server error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="Auth-container">
      <h2>Login</h2>
      <form onSubmit={submit} className="Auth-form">
        <input placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
      </form>
      {error && <div style={{color:'crimson', marginTop:8}}>{error}</div>}
      <p style={{marginTop:10}}>Don't have an account? <button className="link-button" onClick={()=>navigate('/register')}>Register</button></p>
    </div>
  );
}

export default Login;
