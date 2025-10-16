import { useNavigate } from 'react-router-dom'
import './Doc.css'

function ProfileD() {
  const navigate = useNavigate()
  const stored = localStorage.getItem('hms_doc')
  const token = localStorage.getItem('hms_doc_token')
  const doc = stored ? JSON.parse(stored) : null

  if (!token) {
    navigate('/doctor-login')
    return null
  }

  return (
    <div className="doctor profile">
      <nav>
        <div className="navd-left">
          <t><b>HEALTH CARE</b></t>
        </div>
        <div className="navd-right">
          <div className="navd-Items">
            <button className="DItem" onClick={() => navigate('/doc')}>Back</button>
            <button className="DItem" onClick={() => { localStorage.removeItem('hms_doc_token'); localStorage.removeItem('hms_doc'); navigate('/'); }}>Logout</button>
          </div>
        </div>
      </nav>

      <div className="Doctor-Section">
        <div className="Doctor-Content">
          <h2>Doctor Profile</h2>
          {doc ? (
            <div className="profile-card">
              <p><strong>Name:</strong> {doc.name || '—'}</p>
              <p><strong>Doctor ID:</strong> {doc.docId || doc.id || '—'}</p>
              <p><strong>Internal ID:</strong> {doc.id || '—'}</p>
              <p><strong>Token present:</strong> {token ? 'Yes' : 'No'}</p>
            </div>
          ) : (
            <p>No doctor profile found in local storage.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfileD
