import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import TokenService from '../../services/token-service'
import UserContext from '../../context/UserContext'

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
    padding: 0 2%;

    a {
        color: #fff;
        text-decoration: none;
        font-size: calc(14px + 0.5vw);
    }

    a:hover {
        cursor: pointer;
        color: rgb(139, 139, 139);
    }

    @media only screen and (max-width: 350px) {
        padding: 0 4%;
    }
`

class Navbar extends Component {
    static contextType = UserContext
    
    handleLogoutClick = () => {
        TokenService.clearAuthToken()
        this.props.history.push('/')
    }
    
    renderLogoutLink = () => {
        return (
          <NavLink style={{marginLeft: "-30px"}}>
            <Link
              onClick={this.handleLogoutClick}
              to='/'>
              Logout
            </Link>
          </NavLink>
        )
    }
    
    renderLoginLink = () => {
        return (
            <>
                <NavLink style={{marginLeft: "-30px"}}><Link to='/login'>Login</Link></NavLink>
                <NavLink><Link to='/register'>Signup</Link></NavLink>
            </>
        )
    }

    render() {
        const { isLoggedIn } = this.context
        return (
            <Nav role="navigation">
                <ul>
                    {TokenService.hasAuthToken() || isLoggedIn
                        ? this.renderLogoutLink()
                        : this.renderLoginLink()}
                </ul>
            </Nav>
        )
    }
}

export default Navbar