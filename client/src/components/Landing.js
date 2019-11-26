import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
const API_KEY = "606eea9a4cmsh0af525fb3527557p1737cdjsne2c82d71eb0a"
export default class Landing extends Component {
  state = {
    input: " ",
    ingredients: " ",
    recipeList: [],
    notepad: []
  };

  fetchApi = (e)=>{
    e.preventDefault()
    console.log(API_KEY)
    axios({
      "method":"GET",
      "url":"https://recipe-puppy.p.rapidapi.com/",
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"recipe-puppy.p.rapidapi.com",
      "x-rapidapi-key": `${API_KEY}`
      },"params":{
      "p":"1",
      "i": `${this.state.ingredients}`,
      "q":`${this.state.input}`
      }
      })
      .then((response)=>{
        console.log(response.data)
        this.setState({recipeList: response.data.results})
      })
      .catch((error)=>{
        console.log(error)
      })
  }
// easy way to set state on input target event, definitely adding to our codesnippets
  handleChange =(e)=>{
    this.setState({input : e.target.value}) 
  }

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
        <div>
          <form onSubmit={this.fetchApi}>
            <input
              type="text"
              name="input"
              placeholder="search"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </form>
        </div>
      </div>
    );
  }
}
