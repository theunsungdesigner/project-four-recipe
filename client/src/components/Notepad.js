import React, { Component } from 'react';
import axios from 'axios';


export default class Notepad extends Component {
  state = {
    notes: [],
    newNotes: {
      recipeName: '',
      recipeNotes: ''
      
    }
  }

  handleInputChange = e => {
    const newNotepad = { ...this.state.newNotes };
    newNotepad[e.target.name] = e.target.value;
    this.setState({ newNotes: newNotepad });
  };
  componentDidMount() {
    axios.get("/api/notepad").then(res => {
      console.log(res.data);
      
      // this.setState({
      //   recipeName: res.data,
      //   recipeNotes: res.data,
      //   recipeId: ''
      // });
    });
  }

  bttnClick = (e) => {
    e.preventDefault()
    const { newNotes } = this.state
    axios.post('/api/notepad', {
      recipeName: newNotes.recipeName,
      recipeNotes: newNotes.recipeNotes
    }).then(res =>{
      console.log(res)
      this.setState({ newNotes: {
        recipeName: '',
        recipeNotes: ''
      }})
    })

  }
  render() {
    return (
      <div className="carousel">
        <form onSubmit={this.bttnClick}>
          <input
            type="text"
            name="recipeName"
            maxLength="40"
            placeholder=" recipe-name"
            value={this.state.recipeName}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            name="recipeNotes"
            maxLength="250"
            placeholder="recipe-notes"
            value={this.state.recipeNotes}
            onChange={this.handleInputChange}
          />
          
          {/* <div key={notepadList.id} onClick={() => {
                this.bttnClick(notepadList)
              }}
              >

                <h3>{notepadList.name}</h3>

              </div> */}
            <button>Submit</button>
        </form>



        
        </div>


    )
  }
}