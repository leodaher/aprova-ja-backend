var admin = require("firebase-admin");

function isAuthenticated(req, res, next) {
    var idToken = req.query.token;

    if(idToken == null) {
        return res.status(401).json({error: {code: "auth/no-token", message: "No token was provided."}});
    } else {
        admin.auth().verifyIdToken(idToken)
        .then(function(decodedToken) {
            var uid = decodedToken.uid;
            res.locals.uid = uid;
            return next();
        }).catch(function(error) {
            // Handle error
            return res.status(401).json({error: error});
        });
    }
}

module.exports = isAuthenticated;