var express = require('express');
var app     = express();
const mongoose = require("mongoose");

require("dotenv").config();

const admin = requiere('./admin');
var cors    = require('cors');

app.listen(3000, () => console.log("Server is running"));

mongoose.connect(
    process.env.MONGODB_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

/*
// Verify token at the root route
app.get('/auth', function(req, res){
    // Read toj¡ken from header
    const idToken = req.header.authorization
    console.log('header: ', idToken);

    // Verify token
    admin.auth().verifyIdToken(idToken)
        .then(function(decodedToken){
            console.log('decodedToken: ', decodedToken);
            res.send('Authentication Success!');
        }).catch(function(error){
            console.log('error: ', error);
            res,send('Authentication Fail!')
        });
})


require("dotenv").config({ path: "./config.env"});
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});


*
// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());


// create user account
app.get('/account/create/:name/:email/:password', function (req, res) {

    // check if account exists
    dal.find(req.params.email).
        then((users) => {

            // if user exists, return error message
            if(users.length > 0){
                console.log('User already in exists');
                res.send('User already in exists');    
            }
            else{
                // else create user
                dal.create(req.params.name,req.params.email,req.params.password).
                    then((user) => {
                        console.log(user);
                        res.send(user);            
                    });            
            }

        });
});


// login user 
app.get('/account/login/:email/:password', function (req, res) {

    dal.find(req.params.email).
        then((user) => {

            // if user exists, check password
            if(user.length > 0){
                if (user[0].password === req.params.password){
                    res.send(user[0]);
                }
                else{
                    res.send('Login failed: wrong password');
                }
            }
            else{
                res.send('Login failed: user not found');
            }
    });
    
});

// find user account
app.get('/account/find/:email', function (req, res) {

    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {

    dal.findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});


// update - deposit/withdraw amount
app.get('/account/update/:email/:amount', function (req, res) {

    var amount = Number(req.params.amount);

    dal.update(req.params.email, amount).
        then((response) => {
            console.log(response);
            res.send(response);
    });    
});

// all accounts
app.get('/account/all', function (req, res) {

    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});

//var port = 3000;
app.listen(port);
console.log('Running on port: ' + port);*/