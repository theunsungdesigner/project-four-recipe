import React, { Component } from "react";
import axios from "axios";
import * as M from 'materialize-css';

export default class Image extends Component {
  state = {
    imageUrl: "",
    file: {
      url: "",
        type: "",
      recipeId: ""
    }
  };
  handleInputChange = e => {
    this.setState({ imageUrl: e.target.value });
  };

  componentDidMount() {
    axios.get("/api/image").then(res => {
      console.log(res.data);
    });
  }

  bttnClick = e => {
    e.preventDefault();
    const { newUrl } = this.state;
    axios
      .post("/api/image", {
        url: this.state.imageUrl
      })
      .then(res => {
        M.toast({html: 'Image Saved'})
        this.setState({
          file: {
            url: " "
          }
        });
        console.log(res.data);
      });
  };

  render() {
    return (
      <div>
        <label>image</label>
        <input
          className="notepad-input"
          type="file"
          name="url2"
          placeholder=" upload image"
          value=""
          onChange={this.handleInputChange}
        />
        
        <input
          className="notepad-input"
          type="text"
          name="url"
          placeholder="image url"
          value={this.state.imageUrl}
          onChange={this.handleInputChange}
        />
        <button onClick={this.bttnClick}>upload</button>
      </div>
    );
  }
}
