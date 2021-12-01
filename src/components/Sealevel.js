import React, { Component } from 'react'
import { Loader } from '@googlemaps/js-api-loader';

export default class Sealevel extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            isLoaded: false,
            elevation: null, 
            futureElevation: 0,
            underwater: false, 
        }
    }
    render() {
        let waterState = '';
        if (this.state.underwater) {
            waterState = 'Your location might be underwater'; 
        } 
        else {
            waterState = 'In the worst case scenario your location will likely not be underwater.';
        }
        return (
            <>
                <div>
                    <p className='subtitle'>Your current elevation</p>
                    <h1 className='title'>{this.state.elevation}m</h1>
                    <p className='subtitle'>Your elevation compensated by the worst case sea level rise by 2100</p>
                    <h1 className='title'>{this.state.futureElevation}m</h1>
                    {waterState}
                </div>
            </>
           
        )
    }
    componentDidMount() {
        const loader = new Loader({
            apiKey: this.props.constants.elevationkey,
            version: "weekly",
        });

        let location =  {   
                            lat: this.props.location.lat, 
                            lng: this.props.location.lng
                        }; 
        
        loader
            .load()
            .then((google) => {
                const elevator = new google.maps.ElevationService();
                elevator.getElevationForLocations({
                    locations: [location],
                })
                .then(({ results }) => {
                    let elevation = results[0].elevation;
                    elevation = Math.round(elevation * 10) / 10;
                    let futureElevation =  Math.round((elevation -2.5) * 10) / 10;
                    let underWater = false;
                    if((elevation - 2.5) >= 0) {
                        underWater = false;
                    }
                    else if ((elevation - 2.5) <= 0) {
                        underWater = true;
                    }
                    this.setState({
                        isLoaded: true, 
                        elevation: elevation, 
                        futureElevation: futureElevation,
                        underwater: underWater,
                    })
                })
                .catch((e) => {
                        console.log(e);
                    }
                );
            });
    }
}
