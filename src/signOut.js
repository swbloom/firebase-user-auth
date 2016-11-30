import React from 'react';
import auth from './auth';

class SignOut extends React.Component {

  componentDidMount() {
    auth.signOutUser();
  }

  render() {
    return (
      <p>You are now logged out.</p>
    )
  }
}

module.exports = SignOut;
