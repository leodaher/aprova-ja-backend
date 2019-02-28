var firebase = require('firebase');
var validator = require('validator');
var db = firebase.firestore();

exports.create = (req, res) => {

    var email = req.body.email;
    var password = req.body.password;
    var nome = req.body.nome;

    // Validates inputs
    if(!validator.isEmail(email) || validator.isEmpty(email) || validator.isEmpty(password) || !validator.isLength(password, {min: 6, max: 32})) {
        res.status(422).json({error: {
            code: 422,
            message: "Invalid fields"
        }});
    } else {
        // Creates user with email and password
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(data) {
            
            db.collection('alunos').add({
                nome: nome,
                email: data.user.email,
                uid: data.user.uid
            }).then(function(docRef) {
                res.status(201).json({data: data});
            }).catch(function(error) {
                res.status(500).json({error: error});
            });
        }).catch(function(error) {
            if(error.code == "auth/email-already-in-use") {
                res.status(409).json({error: error});
            } else {
                res.status(422).json({error: error});
            }
        });
    }
}

exports.show = (req, res) => {
    var id = req.params.id;

    db.collection("alunos").doc(id)
        .get()
        .then(function(doc) {
            res.status(200).json({data: doc.data()});
        })
        .catch(function(error) {
            res.status(500).json({error: error});
        })
}