import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../store/actions/authAction";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    let { name, email, password, confirmPassword } = this.state;
    this.props.register(
      { name, email, password, confirmPassword },
      this.props.history
    );
  };

  render() {
    let { name, email, password, confirmPassword, error } = this.state;
    return (
      <div className="container card my-5 py-5 text-dark">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1 className="display-5">Register Here</h1>
            <form onSubmit={this.submitHandler}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  className={
                    error.name ? "form-control is-invalid" : "form-control"
                  }
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  id="name"
                  value={name}
                  onChange={this.changeHandler}
                />
                {error.name && (
                  <div className="invalid-feedback">{error.name}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="email">email</label>
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
                <label htmlFor="password">password</label>
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
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  className={
                    error.confirmPassword
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={this.changeHandler}
                />
                {error.confirmPassword && (
                  <div className="invalid-feedback">
                    {error.confirmPassword}
                  </div>
                )}
              </div>
              <Link to="/login">Already have an account? Login Here</Link>
              <button className="btn btn-primary d-block my-3">Register</button>
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

export default connect(mapStateToProps, { register })(Register);
