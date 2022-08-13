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

////////////
// ROUTES //
////////////

// Get Seed Route
router.get('/', (req, res) => {
    // Create Guy Fieri Chef
    Chef.create(
        {
            name: "Guy Fieri",
            bio: "Before I was the likeable, laid-back California guy with my trademark bleached-blond spiky hair, I began my love affair with food at the age of 10. I sold soft pretzels from a three-wheeled bicycle cart (named “The Awesome Pretzel”) that I built with my father. By selling pretzels and washing dishes, I earned enough money in six years to study abroad as an exchange student in Chantilly, France. There, I gained a profound appreciation for international cuisine and the lifestyle associated with it. I attended University of Nevada Las Vegas, where he graduated with a bachelor’s degree in hospitality management. In 2006, I premiered my first show, Guy's Big Bite, and the rest is history.",
            image: "https://cdn.shopify.com/s/files/1/0254/5969/articles/Guy_Headshot_700x700_crop_center.jpg?v=1631303944",
            recipes: []
        },
        (error, data) => {}
    );

    // Create Bobby Flay Chef
    Chef.create(
        {
            name: "Bobby Flay",
            bio: "Over three decades ago, with my GED in hand and a helping hand from a most generous restaurateur, I set out to learn a trade. I was a member of French Culinary Institute's first graduating class of 1984 and it was there I learned the fundamentals I so needed. That formal education and a three year stint with Chef Jonathan Waxman in the mid to late '80's are the two experiences I point to most when reflecting about how I got my start. They outfitted me with the confidence I needed to take my own shot. Over the years, I've been able to play out my culinary dreams like an artist — approaching concepts that were speaking to me at that very moment. I'm excited to see what happens next.",
            image: "https://assets.entrepreneur.com/content/3x2/2000/20170830163546-entoct17-bobbyflay1.jpeg?crop=1:1",
            recipes: []
        },
        (error, data) => {}
    );

    // Create Rachael Ray Chef
    Chef.create(
        {
            name: "Rachael Ray",
            bio: "Growing up in a family steeped in culinary tradition, I was exposed to a wide range of cooking techniques, from my maternal grandfather who grew and cooked everything his family of 12 ate, to my dad's family, which embraced the food-rich traditions of Louisiana. My family owned several restaurants on Cape Cod, Massachusetts, before relocating to upstate New York, where my mother worked as the food supervisor for a restaurant chain. After moving to New York and managing a few markets, I moved back upstate, started doing cooking classes, and eventually got signed on to do my first show. I've been cooking on tv ever since.",
            image: "https://scontent-lga3-1.xx.fbcdn.net/v/t1.6435-9/179321365_310052080489066_6870932841056677321_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=y7ZRCTJc6VMAX-1MkcR&_nc_ht=scontent-lga3-1.xx&oh=00_AT8302U8UHljKz_K4e7FHzsUpmr4mswTX9phzvUR_gHNog&oe=631A1ACF",
            recipes: []
        },
        (error, data) => {}
    );
  
    // Create First Recipe and Add to Guy Fieri Recipes
    Recipe.create(
        {
            name: "Guy's Prime-Time Pizza Dough",
            yield: "8",
            time: 130,
            image: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2013/7/19/0/FNM_090113-Prime-Time-Pizza-Dough-With-The-French-Pig-Toppings_s4x3.jpg.rend.hgtvcom.826.620.suffix/1382543447445.jpeg",
            description: "Guy Fieri's Prime Time Pizza Dough is the perfect recipe for pizza night with the family! Make it the day of, or store it in the freezer for a later meal.",
            ingredients: [
                "1 teaspoon sugar",
                "1 tablespoon active dry yeast",
                "2 tablespoons extra-virgin olive oil, plus more for the bowl",
                "1 teaspoon fine sea salt",
                "2 1/2 cups all-purpose flour, plus more for dusting"
            ],
            directions: [
                "In the bowl of a stand mixer, dissolve the sugar in 1 cup warm water (110 degrees F to 115 degrees F). Sprinkle the yeast on top and let stand 10 minutes, or until foamy. Add the olive oil and salt, then use the dough hook to mix in the flour until the dough starts to come together. Allow the machine to knead the dough until smooth. (If you don't have a stand mixer, you can pulse the dough in a food processor until it is smooth and elastic. Or combine by hand in a large bowl.)",
                "Turn out the dough onto a floured board and knead 2 to 3 minutes. Place the dough in an oiled bowl and turn to coat the surface. Cover the bowl with plastic wrap and let stand in a warm place until the dough has doubled in size, about 1 hour.",
                "Turn out the dough onto a lightly floured surface and divide it in half for 2 large pizzas, or into 4 pieces for small individual pizzas. Form into smooth, tight balls, cover loosely with plastic wrap or a well-floured kitchen towel and set in a warm place to rise again, 30 to 45 minutes. (If you're not using the dough right away, wrap tightly in plastic wrap and refrigerate up to 2 days or freeze up to 1 month.)",
                "Set a pizza stone in the oven and sprinkle a pizza peel lightly with flour. (If you don't have a stone, you can bake your pizza on a pizza pan or baking sheet sprinkled with flour.) Preheat the oven to 500 degrees F.",
                "Press the dough with your fingers until it's as flat as possible, then drape it over both of your fists and gently pull the edges outward while rotating the crust. When the circle has reached the desired size and thickness, place it on the pizza peel (or on the prepared pan). Top the pizza as desired and slide it from the peel onto the hot stone (or transfer the pan to the oven).",
                "Bake 8 to 12 minutes, depending on the thickness, or until the crust is crisp and golden."
            ]
        },
        (error, createdRecipe) => {
            Chef.findOne({"name": "Guy Fieri"}, (error, foundChef) => {
                foundChef.recipes.push(createdRecipe);
                foundChef.save((error, savedNewChef) => {} );
            });
        }
    );
  
    // Create Second Recipe and Add to Bobby Flay Recipes
    Recipe.create(
        {
            name: "Bobby's German Potato Salad",
            yield: "8",
            time: 35,
            image: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/6/8/0/GL1B09_german-potato-salad_s4x3.jpg.rend.hgtvcom.826.620.suffix/1382539763830.jpeg",
            description: "Bobby Flay's German Potato Salad is the perfect side dish to bring to any summer barbeque! It's super simple, quick to make, and packed with flavor.",
            ingredients: [
                "3 pounds new potatoes",
                "1 yellow onion, quartered",
                "1/2 pound bacon, diced",
                "1 large red onion, diced",
                "3/4 cup cider vinegar",
                "1 tablespoon Dijon mustard",
                "1/4 cup canola oil or olive oil",
                "Salt and freshly ground pepper",
                "8 green onions, thinly sliced",
                "1/4 cup chopped fresh parsley leaves"
            ],
            directions: [
                "Preheat the grill to high. Place potatoes in a large pot with the yellow onion and cover with cold water. Cook, on the grates of the grill, or on a burner, until tender. Drain, discard the onion, and cut the potatoes into cubes when cool enough to handle. Place the potatoes in a large bowl and cover to keep warm.",
                "Place a large saute pan on the grates of the grill. Add the bacon and cook until crisp. Remove the bacon with a slotted spoon and drain on a paper towel-lined plate. Add the red onion to the rendered bacon fat and cook until soft, about 3 to 4 minutes. Carefully add the vinegar and mustard and cook for 2 more minutes. Whisk in the oil and season, to taste, with salt and pepper. Add the hot dressing to the potatoes and toss gently to coat. Fold in the green onions and parsley. Season again with salt and pepper, to taste."
            ]
        },
        (error, createdRecipe) => {
            Chef.findOne({"name": "Bobby Flay"}, (error, foundChef) => {
                foundChef.recipes.push(createdRecipe);
                foundChef.save((error, savedNewChef) => {} );
            });
        }
    );

    // Create Third Recipe and Add to Bobby Flay Recipes
    Recipe.create(
        {
            name: "Bobby's Sauteed Kale",
            yield: "4",
            time: 15,
            image: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/8/13/1/BF_Sauteed-Kale-1_s4x3.jpg.rend.hgtvcom.826.620.suffix/1382541816255.jpeg",
            description: "Kale might not normally be everyone's favorite green, but Bobby Flay's Sateed Kale will change your mind completely! This quick and easy side dish is the perfect healthy accompaniment to any meal.",
            ingredients: [
                "1 1/2 pounds young kale, stems and leaves coarsely chopped",
                "3 tablespoons olive oil",
                "2 cloves garlic, finely sliced",
                "1/2 cup vegetable stock or water",
                "Salt and pepper",
                "2 tablespoons red wine vinegar"
            ],
            directions: [
                "Heat olive oil in a large saucepan over medium-high heat. Add the garlic and cook until soft, but not colored. Raise heat to high, add the stock and kale and toss to combine. Cover and cook for 5 minutes. Remove cover and continue to cook, stirring until all the liquid has evaporated. Season with salt and pepper to taste and add vinegar.",
                "Serve and enjoy!"
            ]
        },
        (error, createdRecipe) => {
            Chef.findOne({"name": "Bobby Flay"}, (error, foundChef) => {
                foundChef.recipes.push(createdRecipe);
                foundChef.save((error, savedNewChef) => {} );
            });
        }
    );
  
    // Redirect Back to Landing Page
    res.redirect('/');
});

// Get Rachael Seed Route
router.get('/rachael', (req, res) => {
    // Create Final Recipe and Add to Rachael Ray Recipes
    Recipe.create(
        {
            name: "Rachael's Greek-Style Fresh Tomato Sauce",
            yield: "4",
            time: 15,
            image: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/8/13/1/BF_Sauteed-Kale-1_s4x3.jpg.rend.hgtvcom.826.620.suffix/1382541816255.jpeg",
            description: "Kale might not normally be everyone's favorite green, but Bobby Flay's Sateed Kale will change your mind completely! This quick and easy side dish is the perfect healthy accompaniment to any meal.",
            ingredients: [
                "1 1/2 pounds young kale, stems and leaves coarsely chopped",
                "3 tablespoons olive oil",
                "2 cloves garlic, finely sliced",
                "1/2 cup vegetable stock or water",
                "Salt and pepper",
                "2 tablespoons red wine vinegar"
            ],
            directions: [
                "Heat olive oil in a large saucepan over medium-high heat. Add the garlic and cook until soft, but not colored. Raise heat to high, add the stock and kale and toss to combine. Cover and cook for 5 minutes. Remove cover and continue to cook, stirring until all the liquid has evaporated. Season with salt and pepper to taste and add vinegar.",
                "Serve and enjoy!"
            ]
        },
        (error, createdRecipe) => {
            Chef.findOne({"name": "Rachael Ray"}, (error, foundChef) => {
                foundChef.recipes.push(createdRecipe);
                foundChef.save((error, savedNewChef) => {} );
            });
        }
    );

    // Redirect Back to Landing Page
    res.redirect('/');
});

///////////////////////
// EXPORT CONTROLLER //
///////////////////////

module.exports = router;