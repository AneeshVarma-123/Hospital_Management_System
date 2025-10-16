import { useNavigate } from 'react-router-dom'
import {useState} from 'react'
import './Home.css'

function Home() {
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className ="HOME">
      <nav>
        <div className="Nav-right">
         <t> <b>HEALTH CARE</b> </t>
        </div>
        <div className="Nav-left">
          <div className = "Nav-items">
            <div className = "Ex-items">
              <span className="ex" onClick={()=>navigate("/About")}>About</span>
              <span className="ex" onClick={()=>navigate("/contact")}>Contact</span>
            </div>
            <div className ="login-section">
            <button className = "Login" onMouseEnter={()=>setShowDropdown(true)}
            onMouseLeave = {()=>setShowDropdown(false)}>
              LOGIN
              {
                showDropdown &&(
                  <div className ="dropdown-menu">
                    <button className ="dropdown-item" onClick={()=>navigate("/admin-login")}>Admin</button>
                    <button className ="dropdown-item" onClick={()=>navigate("/doctor-login")}>Doctor</button>
                  </div>
                )
              }
            </button>
            </div>
          </div>
          </div>
      </nav>
      <div className = "Main-Section">
        <video className="background-video" autoPlay loop muted>
          <source src="/home.mp4" type="video/mp4" />
        </video>
        <div className = "Container">
        <div className = "Main-Content">
          <h1>HEALTH CARE</h1>
          </div>
          <div className = "Main-SubContent">
            <p>Your Health, Our Priority</p>
            </div>
            <button className="Main-Button" onClick={()=>navigate("/booking")}>
              Book Appointment
              </button>
            </div>
        </div>
      </div>
  )
}

export default Home
