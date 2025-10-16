import { useNavigate } from 'react-router-dom'
import './Ad.css'

function Profile() {
  const navigate = useNavigate()
  const stored = localStorage.getItem('hms_admin')
  const token = localStorage.getItem('hms_admin_token')
  const admin = stored ? JSON.parse(stored) : null

  if (!token) {
    // simple client-side guard
    navigate('/admin-login')
    return null
  }

  return (
    <div className="admin profile">
      <nav>
        <div className="anav-left">
          <t><b>HEALTH CARE</b></t>
        </div>
        <div className="anav-right">
          <div className="Admin-Items">
            <button className="AItems" onClick={() => navigate('/Tobetreated')}>Back</button>
            <button className="AItems" onClick={() => { localStorage.removeItem('hms_admin_token'); localStorage.removeItem('hms_admin'); navigate('/'); }}>Logout</button>
          </div>
        </div>
      </nav>

      <div className="Admin-Section">
        <div className="Admin-Content">
          <h2>Administrator Profile</h2>
          {admin ? (
            <div className="profile-card">
              <p><strong>Name:</strong> {admin.name || '—'}</p>
              <p><strong>Admin ID:</strong> {admin.adminId || admin.id || '—'}</p>
              <p><strong>Internal ID:</strong> {admin.id || '—'}</p>
              <p><strong>Token present:</strong> {token ? 'Yes' : 'No'}</p>
            </div>
          ) : (
            <p>No admin profile found in local storage.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
