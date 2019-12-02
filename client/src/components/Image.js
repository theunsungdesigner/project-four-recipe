import React, { Component } from 'react'
import axios from 'axios'

export default class Image extends Component {
   state = {
    newUrl: {
    url: '',
    imageId: '',
    recipeId: '',
    }

   }
    handleInputChange = e => {
        const newUrl = { ...this.state.url };
        newUrl[e.target.name] = e.target.value;
        this.setState({newUrl: newUrl});
      };
    
    componentDidMount() {
        axios.get("/api/image").then(res => {
        console.log(res.data);
    })
}

      bttnClick = (e) => {
        e.preventDefault()
        const { newUrl } = this.state
        axios.post('/api/notepad', {
          url: this.state.newUrl.url
        }).then(res => {
          
          this.setState({
            newNotes: {
              recipeName: '',
              recipeNotes: '',
              url: ''
            }
          })
          console.log(res.data)
        })
        
      }
  
    render() {
        return (
            <div>

            
            </div>
        )
    }
}
