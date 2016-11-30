import React from 'react';
import auth from './auth';

class SignIn extends React.Component {
  constructor(props) {
      super(props);
      this.loginUser = auth.loginUser.bind(this);
  }

  render() {
    return (
      <form onSubmit={(e) => this.loginUser.call(this, e)}>
        <h1>Login</h1>
        <input type="text" placeholder="Enter email" ref={ref => this.loginEmail = ref} />
        <input type="text" placeholder="Enter password" ref={ref => this.loginPassword = ref} />
        <button type="submit">Login</button>
      </form>
    )
  }
}

module.exports = SignIn;
