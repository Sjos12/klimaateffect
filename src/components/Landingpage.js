import React, {  Component } from 'react';
import {ReactComponent as Car} from '../images/car.svg';
import {ReactComponent as Earth} from '../images/earth.svg';
import {ReactComponent as Plant} from '../images/plant.svg';
import {ReactComponent as Location} from '../images/map-pin.svg';
import {ReactComponent as ArrowIcon} from '../images/arrow-down.svg';
import AirQuality from './AirQuality';
class Landingpage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            location: {},
        }
    }
    render() { 
        console.log('landing page ', this.props.isLoading)
        return ( 
            <div className="container mx-auto">
                <div className="flex place-content-center flex-col h-screen">
                    <div className="row-span-1 gap-y-4 flex justify-center items-center flex-col">
                        <h1 className="title text-7xl text-center">Climate effect.</h1>
                        <p className="paragraph text-center w-10/12">How is climate change affecting you? Get a personalized overview based on your location.</p>
                        <button onClick={this.props.setLocation} className={`btn-1 drop-shadow ${this.props.isLoading ? 'loading' : ''} ${this.props.hasLoaded ? 'hasloaded' : ''}`}>
                            <div className='loading-icon animate-spin'>
                                <Location  /> 
                            </div>
                            <span>Get an estimate</span>
                            <div className='arrow-icon animate-bounce'>
                                <ArrowIcon />
                            </div>
                        </button>
                    </div>
                   
                    <div className="row-span-1 my-5 flex justify-center items-center">
                        <Plant className="h-50"/>
                        <Earth className="h-full" />
                        <Car className="h-50"/>
                    </div>
                </div>
             
            </div>
         );
    }
}
 
export default Landingpage;