import React from 'react'
import { ReactComponent as Leaf } from '../images/leaf.svg';
import { ReactComponent as Plant } from '../images/plant.svg';

class AirQuality extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false, 
            ac: {}
        };
    }
    render() {
        return (
            <div className="container mx-auto">
                <div className="grid-rows-3">
                    <h1 className="title">Luchtkwaliteit</h1>
                    <div>
                        <h2 className="subtitle">Koolstofdioxide</h2>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab, quos architecto ullam dolorum totam, at qui blanditiis necessitatibus, aliquid nulla minus unde sequi accusantium deserunt mollitia repellendus fugiat! Saepe, minima.</p>
                    </div>
                    <div>
                        <h2 className="subtitle">Stikstof</h2>
                        <p>{this.state.items.title}</p>
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
                this.setState({
                    items: result,
                }, () => {
                    console.log(this.state);
                })
            },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
            (error) => {
            
            }
          )
      }
}
export default AirQuality
