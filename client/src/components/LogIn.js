import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class LogIn extends Component {
  onSubmit = values => {
    this.props.onLogin(values, this.props.history);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <label>Email</label>
          <Field type="text" name="email" component="input" />
          <label>Password</label>
          <Field type="text" name="password" component="input" />
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button className="teal btn-flat right white-text" type="submit">
            Login
          </button>
        </form>
        <hr />
        <Link to="/signUp" className="teal btn-flat white-text">
          Sign up
        </Link>
      </div>
    );
  }
}

export default withRouter(connect(null, actions)(
  reduxForm({
    form: 'logInForm'
  })(LogIn)
));
