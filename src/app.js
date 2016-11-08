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
      signedIn: false,
      users: []
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
    firebase.database().ref(`users`)
      .on('value', (res) => {
        const userArray = [];
        const userData = res.val();
        for (let key in userData) {
          console.log(userData);
          userArray.push(userData[key]);
        }
        this.setState({
          users: userArray
        });
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

  determineHouse() {
    const houses = ['Gryffindor', 'Hufflepuff', 'Slytherin', 'Ravenclaw'];
    const random = Math.floor(Math.random() * houses.length);

    return houses[random];
  }

  createUser(e) {
    e.preventDefault();
    const email = this.createEmail.value;
    const password = this.createPassword.value;

    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      const user = firebase.auth().currentUser;
      const username = user.email.split("@")[0];
      const house = this.determineHouse();
      const dbRef = firebase.database().ref(`users`);
      dbRef.push({username, house});
    })
    .catch(function(error){
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
        <div>
          <h2>Created Users</h2>
          <ul>
          {}
          {this.state.users.map((user, i) => <li key={i}>{user.username} - {user.house}</li>)}
          </ul>
        </div>
        {this.getUser()}
        <p>User is currently signed {this.state.signedIn ? 'in' : 'out'}</p>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
