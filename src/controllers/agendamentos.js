var firebase = require('firebase');
var db = firebase.firestore();

exports.create = (req, res) => {
    var aluno_id = req.body.aluno_id;
    var instrutor_id = req.body.instrutor_id;
    var data = req.body.data;
    var horario = req.body.horario;
    var link = req.body.link;

    db.collection("agendamentos").add({
        aluno_id: aluno_id,
        instrutor_id: instrutor_id,
        data: data,
        horario: horario,
        link: link
    }).then(function(docRef) {
        docRef.get().then(function(doc) {
            res.status(201).json({data: doc.data()});
        })
    }).catch(function(error) {
        res.status(500).json({error: error});
    });
}

exports.index = (req, res) => {

}

exports.show = (req, res) => {
    var id = req.params.id;

    db.collection("agendamentos").doc(id)
        .get()
        .then(function(doc) {
            res.status(200).json({data: doc.data()});
        })
        .catch(function(error) {
            res.status(500).json({error: error});
        })
}