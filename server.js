//////////////////
// DEPENDENCIES //
//////////////////

const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connection;
require('dotenv').config();

//////////
// PORT //
//////////

// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

/////////////////////////
// DATABASE CONNECTION //
/////////////////////////

// How to Connect to the Database Either Via Heroku or Locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo
mongoose.connect(MONGODB_URI);

// Error and Success Messages
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

////////////////
// MIDDLEWARE //
////////////////

// Use Public Folder for Static Assets
app.use(express.static('public'));

// Populates req.body with Parsed Info from Forms
// If No Data from Forms, Will Return an Empty Object
// extended: false - Does Not Allow Nested Objects in Query Strings
app.use(express.urlencoded({ extended: false }));

// Returns Middleware that Only Parses JSON
// May or May Not Need Depending on Project
app.use(express.json());

// Use Method Override
// Allow POST, PUT and DELETE from a Form
app.use(methodOverride('_method'));

//////////////////////
// CONTROLLER SETUP //
//////////////////////

// Chef Controller
const chefsController = require('./controllers/chefs.js');
app.use('/chefs', chefsController);

// Recipe Controller
const recipesController = require('./controllers/recipes.js');
app.use('/recipes', recipesController);

////////////
// ROUTES //
////////////

// Landing Page -> localhost:3000
app.get('/' , (req, res) => {
  res.render('index.ejs', {
    pageTitle: "Potluck Home"
  });
});

////////////////////
// LISTEN ON PORT //
////////////////////

app.listen(PORT, () => console.log( 'Listening on port:', PORT));

