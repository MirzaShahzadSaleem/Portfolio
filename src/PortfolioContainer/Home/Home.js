import React from 'react'
import Profile from './Profile'
import Footer from './Footer/Footer'
import Navbar from './Navbar'
import './Home.css'

export default function Home() {
  return (
    <div className='home-container'>
    <Navbar />
    <Profile/>
    <Footer/>
   
    </div>
  )
}
