import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    return (
        <>
            <nav role="navigation">
                <ul>
                    <li><Link to ='/login'>Login</Link></li>
                    <li><Link to ='/register'>Signup</Link></li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar;