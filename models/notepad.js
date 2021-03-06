
const mongoose = require('./connection.js')

/* Step 1 alternative
 *
 * TODO: make a global variable to act as an in memory database. 
 * NOTE: doing this WILL NOT persist your data and you will loose
 * your data once you stop running your server.
 *
 */
global.NotePadModel = [];

/* Step 2
 *
 * TODO: create model schema 
 * NOTE: skip this if you are not using mongoose
 *
 */
const NotePadModelSchema = new mongoose.Schema({
 recipeName: String,
 recipeNotes: String
})

/* Step 3
 *
 * TODO: create collection API
 * NOTE: skip this if you are not using mongoose
 *
 */
const NotePadCollection = mongoose.model('notePad', NotePadModelSchema)

/* Step 4
 *
 * TODO: delete this it's just a sample
 *
 */
function getAllNotepads() {
    return NotePadCollection.find();
  }
  
  /**
  *  getNotepadById
  * @param {string} NotepadId
  */
  function getNotepadById(NotepadId) {
    return NotePadCollection
        .findById(NotepadId);
  }
  
  /**
  *
  * @param {string} NotepadId
  */
  function deleteNotepadById(notepadId) {
    return NotePadCollection
        .findOneAndDelete({_id: notepadId});
  }
  
  function updateNotepadById(notepadId, notepadData) {
    return NotePadCollection
        .findOneAndUpdate({_id: notepadId}, notepadData);
  }
  
  function createNotepad(notepadData) {
    return NotePadCollection.create(notepadData);
  }
  

/* Step 5
 *
 * TODO: export all functions from this file by adding their names as keys to this
 * object
 */
module.exports = {
  createNotepad,
  updateNotepadById,
  deleteNotepadById,
  getNotepadById,
  getAllNotepads,
}
