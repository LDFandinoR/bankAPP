const admin = require('./admin');

// Verify token at the root route
function verifyToken( req, res, next ) {

    // Read token from header
    const idToken = req.headers.authorization;
    console.log("idToken", idToken)
    // Verify token
    admin.auth().verifyIdToken(idToken)
        .then(() => {
            next();
        }).catch(function(error){
            console.log('error: ', error);
            res,send('Authentication Fail!')
        });
}


exports.verifyToken = verifyToken;
