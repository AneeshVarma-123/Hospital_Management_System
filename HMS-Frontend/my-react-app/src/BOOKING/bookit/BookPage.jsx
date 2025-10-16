import React from "react";
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';

import './Book.css'


function BookPage(){
    const Navigate = useNavigate();
    const [prev, setPrev] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        dob: '',
        age: '',
        phone: '',
        email: '',
        adhaar: '',

        symptoms: '',
        preference: '',
        mode: '',

        ename: '',
        erelation: '',
        ephone: ''

    })

    const handleInputChange = (e) =>{
        const {name,value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                        // Attach logged-in userId from localStorage (if any)
                        const stored = localStorage.getItem('hms_user');
                        if (!stored) {
                            alert('You must be logged in to submit an appointment. Please go back and login/register.');
                            return Navigate('/booking');
                        }
                        const { userId } = JSON.parse(stored);
                        const payload = { ...formData, userId };

                        // Send formData to backend
                        const res = await fetch('http://localhost:5000/api/appointments', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload),
                        });

                if (!res.ok) throw new Error('Failed to submit appointment');

                const data = await res.json();
                console.log('Server response:', data);
                alert('Appointment submitted successfully!');
                // optionally reset form or navigate
                setFormData({
                    name: '',
                    gender: '',
                    dob: '',
                    age: '',
                    phone: '',
                    email: '',
                    adhaar: '',
                    symptoms: '',
                    preference: '',
                    mode: '',
                    ename: '',
                    erelation: '',
                    ephone: ''
                });
                setPrev(1);
            } catch (err) {
                console.error(err);
                alert('There was a problem submitting your appointment. Please try again later.');
            }
        }

    const handleNext = (e) => {
        e.preventDefault();
        setPrev(prev + 1);
    };

    const handlePrev = (e) => {
        e.preventDefault();
        setPrev(prev - 1);
    };

    return(
        <div className="BookPage">
            <nav>
                <div className ="BNav-left">
                    <t><b>HEALTH CARE</b></t>
                </div>
                <div className = "BNav-right">
                    <button className="BNav-button" onClick = {()=>Navigate('/')}>HOME</button>
                </div>
            </nav>

            <div className = "BContainer">

                <video className="BVideo" autoPlay loop muted>
                    <source src="/BookPage.mp4" type="video/mp4" />
                </video>

                <div className="Bform">
                    <div className="B-content">
                    <div className="B-heading">
                       {prev ==1 && <h2>Your Personal Details</h2> }
                       {prev == 2 && <h2>Your Appointment Details</h2>}
                       {prev == 3 && <h2>Emergency Contact Details</h2>}
                    </div>
                    <form className="Form" onSubmit={handleSubmit}>
                    {prev ===1 && <div className="B-section">
                        
                            <div className="input-group">
                            <label className="Name">Your Name: </label>

                            <input
                             type="text"
                             name = "name"
                             placeholder="Enter your full name"
                             value={formData.name}
                             onChange={handleInputChange}
                             required />
                             </div>
                             
                             <div className="input-group">
                             <label className="gender">Your Gender: </label>

                             <input
                             type = "radio"
                             name = "gender"
                             value = "male"
                             checked={formData.gender === "male"}
                             onChange={handleInputChange}
                             required /> <span>Male</span>

                             <input
                             type = "radio"
                             name = "gender"
                             value = "female"
                             checked={formData.gender === "female"}
                             onChange={handleInputChange}
                             required /> <span>Female</span>

                             </div>

                             <div className = "input-group">

                                <label className="dob">Date of Birth: </label>
                                <input
                                 type="date"
                                 name="dob"
                                 value={formData.dob}
                                 onChange={handleInputChange}
                                 required />

                             </div>

                             <div className="input-group">
                                <label className="age">Your Age: </label>
                                <input
                                 type="number"
                                 name="age"
                                 placeholder="Enter your age"
                                 value={formData.age}
                                 onChange={handleInputChange}
                                 required />

                             </div>

                             <div className="input-group">
                                <label className="phone">Phone Number: </label>
                                <input
                                 type="tel"
                                 name="phone"
                                 placeholder="Enter your phone number"
                                 value={formData.phone}
                                 onChange={handleInputChange}
                                 required />

                             </div>

                             <div className="input-group">
                                <label className="email">Your Email Id: </label>
                                <input
                                 type="email"
                                 name="email"
                                 placeholder="Enter your email id"
                                 value={formData.email}
                                 onChange={handleInputChange}
                                 required />
                                 </div>

                                 <div className="input-group">
                                    <label className = "adhaar">Aadhaar Number: </label>
                                    <input
                                     type="text"
                                     name="adhaar"
                                     placeholder="Enter your aadhaar number"
                                     value={formData.adhaar}
                                     onChange={handleInputChange}
                                     required />
                                 </div>
                                 
                        </div>
}
                    {prev ===2 && <div className="B-section">
                        <div className = "input-group">

                                <label className="symptoms">Reason for Visit: </label>
                                <textarea 
                                 id = "symptoms"
                                 name="symptoms"
                                 rows = "3"
                                 cols = "20"
                                 value={formData.symptoms}
                                 onChange={handleInputChange}
                                 required />

                             </div>

                             <div className="input-group">
                                <label className="preference">Preferred Date: </label>
                                <input
                                 type="date"
                                 name="preference"
                                 value={formData.preference}
                                 onChange={handleInputChange}
                                 required />

                             </div>

                             <div className="input-group">
                                <label className="mode">Mode of Appointment: </label>
                                <input
                                 type="radio"
                                 name="mode"
                                 value="online"
                                 checked={formData.mode === "online"}
                                 onChange={handleInputChange}
                                 required />

                                 <span>Online</span>
                                 <input
                                 type="radio"
                                 name="mode"
                                 value="offline"
                                 checked={formData.mode === "offline"}
                                 onChange={handleInputChange}
                                 required />
                                 <span>Offline</span>

                             </div>
                        </div>
                    }

                    {
                        prev === 3 && <div className="B-section">
                            <div className="input-group">
                                <label className="ename">Emergency Contact Name: </label>
                                <input
                                 type="text"
                                 name="ename"
                                 value={formData.ename}
                                 onChange={handleInputChange}
                                 required />
                             </div>

                             <div className="input-group">
                                <label className="erelation">Relation with Emergency Contact: </label>
                                <input
                                 type="text"
                                 name="erelation"
                                 value={formData.erelation}
                                 onChange={handleInputChange}
                                 required />
                             </div>

                             <div className="input-group">
                                <label className="ephone">Emergency Contact Phone Number: </label>
                                <input
                                 type="tel"
                                 name="ephone"
                                 value={formData.ephone}
                                 onChange={handleInputChange}
                                 required />
                             </div>
                             </div>

                    }
                    
                    

                    <div className="B-footer">
                        {prev > 1 &&
                        <button type ="button" className="End-button" onClick={handlePrev}>PREVIOUS</button>
}
                        {prev < 3 ? (
                        <button type="button" className="End-button" onClick={handleNext}>NEXT</button>
                        ):(
                            <button type="submit" className="End-button">
                                SUBMIT
                            </button>
                        )}

                    </div>
                    </form>
                    </div>
                    
                    </div>
                

            </div>
        </div>
    )
}

export default BookPage;
