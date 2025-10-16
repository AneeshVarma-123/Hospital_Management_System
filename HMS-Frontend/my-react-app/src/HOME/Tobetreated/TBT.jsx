import React, { useEffect, useState } from 'react';
import './TBT.css';
const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000'
import { useNavigate } from 'react-router-dom';

function TBT() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    const fetchAppointments = async () => {
      try {
  const token = localStorage.getItem('hms_admin_token');
  const res = await fetch(`${apiBase}/api/appointments`, { headers: { Authorization: token? `Bearer ${token}` : '' } });
        if (!res.ok) throw new Error('Failed to fetch appointments');
        const data = await res.json();
        if (mounted) setAppointments(data);
      } catch (err) {
        console.error(err);
        if (mounted) setError(err.message || 'Error');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchAppointments();

    return () => { mounted = false };
  }, []);

  if (loading) return <div className="TBT-container">Loading appointments...</div>;
  if (error) return <div className="TBT-container">Error: {error}</div>;

  const handleUpdateDate = async (id, newDate) => {
    try {
  const res = await fetch(`${apiBase}/api/appointments/${id}/update-date`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preference: newDate }),
      });
      if (!res.ok) throw new Error('Failed to update appointment date');
      const data = await res.json();
      // navigate to appoint page so admin can reassign
      navigate(`/appoint/${id}`);
    } catch (err) {
      console.error(err);
      alert('Could not update date. Try again.');
    }
  };

  return (
    <div className="TBT-container">
      <h2>To Be Treated</h2>
      { /* filter out treated appointments */ }
      {appointments.filter(a => a.status !== 'treated').length === 0 ? (
        <div className="TBT-empty">No appointments found.</div>
      ) : (
        <div className="TBT-list">
          {appointments.filter(a => a.status !== 'treated').map((a) => (
            <div key={a._id} className="TBT-card">
              <div className="TBT-card-row">
                <span className="TBT-label">User ID</span>
                <span className="TBT-value">{a.userId?._id || a.userId || '—'}</span>
              </div>
              {/* status row */}
              <div className="TBT-card-row">
                <span className="TBT-label">Status</span>
                <span className="TBT-value">{a.status || 'pending'}</span>
              </div>
              {a.userId?.name && (
                <div className="TBT-card-row">
                  <span className="TBT-label">User</span>
                  <span className="TBT-value">{a.userId.name} ({a.userId.email})</span>
                </div>
              )}
              <div className="TBT-card-row">
                <span className="TBT-label">Name</span>
                <span className="TBT-value">{a.name}</span>
              </div>
              <div className="TBT-card-row">
                <span className="TBT-label">Phone</span>
                <span className="TBT-value">{a.phone}</span>
              </div>
              <div className="TBT-card-row">
                <span className="TBT-label">Reason</span>
                <span className="TBT-value">{a.symptoms}</span>
              </div>
              <div className="TBT-card-row">
                <span className="TBT-label">Preferred Date</span>
                <span className="TBT-value">{a.preference || '—'}</span>
              </div>
              <div className="TBT-card-row">
                <span className="TBT-label">Mode</span>
                <span className="TBT-value">{a.mode || '—'}</span>
              </div>
              <div className="TBT-card-footer">Submitted: {new Date(a.createdAt).toLocaleString()}</div>
              <div className="TBT-card-actions">
                <button className="TBT-appoint" onClick={()=>window.location.href=`/appoint/${a._id}`}>APPOINT</button>
                {/* If rejected, allow admin to change date and reassign */}
                {a.status === 'rejected' && (
                  <EditAndReassign
                    appointment={a}
                    onSave={(newDate) => handleUpdateDate(a._id, newDate)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TBT;

// Inline small component to edit date and trigger reassignment
function EditAndReassign({ appointment, onSave }) {
  const [editing, setEditing] = useState(false);
  const [date, setDate] = useState(appointment.preference || '');

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      {editing ? (
        <>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="TBT-inline-date"
          />
          <button className="TBT-save" onClick={() => { if (!date) return alert('Pick a date'); onSave(date); }}>Save & Reassign</button>
          <button className="TBT-cancel" onClick={() => { setEditing(false); setDate(appointment.preference || ''); }}>Cancel</button>
        </>
      ) : (
        <button className="TBT-edit" onClick={() => setEditing(true)}>Edit Date & Reassign</button>
      )}
    </div>
  );
}
