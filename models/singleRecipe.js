const mongoose = require("./connection.js");

/* Step 1 alternative
 *
 * TODO: make a global variable to act as an in memory database.
 * NOTE: doing this WILL NOT persist your data and you will loose
 * your data once you stop running your server.
 *
 */


/* Step 2
 *
 * TODO: create model schema
 * NOTE: skip this if you are not using mongoose
 *
 */
const SingleRecipeModelSchema = new mongoose.Schema({
  title: String,
  href: String,
  ingredients: String,
  url: String
});

/* Step 3
 *
 * TODO: create collection API
 * NOTE: skip this if you are not using mongoose
 *
 */
const SingleRecipeCollection = mongoose.model(
  "singleRecipe",
  SingleRecipeModelSchema
);

/* Step 4
 *
 * TODO: delete this it's just a sample
 *
 */
function getAllSingleRecipes() {
  return SingleRecipeCollection.find();
}

/**
 *  getSingleRecipeById
 * @param {string} SingleRecipeId
 */
function getSingleRecipeById(SingleRecipeId) {
  return SingleRecipeCollection.findById(SingleRecipeId);
}

/**
 *
 * @param {string} SingleRecipeId
 */
function deleteSingleRecipeById(singleRecipeId) {
  return SingleRecipeCollection.findOneAndDelete({ _id: singleRecipeId });
}

function updateSingleRecipeById(singleRecipeId, singleRecipeData) {
  return SingleRecipeCollection.findOneAndUpdate(
    { _id: singleRecipeId },
    singleRecipeData
  );
}

function createSingleRecipe(singleRecipeData) {
  return SingleRecipeCollection.create(singleRecipeData);
}

/* Step 5
 *
 * TODO: export all functions from this file by adding their names as keys to this
 * object
 */
module.exports = {
  getAllSingleRecipes,
  createSingleRecipe,
  updateSingleRecipeById,
  deleteSingleRecipeById,
  getSingleRecipeById
};
