import React, {Component} from 'react';
// import AutoComplete from './components/AutoComplete'
// import InputField from './components/InputField'
import './App.css';
import AutoComplete from './components/AutoSuggest'
import cities from './cities.json';

export default class App extends Component {

  state = {
    cityName: "",
    city: null,
    events: null
  }

  receiveSearchTerm = (cityName) => {

    this.setState({
      cityName: cityName
    })

    const apiKey = process.env.REACT_APP_WEATHER_API_KEY

    const accessToken = process.env.REACT_APP_EVENTS_ACCESS_TOKEN

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    let todaysDate = yyyy + "-" + mm + "-" + dd

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${apiKey}`)
      .then(resp => resp.json())
      .then((city) => this.setState({
        city: city
      }, () => {
        fetch(`https://api.predicthq.com/v1/events/?active.gte=${todaysDate}&active.lte=${todaysDate}&?location_around.origin=${this.state.city.coord.lat},-${this.state.city.coord.lon}`, {
          method: `GET`,
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
            }
          }
        )
          .then(resp => resp.json())
          .then((events) => {
            this.setState({
              events: events.results
            })
          })
      }))
  }


  displayWeather = () => {
    if (this.state.city && this.state.city.length !== 0) {

      return (
        <div className="WeatherInfo">
          <h2>
          Weather in {this.state.cityName.toUpperCase()}
          </h2>
          <ul style={{ listStyleType: "none" }}>
            <li> {this.state.city.weather[0].main} </li>
            <img src={`http://openweathermap.org/img/w/${this.state.city.weather[0].icon}.png`} alt="weather-icon"/>
            <li> {this.state.city.main.temp} °F </li>
          </ul>
        </div>
    )
    }
  }

  displayEvents = () => {
    if (this.state.city && this.state.city.length !== 0 && this.state.events && this.state.events.length !==0) {
      console.log(this.state.events)
      return (
        <div className="EventInfo">

        <h2>
        What to do in {this.state.cityName.toUpperCase()} today:
        </h2>



          {
            this.state.events.map(event => {
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
                  <li>

                  </li>
                </ul>
                </div>
              )
            })
          }


        </div>
      )
    }
  }

  render () {
    // console.log('cities', cities);
    return (
      <div className="App">

        <div className="Header">
          <h1 className="AppTitle">
          What's The Word?
          </h1>
        </div>

        <AutoComplete receiveSearchTerm= {this.receiveSearchTerm} suggestions= {cities}/>


        {
          this.displayWeather()
        }

        {
          this.displayEvents()
        }





      </div>
    );
  }

}
