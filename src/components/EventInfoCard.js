import React, {Component} from 'react'

export default class EventInfoCard extends Component {

  state = {
    phoneNumber: "",
    showNumberInput: false
  }

  handleClick = () => {
    this.setState({
      showNumberInput: !this.state.showNumberInput
    })
  }

  handleChange = (e) => {
    this.setState({
      phoneNumber: e.target.value
    })
  }

  sendText = (e) => {
    e.preventDefault()
    const clockworkKey = process.env.REACT_APP_CLOCKWORK_KEY
    const clockwork = require('clockwork')({key:`${clockworkKey}`});

    clockwork.sendSms({ To: `${this.state.phoneNumber}`,
       Content: `Hey You!! Let's go to ${this.props.event.name} today!`},
    function(error, resp) {
      if (error) {
          console.log('Something went wrong', error);
      } else {
          console.log('Message sent',resp.responses[0].id);
      }
  });

  }

  // content = () => {
  //   return(
  //
  //   )
  // }

  render() {
    const event = this.props.event
    return(
      <div key = {event.title}>
      <h3> {event.title} </h3>
      <ul style={{ listStyleType: "none" }}>

        {
          (
            (event.entities.length !== 0) && (
              <li>
                Where? {event.entities[0].name}
              </li>
              )
          )
        }

        <li>
        When: {event.start.slice(11)}
        </li>

        {this.state.showNumberInput && (
          <div>
          <input type="text" name="phoneNumber" onChange = {this.handleChange}/>
          <button
            onClick = {this.sendText}>
            Send
          </button>
          </div>
        )}

        <button
        onClick = {this.handleClick}
        >
         <img className= "TextImage" src= 'https://www.shareicon.net/data/256x256/2016/11/15/852510_sms_358x512.png' alt="send"/>
         </button>

      </ul>
      </div>
    )
  }
}
