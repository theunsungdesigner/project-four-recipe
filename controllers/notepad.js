const express = require("express");
const notepadApi = require("../models/notepad.js");
const notepadRouter = express.Router();
function getNotepadId(req, res) {
  const notepadId = req.params.notepadId;
  // if notepadId missing lets throw error
  if (notepadId === "" || notepadId === undefined || notepadId === null) {
    const message = `notepadId parameter missing from URL. Please check parameters and try again`;
    console.log(message);
    res.status(500).json({
      error: "parameter missing",
      message
    });
    return;
  }
  return notepadId;
}
notepadRouter.get("/", async (req, res) => {
  try {
    const retrievedNotepad = await notepadApi.getAllNotepads();
    console.log(retrievedNotepad);
    res.status(200).json(retrievedNotepad);
    return;
  } catch (e) {
    const message = `Failed to retrieve all Notepad.
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

notepadRouter.get("/:notepadId", async (req, res) => {
  const notepadId = getNotepadId(req, res);
  try {
    const retrievedNotepad = await notepadApi.getNotepadById(notepadId);
    return res.status(200).json(retrievedNotepad);
  } catch (e) {
    const message = `failed to retrieve notepadId, check res.json
    "${notepadId}". Please make sureId exists`;
    console.log(message);
    console.error(e);
    res.status(404).json({
      error: e,
      message
    });
    return;
  }
});

notepadRouter.post("/", async (req, res) => {
  const notepadData = req.body;
  try {
    const notepadCreated = await notepadApi.createNotepad(notepadData);
    res.status(201).json(notepadCreated);
    console.log(notepadCreated)
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

notepadRouter.delete("/:notepadId", async (req, res) => {
  const notepadId = getNotepadId(req, res);

  try {
    await notepadApi.deleteNotepadById(notepadId);
    const message = `notepad with notepadId ${notepadId}, has deleted successfully`;
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
  notepadRouter
  
};