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

// Used to serve static files from public directory
app.use(express.static('public'));
app.use(cors(
  {
    origin: process.env.ALLOWED_ORIGINS
  }
));

// Middlewares
//app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());


// Routes
app.use(require('./routes/user'));

module.exports = app;