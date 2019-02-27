var express = require('express');
var firebase = require('firebase');
require("firebase/firestore");
var app = express();
var bodyParser = require('body-parser');
var authRoutes = require('./routes/auth');
var testRoutes = require('./routes/test');
var admin = require("firebase-admin");
var serviceAccount = require("../aprova-ja-firebase-adminsdk-g94dd-5895fff65e.json");

var config = {
  apiKey: "AIzaSyAF06Tw03EQt-7jFcIlNhQ-rcR37SJSBC8",
  authDomain: "aprova-ja.firebaseapp.com",
  databaseURL: "https://aprova-ja.firebaseio.com",
  projectId: "aprova-ja",
  storageBucket: "aprova-ja.appspot.com",
  messagingSenderId: "26595561479"
};

firebase.initializeApp(config);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://aprova-ja.firebaseio.com"
});

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

var instrutoresRoutes = require('./routes/instrutores');
var alunosRoutes = require('./routes/alunos');

app.use('/', testRoutes);
app.use('/auth', authRoutes);
app.use('/instrutores', instrutoresRoutes);
app.use('/alunos', alunosRoutes);

app.listen(3000);
