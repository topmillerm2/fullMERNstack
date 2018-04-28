import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class SignUp extends Component {
  onSubmit = values => {
    this.props.onSignUp(values, this.props.history);
  };

  render() {
    return <div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <label>Email</label>
          <Field type="text" name="email" component="input" />
          <label>Password</label>
          <Field type="text" name="password" component="input" />
          <Link to="/" className="red btn-flat white-text">
            Cancel
          </Link>
          <button className="teal btn-flat right white-text" type="submit">
            Sign Up
          </button>
        </form>
        <hr />
        <Link to="/logIn" className="orange btn-flat white-text">
          Back to Log In
        </Link>
      </div>;
  }
}

export default withRouter(connect(null, actions)(reduxForm({
    form: 'signUpForm'
  })(SignUp)));
