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
        newUrl[e.target.url] = e.target.value;
        this.setState({url: ''});
      };
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
