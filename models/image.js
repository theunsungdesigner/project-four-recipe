const mongoose = require("./connection.js");

/* Step 1 alternative
 *
 * TODO: make a global variable to act as an in memory database.
 * NOTE: doing this WILL NOT persist your data and you will loose
 * your data once you stop running your server.
 *
 */
global.ImageModel = [];

/* Step 2
 *
 * TODO: create model schema
 * NOTE: skip this if you are not using mongoose
 *
 */
const ImageModelSchema = new mongoose.Schema({
  title: String,
  url: String,
  recipeId: String
});

/* Step 3
 *
 * TODO: create collection API
 * NOTE: skip this if you are not using mongoose
 *
 */
const ImageCollection = mongoose.model(
  "image",
  ImageModelSchema
);

/* Step 4
 *
 * TODO: delete this it's just a sample
 *
 */
function getAllImages() {
  return ImageCollection.find();
}

/**
 *  getImageById
 * @param {string} ImageId
 */
function getImageById(ImageId) {
  return ImageCollection.findById(ImageId);
}

/**
 *
 * @param {string} ImageId
 */
function deleteImageById(imageId) {
  return ImageCollection.findOneAndDelete({ _id: imageId });
}

function updateImageById(imageId, imageData) {
  return ImageCollection.findOneAndUpdate(
    { _id: imageId },
    imageData
  );
}

function createImage(imageData) {
  return ImageCollection.create(imageData);
}

/* Step 5
 *
 * TODO: export all functions from this file by adding their names as keys to this
 * object
 */
module.exports = {
  getAllImages,
  createImage,
  updateImageById,
  deleteImageById,
  getImageById
};
