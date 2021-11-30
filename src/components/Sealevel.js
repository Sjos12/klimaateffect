import React, { Component } from 'react'
import { Loader } from '@googlemaps/js-api-loader';

export default class Sealevel extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            isLoaded: false,
            elevation: null, 
        }
    }
    render() {
        return (
            <>
                <div>
                    {this.state.elevation} meters
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
                    this.setState({
                        isLoaded: true, 
                        elevation: results[0].elevation
                    })
                })
                .catch((e) => {
                        console.log(e);
                    }
                );
            });
    }
}
