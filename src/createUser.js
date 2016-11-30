import React from 'react';
import auth from './auth';

class CreateUser extends React.Component {

  constructor(props) {
    super(props);
    this.createUser = auth.createUser.bind(this);
  }

  render() {
    return (
      <form onSubmit={(e) => this.createUser.call(this, e)}>
        <h1>Create A New User</h1>
        <input type="text" placeholder="Enter email" ref={ref => this.createEmail = ref} />
        <input type="text" placeholder="Enter password" ref={ref => this.createPassword = ref} />
        <button type="submit">Create User</button>
      </form>
    )
  }
}

module.exports = CreateUser;
