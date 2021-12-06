import React from 'react'
import { ReactComponent as Leaf } from '../images/leaf.svg';
import { ReactComponent as Plant } from '../images/plant.svg';
import { ReactComponent as Factory } from '../images/factory.svg';

class AirQuality extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false, 
            items: {},
            aqi: 0,
            rating: {
                good: [0, 50], 
                medium: [51, 100], 
                bad: [101, 300],
            }
        };
    }
    render() {
        let paragraph = '';
        let aqi = this.state.aqi;
        if (aqi >= this.state.rating.good[0] && aqi <=  this.state.rating.good[1]) {
            paragraph = 'The air at your location is relatively clean: There are few greenhouse gasses like carbon dioxide and methane present in the air at your location. Even though the air quality is quite good, there is a large chance that this will change in the future due to industrialization and modernization. Many countries with clean air quality, like the United States, still participate in polluting the air by building factories and transporting goods in and from other countries.';
        }
        else if (aqi >= this.state.rating.medium[0] && aqi <= this.state.rating.medium[1]) {
            paragraph = 'The air at your location is polluted: There is some amount of greenhouse gasses like carbon dioxide and methane present in the air at your location. If immediate action is not taken, this may cause environmental or health issues. There is a large chance that the air quality will decrease even further in the future due to industrialization and modernization. The air is polluted due to greenhouse gas-emitting sources like factories or containerships.'
        }
        else if (aqi >= this.state.rating.bad[0] && aqi <= this.state.rating.bad[1]) {
            paragraph = 'The air at your location is polluted: There are too many greenhouse gasses like carbon dioxide and methane present in the air at your location. This is already causing environmental and health issues for some and will continue doing so if immediate action is not taken. The air is polluted due to greenhouse gas-emitting sources like factories or containerships.';
        }
        return (
            <div className="container mx-auto my-60">
                <div className="grid-rows-3">
                    <h1 className="title">Air Quality.</h1>
                    <div className='grid grid-cols-2 gap-1'>
                        <div>
                            <p className='paragraph'>{ paragraph }
                            </p>
                        </div>
                        <div className='flex flex-col justify-between items-center '>
                            <div className="bg-blob grid place-content-center">
                                <p className='subtitle'>Air Quality Index:</p>
                                <h2 className="title text-center">{ this.state.aqi }</h2>
                            </div>
                    
                            <Factory/>
                        </div>
                     
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        if (this.props.constants.makeApiCalls) {
            fetch(`https://api.airvisual.com/v2/nearest_city?lat=${this.props.location.lat}&lon=${this.props.location.lng}&key=${this.props.constants.airqualitykey}`)
            .then(res => res.json())
            .then(
              (result) => {
                  console.log(result);
                  let aqi = result.data.current.pollution.aqius;
                  this.setState({
                      aqi: aqi,
                  }, () => {
                      console.log(this.state);
                  })
              },
                  // Note: it's important to handle errors here
                  // instead of a catch() block so that we don't swallow
                  // exceptions from actual bugs in components.
              (error) => {
                  console.log(error);
              }
            )
        } 
    }
}
export default AirQuality
