var config = {
  apiKey: "AIzaSyCisMc23Sh_xfshqRLo2F8M3ia70KTovac",
  authDomain: "hogwarts-49243.firebaseapp.com",
  databaseURL: "https://hogwarts-49243.firebaseio.com",
  storageBucket: "hogwarts-49243.appspot.com",
  messagingSenderId: "474309759478"
};

firebase.initializeApp(config);

module.exports = {

  loggedIn() {
    firebase.auth().onAuthStateChanged((user) => {
      return !!user;
    });
  },

  createUser(e) {
    e.preventDefault();
    const email = this.createEmail.value;
    const password = this.createPassword.value;

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error){
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Error Code: ${errorCode}. Message: ${errorMessage}`);
    });
  },

  loginUser(e, success) {
    e.preventDefault();
    const email = this.loginEmail.value;
    const password = this.loginPassword.value;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Error Code: ${errorCode}. Message: ${errorMessage}`);
    });
  },


  signOutUser(e) {
    // e.preventDefault();
    firebase.auth().signOut().then(function() {
      alert('User signed out.');

    }, function(error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Error Code: ${errorCode}. Message: ${errorMessage}`);
    });
  }




};
