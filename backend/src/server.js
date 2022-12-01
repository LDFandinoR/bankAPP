require('dotenv').config();
var express = require('express');
const morgan = require('morgan');
const path = require('path')
const router = express.Router();
var cors    = require('cors');
 

// initialization
var app     = express();

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
//app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());



// Global variables 

// Routes
app.use(require('./routes/user'));



//app.use(require('./routes/users.routes'));










// Static files
//app.use(express.static(path.join(__dirname, "public")))

//11 app.set("views", path.join(__dirname, 'views')); // to render viwes, I am not sure how to apply this to my project,
// I think this could be with the public folder generate form create react app, NOT completely sure

//16 app.use(express.urlencoded({extended: false})); // Decirle al servidor q convieta los datos que llegan a traves de cualquier tipo de metodo en un objeto JSON



module.exports = app;