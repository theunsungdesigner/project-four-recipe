import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import Notepad from "./Notepad";
const API_KEY = "606eea9a4cmsh0af525fb3527557p1737cdjsne2c82d71eb0a";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
export default class Landing extends Component {
  state = {
    input: " ",
    ingredients: " ",
    recipeList: [],
    notepad: [],
    selectedRecipe: {
      title: "",
      ingredients: ""
    }
  };
  fetchApi = e => {
    e.preventDefault();
    axios({
      method: "GET",
      url: "https://recipe-puppy.p.rapidapi.com/",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "recipe-puppy.p.rapidapi.com",
        "x-rapidapi-key": `${API_KEY}`
      },
      params: {
        p: "1",
        i: `${this.state.ingredients}`,
        q: `${this.state.input}`
      }
    })
      .then(response => {
        console.log(response.data);
        this.setState({ recipeList: response.data.results });
      })
      .catch(error => {
        console.log(error);
      });
  };
  // easy way to set state on input target event, definitely adding to our codesnippets
  handleChange = e => {
    this.setState({ input: e.target.value });
  };

  saveRecipe =(e)=>{
    const id = e.target.getAttribute('data-index');
    const selected = this.state.recipeList.find((recipe, index) => {
      if (index === parseInt(id)) {
        this.state.recipeList[index].saved = true
        return recipe;
      }
    } );
    console.groupCollapsed('saved')
    console.log(id)
    console.log(selected)
    console.groupEnd()
  };

  selectRecipe = e => {
    this.setState({ selectedRecipe: e });
  };

  componentDidMount() {
    // axios.get("/api/singleRecipe").then(res => {
    //   console.log(res.data);
    //   this.setState({
    //     singleRecipe: res.data
    //   });
    // });
    // axios.get("/api/notepad").then(res => {
    //   console.log(res.data);
    //   this.setState({
    //     notepad: res.data
    //   });
    // });
  }

  render() {
    return (
      <div>
        <Notepad />
        <div>
          <form onSubmit={this.fetchApi}>
            <input
              type="text"
              name="input"
              placeholder="search"
              value={this.state.input}
              onChange={this.handleChange}
            />
          </form>
        </div>
        <div className="carousel">
          {this.state.recipeList.map((recipe, index) => {
            return (
              <div
                key={index}
                onClick={this.selectRecipe}
              >
                <h3>{recipe.title}</h3>

          <button className="saveRecipe" data-index={index} onClick={this.saveRecipe}> 
            {recipe.saved == true ? 'remove': 'save'} recipe</button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
