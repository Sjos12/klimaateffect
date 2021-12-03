import React from 'react'
import { ReactComponent as Leaf } from '../images/leaf.svg';
import { ReactComponent as Plant } from '../images/plant.svg';
import { ReactComponent as Factory } from '../images/factory.svg';

class AirQuality extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false, 
            items: {}
        };
    }
    render() {
        return (
            <div className="container mx-auto">
                <div className="grid-rows-3">
                    <h1 className="title">Luchtkwaliteit</h1>
                    <div className='grid grid-cols-2 gap-1'>
                        <div>
                        <p className='paragraph'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque consectetur est fugiat corrupti repellendus? Ducimus, harum, impedit neque sapiente, et voluptate dolorum fugit perferendis magnam provident ipsa sequi? A, numquam!</p>
                        <p className='paragraph'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque consectetur est fugiat corrupti repellendus? Ducimus, harum, impedit neque sapiente, et voluptate dolorum fugit perferendis magnam provident ipsa sequi? A, numquam!</p>
                        <p className='paragraph'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque consectetur est fugiat corrupti repellendus? Ducimus, harum, impedit neque sapiente, et voluptate dolorum fugit perferendis magnam provident ipsa sequi? A, numquam!</p>
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
            fetch(`http://api.airvisual.com/v2/nearest_city?lat=${this.props.location.lat}&lon=${this.props.location.lng}&key=${this.props.constants.airqualitykey}`)
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
