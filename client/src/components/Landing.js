import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import Notepad from "./Notepad";
const API_KEY = "606eea9a4cmsh0af525fb3527557p1737cdjsne2c82d71eb0a";
export default class Landing extends Component {
  state = {
    input: " ",
    ingredients: " ",
    recipeList: [],
    notepad: [],
    recipeIndex: {
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

  bttnClick = e => {
    this.setState({ recipeIndex: e });
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
                key={recipe.id}
                onClick={() => {
                  this.bttnClick(recipe);
                }}
              >
                <h3>{recipe.title}</h3>

                <button className="notepad">this-is-notepad</button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
