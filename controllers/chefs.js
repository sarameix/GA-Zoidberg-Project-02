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
const chefSeed = require('../models/chefs_seed.js');

////////////
// ROUTES //
////////////

// Delete Individual Chef Route
router.delete('/:id', (req, res)=>{
	Chef.findByIdAndRemove(req.params.id, (error, foundChef) => {
		const recipeIDs = [];
		for (let i = 0; i < foundChef.recipes.length; i++) {
			recipeIDs.push(foundChef.recipes[i]._id);
		}
		Recipe.remove(
			{
				_id : {
					$in: recipeIDs
				}
			},
			(error, data) => {
				res.redirect('/chefs');
			}
		);
	});
});

// Get Chefs Index Route
router.get('/', (req, res) => {
	// Determine Action Based on Selected Sort Type
	if (req.query.sortBy === "mostRecent") { // Most Recent Chefs
		Chef.find({}).sort({updatedAt: 1}).exec((err, foundChefs) => {  
			res.render('chefs/index.ejs', {
				chefs: foundChefs,
				pageTitle: "Our Chefs",
				select: "recent"
			});
		});
	} else if (req.query.sortBy === "chefName") { // Alphabetically
		Chef.find({}).sort({name: 1}).exec((err, foundChefs) => {  
			res.render('chefs/index.ejs', {
				chefs: foundChefs,
				pageTitle: "Our Chefs",
				select: "alphabetically"
			});
		});
	} else { // Display Page Regularly if No Sort Option
		Chef.find({}, (error, foundChefs) => {
			res.render('chefs/index.ejs', {
				chefs: foundChefs,
				pageTitle: "Our Chefs",
				select: "none"
			});
		});
	}	
});

// Get New Chef Route
router.get('/new', (req, res) => {
	res.render('chefs/new.ejs',
        {
            pageTitle: "Add New Chef"
        }
    );
});

// Get Individual Chef Page Route
router.get('/:id', (req, res) => {
	Chef.findById(req.params.id, (error, foundChef) => {
		res.render('chefs/show.ejs', {
			chef: foundChef,
            pageTitle: foundChef.name
		});
	});
});

// Get Edit Individual Chef Page Route
router.get('/:id/edit', (req, res)=>{
	Chef.findById(req.params.id, (error, foundChef) => {
		res.render('chefs/edit.ejs', {
			chef: foundChef,
            pageTitle: "Edit " + foundChef.name
		});
	});
});

// Post New Chef Route
router.post('/', (req, res) => {
    // Add Recipes Key Value Pair to Inputted Info
    req.body.recipes = [];

    // Create New Chef in Collection and Redirect to Chefs Index
    Chef.create(req.body, (error, createdChef) => {
		res.redirect('/chefs');
	});
});

// Put Update Individual Chef Route
router.put('/:id', (req, res) => {
	Chef.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (error, foundChef) => {
		    res.redirect('/chefs/' + foundChef._id);
	});
});

///////////////////////
// EXPORT CONTROLLER //
///////////////////////

module.exports = router;