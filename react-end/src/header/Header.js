import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

const authenticatedOptions = (
  <React.Fragment className="nav justify-content-end">
    <Link className="nav-link" to="/change-password">Change Password</Link>
    <Link className="nav-link" to="/sign-out">Sign Out</Link>
      <Link className="nav-link" to="/map/add">Add mosque</Link>
      <Link className="nav-link" to="/user_page">My Page</Link>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment className="nav justify-content-end">
    <Link className="nav-link" to="/sign-up">Sign Up</Link>
    <Link className="nav-link" to="/sign-in">Sign In</Link>
    <Link className="nav-link" to="/map/view">View mosques</Link>
  </React.Fragment>
)

const alwaysOptions = (
  <React.Fragment>
    <Link to="/">Home</Link>
  </React.Fragment>
)

const Header = ({ user }) => (
  <header className="main-header">
    <nav className="navbar navbar-dark bg-dark">
      { user && <span>Welcome, {user.email}</span>}
      { user ? authenticatedOptions : unauthenticatedOptions }
      { alwaysOptions }
    </nav>
  </header>
)

export default Header
