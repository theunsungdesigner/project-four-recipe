import React, { Component } from "react";

export default class SingleRecipe extends Component {
  state = {
    title: String,
    href: String,
    ingredients: String,
    url: String
  };
  render() {
    return (
      <div>
        <h1>{this.state.singleRecipe.title}</h1>
        <h5>{this.state.singleRecipe.href}</h5>
        <h5>{this.state.singleRecipe.ingredients}</h5>
        <h5>{this.state.singleRecipe.url}</h5>
      </div>
    );
  }
}