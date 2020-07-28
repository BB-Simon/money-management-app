import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { login } from "../store/actions/authAction";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: {},
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      JSON.stringify(nextProps.auth.error) !== JSON.stringify(prevState.error)
    ) {
      return {
        error: nextProps.auth.error,
      };
    }
    return null;
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.login(
      {
        email: this.state.email,
        password: this.state.password,
      },
      this.props.history
    );
  };

  render() {
    let { email, password, error } = this.state;
    return (
      <div className="container card my-5 py-5 text-dark">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1 className="display-5">Login Here</h1>
            <form onSubmit={this.submitHandler}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  className={
                    error.email ? "form-control is-invalid" : "form-control"
                  }
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  id="email"
                  value={email}
                  onChange={this.changeHandler}
                />
                {error.email && (
                  <div className="invalid-feedback">{error.email}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  className={
                    error.password ? "form-control is-invalid" : "form-control"
                  }
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  id="password"
                  value={password}
                  onChange={this.changeHandler}
                />
                {error.password && (
                  <div className="invalid-feedback">{error.password}</div>
                )}
              </div>
              <Link to="/register">Don't have an account? Register Here</Link>
              <button className="btn btn-primary d-block my-3">Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(Login);
