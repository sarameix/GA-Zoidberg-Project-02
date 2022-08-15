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
router.delete('/:id', (req, res) => {
    Recipe.findByIdAndRemove(req.params.id, (error, foundRecipe) => {
        res.redirect('/recipes');
    });
});

// Get Recipes Index Route
router.get('/', (req, res) => {
	// Determine Action Based on Selected Sort Type
	if (req.query.sortBy === "mostRecent") { // Most Recent Recipes
		Recipe.find({}).sort({updatedAt: 1}).exec((err, foundRecipes) => {  
			res.render('recipes/index.ejs', {
				recipes: foundRecipes,
				pageTitle: "Our Recipes",
				select: "recent"
			});
		});
	} else if (req.query.sortBy === "recipeName") { // Alphabetically
		Recipe.find({}).sort({name: 1}).exec((err, foundRecipes) => {  
			res.render('recipes/index.ejs', {
				recipes: foundRecipes,
				pageTitle: "Our Recipes",
				select: "alphabetically"
			});
		});
	} else { // Display Page Regularly if No Sort Option
		Recipe.find({}, (error, foundRecipes) => {
			res.render('recipes/index.ejs', {
				recipes: foundRecipes,
				pageTitle: "Our Recipes",
				select: "none"
			});
		});
	}	
});

// Get New Recipe Route
router.get('/new', (req, res) => {
    Chef.find({}, (error, allChefs)=>{
        res.render('recipes/new.ejs', {
            chefs: allChefs,
            pageTitle: "Add New Recipe"
        });
    });
});

// Get Individual Recipe Page Route
router.get('/:id', (req, res) => {
    Recipe.findById(req.params.id, (error, foundRecipe) => {
        Chef.findOne({'recipes._id':req.params.id}, (error, foundChef) => {
            res.render('recipes/show.ejs', {
                chef: foundChef,
                recipe: foundRecipe,
                pageTitle: foundRecipe.name
            });
        })
    });
});

// Get Edit Individual Recipe Page Route
router.get('/:id/edit', (req, res)=>{
    Recipe.findById(req.params.id, (error, foundRecipe)=>{
		Chef.find({}, (error, allChefs)=>{
			Chef.findOne({'recipes._id':req.params.id}, (error, foundRecipeChef)=>{
				res.render('recipes/edit.ejs', {
					recipe: foundRecipe,
					chefs: allChefs,
					recipeChef: foundRecipeChef,
                    pageTitle: "Edit " + foundRecipe.name
				});
			});
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
    Chef.findById(req.body.chefID, (error, foundChef) => {
        Recipe.create(req.body, (error, createdRecipe) => {
            foundChef.recipes.push(createdRecipe);
            foundChef.save((error, data)=>{
                res.redirect('/recipes');
            });
        });
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
    Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedRecipe) => {
        Chef.findOne({ 'recipes._id' : req.params.id }, (error, foundChef) => {
            if (foundChef._id.toString() !== req.body.chefID) {
                foundChef.recipes.id(req.params.id).remove();
                foundChef.save((error, savedFoundChef) => {
                    Chef.findById(req.body.chefID, (error, newChef)=>{
                        newChef.recipes.push(updatedRecipe);
                        newChef.save((error, savedNewChef) => {
                            res.redirect('/recipes/' + req.params.id);
                        });
                    });
                });
            } else {
                foundChef.recipes.id(req.params.id).remove();
                foundChef.recipes.push(updatedRecipe);
                foundChef.save((error, data)=>{
                    res.redirect('/recipes/' + req.params.id);
                });
            }
        });
    });
});

///////////////////////
// EXPORT CONTROLLER //
///////////////////////

module.exports = router;