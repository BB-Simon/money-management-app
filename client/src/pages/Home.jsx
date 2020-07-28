import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "../store/actions/authAction";

class Home extends Component {
  render() {
    return (
      <div className="sub-main">
        <h1>Manage your money with our daily budget planner</h1>
        <p>
          To get you started, we automatically suggest budget goals for you
          based on your spending. Then you can create and adjust budget goals as
          you go.
        </p>
        {this.props.auth.isAuthenticated ? (
          <button
            className="loginBtn"
            onClick={() => this.props.logout(this.props.history)}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="logoutBtn"> Login Free </button>
          </Link>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Home);
