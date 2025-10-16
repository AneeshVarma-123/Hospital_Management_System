import {useNavigate} from 'react-router-dom';
import './Contact.css';

function Contact(){
    const navigate = useNavigate();

    return(
        <div className="contact">
            <nav>
                <div className ="CNav-left">
                    <t><b>HEALTH CARE</b></t>
                </div>
                <div className ="CNav-right">
                    <button className="CNav-button" onClick={()=>navigate('/')}>Home</button>
                    </div>
            </nav>
            <div className="Contact-Section">
               <video className ="ContactV" autoPlay muted loop>
                    <source src="/contact.mp4" type="video/mp4"></source>
               </video>
                
            
                <div className ="Contact-Items">
                <div className = "Contact-Item">
                    <div className="Contact-Title"><h1>Our Mail Id's</h1></div>
                    <div className="Contact-Content">
                        <ul>
                            <li>info@healthcare.com</li>
                            <li>healthcare@gmail.com</li>
                            <li>healthcare@hotmail.com</li>
                            <li>healthcare@yahoo.com</li>
                        </ul>
                    </div>
                </div>
                <div className ="Contact-Item">
                     <div className="Contact-Title"><h1>Our Contact Numbers</h1></div>
                    <div className="Contact-Content">
                        <ul>
                            <li>+1-234-567-8901</li>
                            <li>+1-234-567-8902</li>
                            <li>+1-234-567-8903</li>
                            <li>+1-234-567-8904</li>
                        </ul>
                    </div>
                </div>
                <div className = "Contact-Item">
                    <div className="Contact-Title"><h1>Our Social Links</h1></div>
                    <div className="Contact-Content">
                        <ul>
                            <li><a href="https://www.facebook.com/healthcare">Facebook</a></li>
                            <li><a href="https://www.twitter.com/healthcare">Twitter</a></li>
                            <li><a href="https://www.instagram.com/healthcare">Instagram</a></li>
                        </ul>
                    </div>
                </div>
                </div>
                <div className="Location-Item">
                    <div className="Location-Content">
                        
                        <iframe 
                            title="Google Map Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.123456789012!2d-122.419415684681!3d37.774929279759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c8b8b8b8b%3A0x1234567890abcdef!2sHealth%20Care%20Hospital!5e0!3m2!1sen!2sus!4v1612345678901"
                            width="1000"
                            height="180" 
                            style={{border:0}} 
                            allowFullScreen="" 
                            loading="eager">
                        </iframe>
                    </div>
                    </div>
                </div>
             </div>
         

    )

}

export default Contact;