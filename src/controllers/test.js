var firebase = require('firebase');

exports.main = (req, res) => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          res.send(user.email);
        
          // ...
        } else {
          // User is signed out.
          // ...
          res.send("Not logged in");
        }
      });
}