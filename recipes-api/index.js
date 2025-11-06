// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------

//Importing all of our node modules
import express from "express"; // the framework that lets us build webservers
import fs from "fs/promises"; // the file system module lets us read and write data from files

//Declare a variable named app and call the express() function to create a new instance of express so we can use all of the methods, fucntions, properties of express
// which will be saved in app
const app = express();

//Defining out port number
//What port should our server listen to?
const port = 3000; // you can use any port # but developers commonly use 3000. also there are some port numbers you cannot use

//Declaring that this server will be receiving and responding to requests in JSON
app.use(express.json());

//Turn on our server so that it can listen for requests and respond to those requests at our port #
//Hello you are on , listen to requests and respond to those requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
}); //this method is turning on our server

// ---------------------------------
// Helper Functions
// ---------------------------------

// 1. getAllRecipes()
async function getAllRecipes() {
  // declared variables
  const data = await fs.readFile("./recipes-data.json", "utf8");
  // parse recipe data
  const parsedRecipes = JSON.parse(data);

  // return parsed recipe data
  return parsedRecipes;
}

// 2. getOneRecipe(index)
async function getOneRecipe(index) {
  // read the recipes data from the data.json file
  // declared variables
  const data = await fs.readFile("./recipes-data.json", "utf8");
  const parsedRecipes = JSON.parse(data);

  // return the parsed data at the index number
  return parsedRecipes[index];
}

// 3. getAllRecipeNames()
async function getAllRecipeNames() {
  // declared variables
  const data = await fs.readFile("./recipes-data.json", "utf8");
  const parsedRecipes = JSON.parse(data);

  // loop through parsed recipes and return each recipe name
  return parsedRecipes.map((recipe) => recipe.name);
}

// 4. getRecipesCount()
async function getRecipesCount() {
  // declared variables
  const data = await fs.readFile("./recipes-data.json", "utf8");
  const parsedRecipes = JSON.parse(data);

  // return the length of parsed recipes - this will get the # of recipes
  return parsedRecipes.length;
}

// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-recipes
app.get("/get-all-recipes", async (req, res) => {
  // call the helper function
  const recipes = await getAllRecipes();

  // send recipes as json data
  res.json(recipes);
});

// 2. GET /get-one-recipe/:index
app.get("/get-one-recipe/:index", async (req, res) => {
  // declared variables
  const index = req.params.index;
  // call the helper function
  const recipe = await getOneRecipe(index);

  // send the recipe as json data
  res.json(recipe);
});

// 3. GET /get-all-recipe-names
app.get("/get-all-recipe-names", async (req, res) => {
  // call the helper function
  const recipeNames = await getAllRecipeNames();

  // send the recipe as json data
  res.json(recipeNames);
});

// 4. GET /get-recipes-count
app.get("/get-recipes-count", async (req, res) => {
  // call the helper function
  const recipeCount = await getRecipesCount();

  // send the recipe as json data
  res.json(recipeCount);
});
