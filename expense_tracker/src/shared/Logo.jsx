import React from 'react'
import { Link } from 'react-router-dom'
import logoImage from '../assets/logo.png'  // Import the image
import '../App.css'

const Logo = () => {
    return (
        <Link to='/' className="flex items-center">
            <img src={logoImage} alt="Company Logo" className="imageClass h-8 w-auto rounded" />
        </Link>
    )
}

export default Logo