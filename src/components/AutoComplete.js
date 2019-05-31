//  code partially from:
// https://alligator.io/react/react-autocomplete/
import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Autocomplete extends Component {

  // Static methods are properties that are the same for
  // every instance of this class
  static propTypes = {
  suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
  suggestions: []
  };

  // State -- the suggestions are coming in as
  // an array
  state = {
    activeSuggestionIndex: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    userInput: ""
  }

// When we click the <li>, we want to update the user
// input to whatever value that li had --> which is the
// suggestion
  onClick = (e, index) => {
    this.setState({
      activeSuggestionIndex: index,
      userInput: e.target.value
    })
  }


  onChange = (e) => {
    // As we type, we want to go updating the user input
    // we also want our activeSuggestionIndex to return to 0
    // bc if they keep typing, we're gonna continue offering
    // suggestions
    this.setState({
      showSuggestions: true,
      activeSuggestionIndex: 0,
      userInput: e.target.value
    }, () => {
      // we also wanna filter out the matching suggestions
      const filteredSuggestions = this.props.suggestions.filter(
        (suggestion) => {
          let cityName = suggestion.name.toLowerCase()
          return cityName.includes(this.state.userInput.toLowerCase())
        }
      )

      this.setState({
        filteredSuggestions: filteredSuggestions
      })


      // this is a callback to setState because setState
      // Is async. making this a callback ensures that it
      // happens after the state is set
    })
    // console.log(this.props.suggestions[0].name.toLowerCase())

  }

// Send searchTerm to the App State
  clickHandler = (e) => {
    e.preventDefault()
    this.props.receiveSearchTerm(this.state.userInput)
  }

  render() {

    let suggestionsList

    // If we're showing suggestions and there is user input
    // -- if we have suggestions based on that input,
     // our suggestions list will consist of the filtered
     // suggestions-- we're checking the index to see if
     // it matches the index of the selected suggestion
    if (this.state.showSuggestions && this.state.userInput){
      if (this.state.filteredSuggestions.length > 0) {
          suggestionsList = (
          <ul class= "suggestions">
            {
              this.state.filteredSuggestions.map((suggestion, index) => {
                let className
                if (index === this.state.activeSuggestionIndex) {
                   className = "suggestion-active"
                }
                return(
                  <li
                  className = {className}
                  key = {suggestion}
                  value = {suggestion}
                  onClick = {(e, index) => this.onClick(e, index)}
                  >
                  {suggestion}
                  </li>
                )
              })
            }
          </ul>
        )
      }
      // if we have a user input and we're showing suggestions,
      // but we can't find any, the suggestions list will be:
      else {
        suggestionsList = (
          <div className= "no-suggestions">
          "Sorry! Couldn't find your city."
          </div>
        )
      }
    }

    return(
      <div>
        <input
          type="text"
          onChange={this.onChange}
          value={this.state.userInput}
        />
        <button
        className="button"
        onClick = {this.clickHandler}
        >
        Show Me What's Up
        </button>
        {suggestionsList}
      </div>
    )

  }

}
