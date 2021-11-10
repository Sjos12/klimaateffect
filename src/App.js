import React, { Component } from 'react';
import AirQuality from './components/AirQuality';
import Landingpage from './components/Landingpage';
import './sass/main.scss';
export class App extends React.Component {
    constants = { 
        elevationkey: 'AIzaSyDpRXlltKXwPqlSEIFvYRvN1ub_X8rNRLk',
        airqualitykey: '8771f12f-7a3a-48dc-a448-7b6a9c469870'
    }
    constructor(props) {
        super(props);
        this.state = { 
            locationIsSet: false,
            location: {lat: 0, lng: 0}
        }
    }
    setLocation() {
        navigator.geolocation.getCurrentPosition(
            (location) => {
                this.setState({
                    locationIsSet: true,
                    location: { 
                        lat: location.coords.latitude, 
                        lng: location.coords.longitude
                    }
                })
                }, 
            (error) => {
                console.log(error)
                }, 
            {}
        );
     
    }
    render() {
        if (this.state.locationIsSet) {
            return (
                <>
                    <Landingpage 
                        setLocation={this.setLocation.bind(this)}
                        location={this.state.location} 
                        constants={this.constants} 
                    />
                    <AirQuality 
                        location={this.state.location} 
                        constants={this.constants} 
                    />
                </>
            )
        }
        return (
            <>
                <Landingpage 
                    setLocation={this.setLocation.bind(this)}
                    location={this.state.location} 
                    constants={this.constants} 
                />
            </>
        )
    }
}
export default App;