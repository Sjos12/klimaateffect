import React, { Component } from 'react'
import { Loader } from '@googlemaps/js-api-loader';
import { ReactComponent as Wave } from '../images/wave.svg';
export default class Sealevel extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            isLoaded: false,
            elevation: 0,   
            futureElevation: 0,
            underwater: false, 
            rating: {
                good: [0.3, 1000], 
                medium: [-0.2, 0.2],
                bad: [-0.3, -1000], 
            }
        }
    }
    render() {
        let paragraph = ''; 
        let elevation = this.state.futureElevation;
        elevation = -2;
        if (elevation >= this.state.rating.good[0] && elevation <=  this.state.rating.good[1]) {
            paragraph = 'In the worst case scenario, your location will not be under water in the year 2100 (data on the right): the rising sea levels will not affect you in this short time span. The same fate (or worse!) will await many island nations and coastal cities, which are directly affected by global warming caused by you and everyone else on the planet. These places are likely to be completely covered by the oceans if immediate action is not taken. ';
        }
        else if (elevation >= this.state.rating.medium[0] && elevation <= this.state.rating.medium[1]) {
            paragraph = 'In the worst case scenario, your location will be almost or partially under water in the year 2100 (data on the right): the rising sea levels will affect you in this short time span. The same fate (or worse!) will await many island nations and coastal cities, which are directly affected by global warming caused by you and everyone else on the planet. These places are likely to be completely covered by the oceans if immediate action is not taken.'
        }
        else if (elevation <= this.state.rating.bad[0] && elevation >= this.state.rating.bad[1]) {
            paragraph = 'In the worst case scenario, your location will be under water in the year 2100 (data on the right): the rising sea levels will affect you in this short time span. This fate will await you and many other island nations and coastal cities, which are directly affected by global warming caused by you and everyone else on the planet. These places are likely to be completely covered by the oceans if immediate action is not taken.';
        }

        return (
            <div className='offset top-slanted-2'>
                    <div className='bg-blue'>
                        <div className="container mx-auto py-60">
                            <h1 className="title text-5xl">Rising sea levels.</h1>
                            <div className="grid grid-flow-row gap-2">
                                <div className='order-2'>
                                    <p className='paragraph--white'>{ paragraph }</p>
                                </div>
                                <div className='order-1'>
                                    <div className='grid grid-cols-2'>
                                        <div>
                                            <p className='subtitle--white'>Your elevation</p>
                                            <h1 className='title text-7xl'>{this.state.elevation}m</h1>
                                        </div>
                                        <div>
                                            <p className='subtitle--white'>Your elevation by 2100*</p>
                                            <h1 className='title text-7xl'>{this.state.futureElevation}m</h1>
                                        </div>
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                    </div>
            </div>
           
        )
    }
    componentDidMount() {
        if(this.props.constants.makeApiCalls) {
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
}
