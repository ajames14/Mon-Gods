import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../lib/auth'

class Navbar extends React.Component {

  constructor() {
    super()
    this.state = {
      isOpen: false
    }
  }

  handleLogout() {
    Auth.logout()
  }

  toggleNavbar() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ isOpen: false })
    }
  }

  render() {
    return <div className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">Swell</Link>
          <a
            role="button"
            className={`navbar-burger burger ${this.state.isOpen ? 'is-active' : ''}`}
            onClick={() => this.toggleNavbar()}
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className={`navbar-menu ${this.state.isOpen ? 'is-active' : ''}`}>
          <div className="navbar-end">
            <div className="navbar-item">
              <Link className="navbar-item" to="/spots">All Surf Spots</Link>
            </div>
            {Auth.isAuthorized() && <div className="navbar-item">
              <Link className="navbar-item" to="/newspot">Share your favourite spot</Link>
            </div>}
            <div className="navbar-item">
              <Link className="navbar-item" to="/register">Register</Link>
            </div>
            <div className="navbar-item">
              <Link className="navbar-item" to="/login">Login</Link>
            </div>
            {Auth.isAuthorized() && <div className="navbar-item" onClick={() => this.handleLogout()}>
              <Link className="navbar-item" to="/">Logout</Link>
            </div>}
          </div>
        </div>
      </div>
    </div>
  }

}

export default withRouter(Navbar)