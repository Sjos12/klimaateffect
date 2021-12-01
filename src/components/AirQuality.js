import React from 'react'
import { ReactComponent as Leaf } from '../images/leaf.svg';
import { ReactComponent as Plant } from '../images/plant.svg';

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
                    <h1 className="title">Luchtkwaliteit Index</h1>
                    <div>
                        <h2 className="title">{ this.state.aqi }</h2>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
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
export default AirQuality
