import { useNavigate } from 'react-router-dom'
import './Booking.css'


function Booking(){
    const navigate = useNavigate()

    const ensureAuthThenNavigate = () => {
        // direct flow: navigate to BookPage. Authentication checks are handled on BookPage if needed.
        navigate('/book');
    }

    return(
        <div className="Booking">
            <div className="B-Nav">
                <div className="B-Nav-left">
            <t> <b>HEALTH CARE</b> </t>
             </div>
                <div className="B-Nav-right">
                    <button className = "BN-right" onClick = {()=>navigate("/chat")}>
                        CHAT
                    </button>
                </div>
            </div>
            <div className="Booking-center">
            
                <video className="Video" autoPlay loop muted>
                    <source src="/booking.mp4" type="video/mp4" />
                </video>
            
            <div className="Booking-Section">
                <video className="VideoB" autoPlay loop muted>
                    <source src="/booking.mp4" type="video/mp4" />
                </video>
             <div className="B-H"><h1>HEALTH CARE</h1></div> 
             <div className="B-S"><p>We Make Your Booking Easy</p></div>
             <div className = "B-Button">
                <button className = "B-button" onClick = {ensureAuthThenNavigate}>Book IT</button>
            </div>
            <div className="B-extra"><p>For any queries access the Contact Page in the Home Page</p></div>
            </div>
            </div>
        </div>
    )
}

export default Booking