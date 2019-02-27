var firebase = require('firebase');
var validator = require('validator');

exports.login = (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    // Validates inputs
    if(!validator.isEmail(email) || validator.isEmpty(email) || validator.isEmpty(password) || !validator.isLength(password, {min: 6, max: 32})) {
        res.status(422).json({error: {
            code: 422,
            message: "Invalid fields"
        }});
    } else {

        // Signs in the user
        firebase.auth().signInWithEmailAndPassword(email, password).
        then(function(data) {
            firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
                // Send token to your backend via HTTPS
                // ...
                res.status(200).json({data: data, token: idToken});
              }).catch(function(error) {
                // Handle error
              });
            
        }).catch(function(error) {
            res.status(401).json({error: error});
        });
    }
}

exports.logout = (req, res) => {
    firebase.auth().signOut().then(function(data) {
        res.status(200).json({data: data});
    }).catch(function(error) {
        res.status(200).json({error: error});
    })
}