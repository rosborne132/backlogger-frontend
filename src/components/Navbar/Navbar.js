import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import TokenService from '../../services/token-service'

const Nav = styled.nav`
    position: relative;
    min-height: 50px;
    padding: 0.1% 0;
    background-color: #000;

    ul {
        display: flex;
        list-style: none;
    }
`

const NavLink = styled.li`
    display: inline;
    padding: 0 1%;

    a {
        color: #fff;
        text-decoration: none;
        font-size: calc(14px + 0.5vw);
    }

    a:hover {
        cursor: pointer;
        color: rgb(139, 139, 139);
    }
`

const handleLogoutClick = () => {
    TokenService.clearAuthToken()
    this.props.history.push('/')
}

const renderLogoutLink = () => {
    return (
      <NavLink>
        <Link
          onClick={handleLogoutClick}
          to='/'>
          Logout
        </Link>
      </NavLink>
    )
}

const renderLoginLink = () => {
    return (
        <>
            <NavLink><Link to='/login'>Login</Link></NavLink>
            <NavLink><Link to='/register'>Signup</Link></NavLink>
        </>
    )
}



const Navbar = () => {
    return (
        <>
            <Nav role="navigation">
                <ul>
                    {TokenService.hasAuthToken()
                        ? renderLogoutLink()
                        : renderLoginLink()}
                </ul>
            </Nav>
        </>
    )
}

export default Navbar