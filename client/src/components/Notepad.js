import React, { Component } from "react";
import axios from "axios";
import * as M from "materialize-css";

export default class Notepad extends Component {
  state = {
    notes: [],
    newNotes: {
      recipeName: "",
      recipeNotes: "",
      url: "",
      imageId: "",
      recipeId: "",
    },
  };

  handleInputChange = (e) => {
    const newNotepad = { ...this.state.newNotes };
    newNotepad[e.target.name] = e.target.value;
    this.setState({ newNotes: newNotepad });
  };
  componentDidMount() {
    axios.get("/api/notepad").then((res) => {
      console.log(res.data);
    });
  }

  bttnClick = (e) => {
    e.preventDefault();
    const { newNotes } = this.state;
    axios
      .post("/api/notepad", {
        recipeName: newNotes.recipeName,
        recipeNotes: newNotes.recipeNotes,
      })
      .then((res) => {
        M.toast({ html: "Recipe Note Saved" });
        console.log(res);
        this.setState({
          newNotes: {
            recipeName: "",
            recipeNotes: "",
          },
        });
      });
  };
  render() {
    return (
      <div className="input-field">
        <form onSubmit={this.bttnClick}>
          <input
            className="notepad-input"
            type="text"
            name="recipeName"
            maxLength="40"
            placeholder="Note Title"
            value={this.state.recipeName}
            onChange={this.handleInputChange}
          />
          <input
            className="notepad-input"
            type="text"
            name="recipeNotes"
            maxLength="250"
            placeholder="recipe-notes"
            value={this.state.recipeNotes}
            onChange={this.handleInputChange}
          />
          <button type="primary" onChange={this.handleInputChange}>
            Submit a personal note
          </button>
        </form>
      </div>
    );
  }
}
