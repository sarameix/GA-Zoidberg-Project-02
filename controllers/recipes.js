///////////////////////////////////////
// REQUIRE EXPRESS AND SET UP ROUTER //
///////////////////////////////////////

const express = require('express');
const router = express.Router();

////////////
// MODELS //
////////////

const Chef = require('../models/chefs.js');
const Recipe = require('../models/recipes.js')

////////////
// ROUTES //
////////////

///////////////////////
// EXPORT CONTROLLER //
///////////////////////

module.exports = router;