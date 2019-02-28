var firebase = require('firebase');
var validator = require('validator');
var db = firebase.firestore();

exports.create = (req, res) => {

    var email = req.body.email;
    var password = req.body.password;
    var nome = req.body.nome;
    var cpf = req.body.cpf;
    var descricao = req.body.descricao;
    var telefone = req.body.telefone;
    var categorias = req.body.categorias;
    var taxa = req.body.taxa;

    // Validates inputs
    if(!validator.isEmail(email) || validator.isEmpty(email) || validator.isEmpty(password) || !validator.isLength(password, {min: 6, max: 32})) {
        res.status(422).json({error: {
            code: 422,
            message: "Invalid fields"
        }});
    } else {
        // Creates user with email and password
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(data) {
            
            db.collection('instrutores').add({
                nome: nome,
                email: data.user.email,
                cpf: cpf,
                descricao: descricao,
                telefone: telefone,
                categorias: categorias,
                taxa: taxa,
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

exports.index = (req, res) => {
    var categoria = req.query.categoria;


    if(categoria) {
        db.collection("instrutores").where("categorias", "array-contains", categoria)
        .get()
        .then(function(querySnapshot) {
            var results = [];

            querySnapshot.forEach(function(doc) {
                results.push(doc.data());
            });

            res.status(200).json({data: results});
        })
        .catch(function(error) {
            res.status(500).error({error: error});
        });
    } else {
        db.collection("instrutores")
        .get()
        .then(function(querySnapshot) {
            var results = [];

            querySnapshot.forEach(function(doc) {
                results.push(doc.data());
            });

            res.status(200).json({data: results});
        })
        .catch(function(error) {
            res.status(500).error({error: error});
        });
    }
    
}

exports.show = (req, res) => {
    var id = req.params.id;

    db.collection("instrutores").doc(id)
        .get()
        .then(function(doc) {
            res.status(200).json({data: doc.data()});
        })
        .catch(function(error) {
            res.status(500).json({error: error});
        });
}