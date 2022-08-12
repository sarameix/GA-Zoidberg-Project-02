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

// Delete Individual Recipe Route
router.delete('/:id', (req, res)=>{
    Recipe.findByIdAndRemove(req.params.id, (error, foundRecipe) => {
        res.redirect('/recipes');
    });
});

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

// Get New Recipe Route
router.get('/new', (req, res) => {
	res.render('recipes/new.ejs',
        {
            pageTitle: "Add New Recipe"
        }
    );
});

// Get Individual Recipe Page Route
router.get('/:id', (req, res) => {
	Recipe.findById(req.params.id, (error, foundRecipe) => {
		res.render('recipes/show.ejs', {
			recipe: foundRecipe,
            pageTitle: foundRecipe.name
		});
	});
});

// Get Edit Individual Recipe Page Route
router.get('/:id/edit', (req, res)=>{
	Recipe.findById(req.params.id, (error, foundRecipe) => {
		res.render('recipes/edit.ejs', {
			recipe: foundRecipe,
            pageTitle: "Edit " + foundRecipe.name
		});
	});
});

// Post New Recipe Route
router.post('/', (req, res) => {
    // Re-Formatting Time
    req.body.time = (parseInt(req.body.hours) * 60) + parseInt(req.body.minutes);

    // Reformatting Ingredients and Directions
    const ingredients = [];
    const directions = [];
    for (let key in req.body) {
        if (key.includes("ingredient")) {
            if (req.body[key].length !== 0) {
                ingredients.push(req.body[key]);
            }
            delete req.body[key];
        } else if (key.includes("direction")) {
            if (req.body[key].length !== 0) {
                directions.push(req.body[key]);
            }
            delete req.body[key];
        }
    }

    // Add New Arrays to Body
    req.body.ingredients = ingredients;
    req.body.directions = directions;

    // Removing Unnecessary Attributes
    delete req.body.hours;
    delete req.body.minutes;

    // Create New Chef in Collection and Redirect to Chefs Index
    Recipe.create(req.body, (error, createdRecipe) => {
		res.redirect('/recipes');
	});
});

// Put Update Individual Recipe Route
router.put('/:id', (req, res) => {
    // Re-Formatting Time
    req.body.time = (parseInt(req.body.hours) * 60) + parseInt(req.body.minutes);

    // Reformatting Ingredients and Directions
    const ingredients = [];
    const directions = [];
    for (let key in req.body) {
        if (key.includes("ingredient")) {
            if (req.body[key].length !== 0) {
                ingredients.push(req.body[key]);
            }
            delete req.body[key];
        } else if (key.includes("direction")) {
            if (req.body[key].length !== 0) {
                directions.push(req.body[key]);
            }
            delete req.body[key];
        }
    }

    // Add New Arrays to Body
    req.body.ingredients = ingredients;
    req.body.directions = directions;

    // Removing Unnecessary Attributes
    delete req.body.hours;
    delete req.body.minutes;

    // Find Recipe by ID and Update with req.body
    Recipe.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (error, foundRecipe) => {
		    res.redirect('/recipes/' + foundRecipe._id);
	});
});

///////////////////////
// EXPORT CONTROLLER //
///////////////////////

module.exports = router;