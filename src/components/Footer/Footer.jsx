import React from 'react'
import { Link } from 'react-router'

function Footer() {
  return (
     <>
      <footer className="w-full bg-[#000000] text-[#FFFFFF] flex flex-col items-center justify-center h-24">
        {/*footer nav section */}
        <nav className="nav flex justify-center space-x-5 items-center w-full">
          <ul className="company mb-2 flex flex-col text-center"> <li className="font-medium">COMPANY</li>
            <li className="features hover:text-[#FCA311] cursor-pointer"><Link to="/features">FeaTures</Link></li></ul>

           <ul className="support mb-2 flex flex-col text-center"> <li className="font-medium">SUPPORT</li>
            <li className="contact hover:text-[#FCA311] cursor-pointer"><Link to='/contact'>Contact us</Link></li></ul>  
          </nav>
        
        {/* Copyright section */}
        <div className="copyright w-full text-center">©Copyright 2025. All Rights Reserved by Pratyush</div>
      </footer>
    </>
  )
}

export default Footer