const express = require("express");
const imageApi = require("../models/image.js");
const imageRouter = express.Router();
function getImageId(req, res) {
  const imageId = req.params.imageId;
  // if imageId missing lets throw error
  if (imageId === "" || imageId === undefined || imageId === null) {
    const message = `imageId parameter missing from URL. Please check parameters and try again`;
    console.log(message);
    res.status(500).json({
      error: "parameter missing",
      message
    });
    return;
  }
  return imageId;
}
imageRouter.get("/", async (req, res) => {
  try {
    const retrievedImage = await imageApi.getAllImages();
    console.log(retrievedImage);
    res.status(200).json(retrievedImage);
    return;
  } catch (e) {
    const message = `Failed to retrieve all Image.
          Please check mongod service and make sure it is running`;
    console.log(message);
    console.error(e);
    res.status(500).json({
      error: e,
      message
    });
    return;
  }
  
});

imageRouter.get("/:imageId", async (req, res) => {
  const imageId = getImageId(req, res);
  try {
    const retrievedImage = await imageApi.getImageById(imageId);
    return res.status(200).json(retrievedImage);
  } catch (e) {
    const message = `failed to retrieve imageId, check res.json
    "${imageId}". Please make sureId exists`;
    console.log(message);
    console.error(e);
    res.status(404).json({
      error: e,
      message
    });
    return;
  }
});

imageRouter.post("/", async (req, res) => {
  const imageData = req.body;
  try {
    const imageCreated = await imageApi.createImage(imageData);
    res.status(201).json(imageCreated);
    console.log(imageCreated)
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: e,
      message
    });
    return;
  }

  
});

imageRouter.delete("/:imageId", async (req, res) => {
  const imageId = getImageId(req, res);

  try {
    await imageApi.deleteImageById(imageId);
    const message = `image with imageId ${imageId}, has deleted successfully`;
    res.status(202).json(message);
    return;
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: e,
      message
    });
    return;
  }
  console.log('Delete hit')
});


module.exports = {
  imageRouter
  
};