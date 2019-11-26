const express = require("express");
const suggestionApi = require("../models/suggestion.js");
const suggestionRouter = express.Router();
function getSuggestionId(req, res) {
  const suggestionId = req.params.suggestionId;
  // if suggestionId missing lets throw error
  if (suggestionId === "" || suggestionId === undefined || suggestionId === null) {
    const message = `suggestionId parameter missing from URL. Please check parameters and try again`;
    console.log(message);
    res.status(500).json({
      error: "parameter missing",
      message
    });
    return;
  }
  return suggestionId;
}
suggestionRouter.get("/", async (req, res) => {
  try {
    const retrievedSuggestion = await suggestionApi.getAllSuggestion();
    console.log(retrievedSuggestion);
    res.status(200).json(retrievedSuggestion);
    return;
  } catch (e) {
    const message = `Failed to retrieve all Suggestion.
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

suggestionRouter.get("/:suggestionId", async (req, res) => {
  const suggestionId = getSuggestionId(req, res);
  try {
    const retrievedSuggestion = await suggestionApi.getSuggestionById(suggestionId);
    return res.status(200).json(retrievedSuggestion);
  } catch (e) {
    const message = `failed to retrieve suggestionId, check res.json
    "${suggestionId}". Please make sureId exists`;
    console.log(message);
    console.error(e);
    res.status(404).json({
      error: e,
      message
    });
    return;
  }
});

suggestionRouter.post("/", async (req, res) => {
  const suggestionData = req.body;
  try {
    const suggestionCreated = await suggestionApi.createSuggestion(suggestionData);
    res.status(201).json(suggestionCreated);
    console.log(suggestionCreated)
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

suggestionRouter.delete("/:suggestionId", async (req, res) => {
  const suggestionId = getSuggestionId(req, res);

  try {
    await suggestionApi.deleteSuggestionById(suggestionId);
    const message = `suggestion with suggestionId ${suggestionId}, has deleted successfully`;
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
  suggestionRouter
};