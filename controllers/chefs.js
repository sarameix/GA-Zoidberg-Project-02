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

// Get Chefs Index Route
router.get('/', (req, res)=>{
	Chef.find({}, (err, foundChefs)=>{
		res.render('chefs/index.ejs', {
			chefs: foundChefs,
            pageTitle: "Our Chefs"
		});
	})
});

// Get Chefs Seed Route
router.get('/seed', (req, res)=>{
    Chef.create(
        chefSeed, 
        (error, data) => {
            res.redirect('/');
        }
    );
});

// Get New Chef Route
router.get('/new', (req, res)=>{
	res.render('chefs/new.ejs',
        {
            pageTitle: "Add New Chef"
        }
    );
});

// Get Individual Chef Page Route
router.get('/:id', (req, res)=>{
	Chef.findById(req.params.id, (err, foundChef) => {
		res.render('chefs/show.ejs', {
			chef: foundChef,
            pageTitle: foundChef.name
		});
	});
});

// Post New Chef Route
router.post('/', (req, res)=>{
    // Add Recipes Key Value Pair to Inputted Info
    req.body.recipes = [];

    // Create New Chef in Collection and Redirect to Chefs Index
    Chef.create(req.body, (err, createdChef)=>{
		res.redirect('/chefs');
	});
});

///////////////////////
// EXPORT CONTROLLER //
///////////////////////

module.exports = router;