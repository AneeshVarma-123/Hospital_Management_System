import { useNavigate } from 'react-router-dom'
import './Ad.css'


function Ad() {
const navigate = useNavigate()
    // simple client-side guard
        const token = localStorage.getItem('hms_admin_token');
        if (!token) {
            navigate('/admin-login');
            return null;
        }
return (
    <div className="admin">
        <nav>
            <div className ="anav-left">
                <t><b>HEALTH CARE</b></t>
            </div>
            <div className ="anav-right">
                <div className = "Admin-Items">
                    <button className ="AItems" onClick = {()=>navigate('/Doctors')}>Doctors</button>
                    <button className ="AItems" onClick = {()=>navigate('/Messages')}>Messages</button>
                    <button className ="AItems" onClick = {()=>navigate('/Profile')}>Profile</button>
                    <button className ="AItems" onClick ={()=>{ localStorage.removeItem('hms_admin_token'); localStorage.removeItem('hms_admin'); navigate('/'); }}>Logout</button>
                </div>
                </div>
        </nav>
        <div className="Admin-Section">
            <video className ="AdminV" autoPlay muted loop>
                <source src = "/admin.mp4" type="video/mp4"></source>
            </video>
            <div className="Admin-Content">
                <h1><b>HLO ADMINISTRATOR</b></h1>
                <div className ="Admin-Buttons">
                    <button className="Admin-Button" onClick={()=>navigate('/Tobetreated')}>To Be Treated</button>
                    <button className="Admin-Button" onClick={()=>navigate('/Treated')}>Treated</button>
                </div>
                </div>
            </div>
    </div>
)
}
export default Ad;
