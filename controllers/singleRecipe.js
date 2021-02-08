const express = require("express");
const singleRecipeApi = require("../models/singleRecipe.js");
const singleRecipeRouter = express.Router();

function getSingleRecipeId(req, res) {
  const singleRecipeId = req.params.singleRecipeId;
  // if singlerecipeId missing lets throw error
  if (
    singleRecipeId === "" ||
    singleRecipeId === undefined ||
    singleRecipeId === null 
  ) {
    const message = `singlerecipeId parameter missing from URL. Please check parameters and try again`;
    console.log(message);
    res.status(500).json({
      error: "parameter missing",
      message
    });
    return;
  }
  return singleRecipeId;
}
singleRecipeRouter.get("/", async (req, res) => {
  try {
    const retrievedSingleRecipe = await singleRecipeApi.getAllSingleRecipes();
    console.log(retrievedSingleRecipe);
    res.status(200).json(retrievedSingleRecipe);
    return;
  } catch (e) {
    const message = `Failed to retrieve all SingleRecipe.
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

singleRecipeRouter.get("/:singleRecipeId", async (req, res) => {
  const singleRecipeId = getSingleRecipeId(req, res);
  try {
    const retrievedSingleRecipe = await singleRecipeApi.getSingleRecipeById(
      singleRecipeId
    );
    return res.status(200).json(retrievedSingleRecipe);
  } catch (e) {
    const message = `failed to retrieve singleRecipeId, check res.json
    "${singleRecipeId}". Please make sureId exists`;
    console.log(message);
    console.error(e);
    res.status(404).json({
      error: e,
      message
    });
    return;
  }
});

singleRecipeRouter.post("/", async (req, res) => {
    const singleRecipeData = req.body;
    try {
      const singleRecipeCreated = await singleRecipeApi.createSingleRecipe(singleRecipeData);
      res.status(201).json(singleRecipeCreated);
      console.log(singleRecipeCreated)
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

singleRecipeRouter.delete("/:singleRecipeId", async (req, res) => {
    const singleRecipeId = getSingleRecipeId(req, res);

    try {
      await singleRecipeApi.deleteSingleRecipeById(singleRecipeId);
      const message = `singleRecipe with singleRecipeId ${singleRecipeId}, has deleted successfully`;
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
  
});

module.exports = {
  singleRecipeRouter
};
