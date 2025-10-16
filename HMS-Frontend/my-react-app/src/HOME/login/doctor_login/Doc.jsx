import { useNavigate } from "react-router-dom";
import './Doc.css'

function Doc(){
    const navigate = useNavigate();
    return(
        <div className = "doctor">
            <nav>
                <div className="navd-left">
                    <t><b>HEALTH CARE</b></t>
                </div>
                <div className="navd-right">
                    <div className ="navd-Items">
                        <button className = "DItem" onClick ={()=>navigate("/MessagesD")}>Messages</button>
                        <button className = "DItem" onClick ={()=>navigate("/ProfileD")}>Profile</button>
                        <button className = "DItem" onClick ={()=>{ localStorage.removeItem('hms_doc_token'); localStorage.removeItem('hms_doc'); navigate('/'); }}>Logout</button>
                    </div>
                </div>
            </nav>
            <div className = "Doctor-Section">
                <video className ="DocV" autoPlay muted loop>
                    <source src="/doctor.mp4" type="video/mp4"></source>
                </video>
                <div className = "Doctor-Content">
                    <h1><b>HLO DOCTOR</b></h1>
                    <div className = "Dbuttons">
                        <button className = "Dbutton" onClick = {()=>navigate("/tobeA")}>To Be Accepted</button>
                        <button className = "Dbutton" onClick = {()=>navigate("/Accepted")}>Accepted</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Doc;