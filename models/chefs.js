//////////////////
// REQUIREMENTS //
//////////////////

const mongoose = require('mongoose');
const Recipe = require('./recipes.js');

////////////////////////
// CREATE CHEF SCHEMA //
////////////////////////

const chefSchema = mongoose.Schema({
	name: { 
        type: String,
        required: true,
        unique: true
    },
    bio: { type: String },
    image: { type: String },
	recipes: [Recipe.schema]
}, {timestamps: true});

//////////////////////////////////////
// MAKE COLLECTION WITH CHEF SCHEMA //
//////////////////////////////////////

const Chef = mongoose.model('Chef', chefSchema);

///////////////////////
// EXPORT COLLECTION //
///////////////////////

module.exports = Chef;