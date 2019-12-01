import React, { Component } from "react";
export default class SingleRecipe extends Component {
  constructor(props){
      super(props)
  }
  render() {
    return (
      <div>
        <h1>{this.props.selectedRecipe.title}</h1>
        <h5>{this.props.selectedRecipe.href}</h5>
        <h5>{this.props.selectedRecipe.ingredients}</h5>
        <h5><a href={this.props.selectedRecipe.href} target="_blank" >Visit website</a></h5>
      </div>
    );
  }
}
