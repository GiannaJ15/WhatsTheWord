import React, {Component} from 'react';



export default class InputField extends Component {

  state = {
    cityName: ""
  }

  changeHandler = (e) => {
    this.setState({
      cityName: e.target.value
    })
  }

  clickHandler = (e) => {
    e.preventDefault()
    this.props.receiveSearchTerm(this.state.cityName)
  }

  render() {
    return (
      <div className="InputField">
        <input
        type="text"
        name="location"
        value= {this.state.cityName}
        onChange = {this.changeHandler}
        />


        <button
        className="button"
        onClick = {this.clickHandler}
        >
        Show Me What's Up
        </button>


      </div>
    )
  }
}
