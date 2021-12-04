import React, { Component } from 'react';
import AirQuality from './components/AirQuality';
import AverageTemperature from './components/AverageTemperature';
import Landingpage from './components/Landingpage';
import Sealevel from './components/Sealevel';
import './sass/main.scss';
export class App extends React.Component {
    constants = { 
        makeApiCalls: true,
        elevationkey: 'AIzaSyDpRXlltKXwPqlSEIFvYRvN1ub_X8rNRLk',
        airqualitykey: '8771f12f-7a3a-48dc-a448-7b6a9c469870', 
        meteoStatKey: '5533b8490amsh57964da1a7664d1p1fb950jsn4c2f9a2dcbdb',
    }
    constructor(props) {
        super(props);
        this.state = { 
            locationIsSet: false,
            isLoading: false,
            location: {lat: 0, lng: 0}
        }
    }
    setLocation() {
        this.setState({isLoading: true});
        navigator.geolocation.getCurrentPosition(
            (location) => {
                this.setState({
                    locationIsSet: true,
                    isLoading: false,
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
                        isLoading={this.state.isLoading}
                        setLocation={this.setLocation.bind(this)}
                        location={this.state.location} 
                        constants={this.constants} 
                    />
                 
                    <AirQuality 
                        location={this.state.location} 
                        constants={this.constants} 
                    />
                    <AverageTemperature 
                        location={this.state.location} 
                        constants={this.constants} 
                    />
                    <Sealevel 
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