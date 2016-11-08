import React from 'react';
import ReactDOM from 'react-dom';

var config = {
  apiKey: "AIzaSyCisMc23Sh_xfshqRLo2F8M3ia70KTovac",
  authDomain: "hogwarts-49243.firebaseapp.com",
  databaseURL: "https://hogwarts-49243.firebaseio.com",
  storageBucket: "hogwarts-49243.appspot.com",
  messagingSenderId: "474309759478"
};
firebase.initializeApp(config);



class App extends React.Component {
  constructor(props) {
    super(props);
    this.createUser = this.createUser.bind(this);
    this.getUser = this.getUser.bind(this);
    this.state = {
      signedIn: false
    };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          signedIn: true
        });
      } else {
        this.setState({
          signedIn: false
        });
      }
    });
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

  createUser(e) {
    e.preventDefault();
    const email = this.createEmail.value;
    const password = this.createPassword.value;

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error){
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Error Code: ${errorCode}. Message: ${errorMessage}`);
    });
  }

  loginUser(e) {
    e.preventDefault();
    const email = this.loginEmail.value;
    const password = this.loginPassword.value;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Error Code: ${errorCode}. Message: ${errorMessage}`);
    });
  }

  signOutUser(e) {
    e.preventDefault();
    firebase.auth().signOut().then(function() {
      alert('User signed out.');

    }, function(error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Error Code: ${errorCode}. Message: ${errorMessage}`);
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.createUser.call(this, e)}>
          <h1>Create A New User</h1>
          <input type="text" placeholder="Enter email" ref={ref => this.createEmail = ref} />
          <input type="text" placeholder="Enter password" ref={ref => this.createPassword = ref} />
          <button type="submit">Create User</button>
        </form>
        <form onSubmit={(e) => this.loginUser.call(this, e)}>
          <h1>Login</h1>
          <input type="text" placeholder="Enter email" ref={ref => this.loginEmail = ref} />
          <input type="text" placeholder="Enter password" ref={ref => this.loginPassword = ref} />
          <button type="submit">Login</button>
        </form>
        <form onSubmit={(e) => this.signOutUser.call(this, e)}>
          <h1>Signout</h1>
          <button type="submit">Sign Out</button>
        </form>
        {this.getUser()}
        <p>User is currently signed {this.state.signedIn ? 'in' : 'out'}</p>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
