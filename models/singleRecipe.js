const mongoose = require('./connection.js')

/* Step 1 alternative
 *
 * TODO: make a global variable to act as an in memory database. 
 * NOTE: doing this WILL NOT persist your data and you will loose
 * your data once you stop running your server.
 *
 */
global.SingleRecipeModel = [];

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
})

/* Step 3
 *
 * TODO: create collection API
 * NOTE: skip this if you are not using mongoose
 *
 */
const SingleRecipeCollection = mongoose.model('singleRecipe', SingleRecipeModelSchema)

/* Step 4
 *
 * TODO: delete this it's just a sample
 *
 */
function getAllSingleRecipe() {
    return SingleRecipeModel.find();
  }
  
  /**
  *  getSingleRecipeById
  * @param {string} SingleRecipeId
  */
  function getSingleRecipeById(SingleRecipeId) {
    return SingleRecipeModel
        .findById(SingleRecipeId);
  }
  
  /**
  *
  * @param {string} SingleRecipeId
  */
  function deleteSingleRecipeById(singlerecipeId) {
    return SingleRecipeModel
        .findOneAndDelete({_id: singlerecipeId});
  }
  
  function updateSingleRecipeById(singlerecipeId, singlerecipeData) {
    return SingleRecipeModel
        .findOneAndUpdate({_id: singlerecipeId}, singlerecipeData);
  }
  
  function createSingleRecipe(singlerecipeData) {
    return SingleRecipeModel.create(singlerecipeData);
  }
  

/* Step 5
 *
 * TODO: export all functions from this file by adding their names as keys to this
 * object
 */
module.exports = {
  getHelloWorldString,
  createSingleRecipe,
  updateSingleRecipeById,
  deleteSingleRecipeById,
  getSingleRecipeById,
}
