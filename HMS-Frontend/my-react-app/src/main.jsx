import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './HOME/home/Home.jsx'
import Booking from './BOOKING/booking/Booking.jsx'
import Ad from './HOME/login/admin_login/Ad.jsx'
import AdminLogin from './HOME/login/admin_login/AdminLogin.jsx'
import Doc from './HOME/login/doctor_login/Doc.jsx'
import Doctors from './HOME/login/admin_login/Doctors.jsx'
import TobeAccepted from './HOME/login/doctor_login/TobeAccepted.jsx'
import Messages from './HOME/login/admin_login/Messages.jsx'
import Treated from './HOME/login/admin_login/Treated.jsx'
import Accepted from './HOME/login/doctor_login/Accepted.jsx'
import Profile from './HOME/login/admin_login/Profile.jsx'
import ProfileD from './HOME/login/doctor_login/ProfileD.jsx'
import Contact from './HOME/contact/Contact.jsx'
import Ab from './HOME/about/Ab.jsx'
import MessagesD from './HOME/login/doctor_login/MessagesD.jsx'
import BookPage from './BOOKING/bookit/BookPage.jsx'
import TBT from './HOME/Tobetreated/TBT.jsx'
import Login from './HOME/auth/Login.jsx'
import Register from './HOME/auth/Register.jsx'
import DoctorLogin from './HOME/auth/DoctorLogin.jsx'
import Appoint from './HOME/Tobetreated/Appoint.jsx'
import Chat from './BOOKING/chat/Chat.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
  <Route path="/admin" element={<Ad />} />
  <Route path="/admin-login" element={<AdminLogin />} />
  <Route path ="/doc" element ={<Doc />} />
  <Route path ="/Doctors" element ={<Doctors />} />
  <Route path ="/tobeA" element ={<TobeAccepted />} />
  <Route path ="/Accepted" element ={<Accepted />} />
  <Route path ="/Messages" element ={<Messages />} />
  <Route path ="/Treated" element ={<Treated />} />
  <Route path ="/Profile" element ={<Profile />} />
        <Route path ="/contact" element ={<Contact />} />
  <Route path ="/ProfileD" element ={<ProfileD />} />
  <Route path ="/MessagesD" element ={<MessagesD />} />
        <Route path = "/about" element = {<Ab />} />
       <Route path = "/book" element = {<BookPage />} /> 
    <Route path = "/Tobetreated" element = {<TBT />} />
    <Route path = "/chat" element = {<Chat />} />
  <Route path = "/login" element = {<Login />} />
  <Route path = "/register" element = {<Register />} />
    <Route path = "/doctor-login" element = {<DoctorLogin />} />
    <Route path = "/appoint/:id" element = {<Appoint />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
