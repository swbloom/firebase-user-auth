import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import SignIn from './signIn';
import SignOut from './signOut';
import CreateUser from './createUser';
import Dashboard from './dashboard';
import auth from './auth';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false
    };
  }

  componentWillMount() {
    this.setState({signedIn: auth.loggedIn()});
  }

  getUser() {
    const user = firebase.auth().currentUser;
    if (this.state.signedIn) {
      return (
        <div>
          Logged in as: {user.email}
        </div>
      );
    }
  }

  requireAuth(nextState, replace) {
    if (!this.state.signedIn) {
      replace({
        pathname: '/',
      })
    }
  }

  render() {
    console.log(this.state);
    return (
      <div>
        {this.state.signedIn ? <Link to="/signout">Sign Out</Link> : <SignIn />}
        {!this.state.signedIn && <CreateUser />}
        {this.getUser()}
        <p>User is currently signed {this.state.signedIn ? 'in' : 'out'}</p>
      </div>
    )
  }
}


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="signout" component={SignOut} />
    <Route path="dashboard" component={Dashboard} />
  </Router>
), document.getElementById("app"));
