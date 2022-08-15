//////////////////
// REQUIREMENTS //
//////////////////

const mongoose = require('mongoose');

//////////////////////////
// CREATE RECIPE SCHEMA //
//////////////////////////

const recipeSchema = mongoose.Schema({
	name: { type: String, required: true },
    yield: { type: String, required: true },
    time: { type: Number, required: true },
    image: { type: String },
    description: { type: String },
	ingredients: [String],
    directions: [String]
}, {timestamps: true});

////////////////////////////////////////
// MAKE COLLECTION WITH RECIPE SCHEMA //
////////////////////////////////////////

const Recipe = mongoose.model('Recipe', recipeSchema);

///////////////////////
// EXPORT COLLECTION //
///////////////////////

module.exports = Recipe;