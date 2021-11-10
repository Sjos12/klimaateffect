import React, {  Component } from 'react';
import {ReactComponent as Car} from '../images/car.svg';
import {ReactComponent as Earth} from '../images/earth.svg';
import {ReactComponent as Plant} from '../images/plant.svg';
import AirQuality from './AirQuality';
class Landingpage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            location: {},
        }
    }
    render() { 
        return ( 
            <div className="container mx-auto">
                <div className="grid grid-rows-2 h-screen">
                    <div className="row-span-1 gap-y-4 flex justify-center items-center flex-col">
                        <h1 className="title">Klimaat effect.</h1>
                        <p className="paragraph text-center w-10/12">Wat voor effect heeft klimaatverandering op jou? Krijg een gepersonaliseerd overzicht voor jouw locatie.</p>
                        <button onClick={this.props.setLocation} className="btn-1 drop-shadow">Krijg een schatting</button>
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