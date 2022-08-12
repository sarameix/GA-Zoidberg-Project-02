///////////////////////////////////////
// REQUIRE EXPRESS AND SET UP ROUTER //
///////////////////////////////////////

const express = require('express');
const router = express.Router();

////////////
// MODELS //
////////////

const Chef = require('../models/chefs.js');
const Recipe = require('../models/recipes.js');
const recipeSeed = require('../models/recipes_seed.js');

////////////
// ROUTES //
////////////

// Get Recipes Index Route
router.get('/', (req, res)=>{
	Recipe.find({}, (err, foundRecipes)=>{
		res.render('recipes/index.ejs', {
			recipes: foundRecipes,
            pageTitle: "Our Recipes"
		});
	})
});

// Get Recipes Seed Route
router.get('/seed', (req, res)=>{
    Recipe.create(
        recipeSeed, 
        (error, data) => {
            res.redirect('/');
        }
    );
});

///////////////////////
// EXPORT CONTROLLER //
///////////////////////

module.exports = router;