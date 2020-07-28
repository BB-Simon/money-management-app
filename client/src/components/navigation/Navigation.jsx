import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

import { connect } from "react-redux";

class Navigation extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <Link to="/">
            <span className="navbar-brand">Money App</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <NavLink to="/" activeClassName="active" exact>
                  <span className="nav-link"> Home</span>
                </NavLink>
              </li>
              {this.props.auth.isAuthenticated ? (
                <React.Fragment>
                  <li className="nav-item active">
                    <NavLink to="/dashboard" activeClassName="active">
                      <span className="nav-link"> Dashboard</span>
                    </NavLink>
                  </li>
                  <li className="nav-item active">
                    <NavLink to="/" activeClassName="active">
                      <span className="nav-link"> Logout</span>
                    </NavLink>
                  </li>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <li className="nav-item active">
                    <NavLink to="/login" activeClassName="active">
                      <span className="nav-link"> Login</span>
                    </NavLink>
                  </li>
                  <li className="nav-item active">
                    <NavLink to="/register" activeClassName="active">
                      <span className="nav-link"> Sign Up</span>
                    </NavLink>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Navigation);
