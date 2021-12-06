import React, { Component } from 'react'
import Chart from 'chart.js/auto';

export default class AverageTemperature extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            labels: [0, 1, 2, 3, 4, 5, 6, ], 
            values: [0, 1, 2, 3, 4, 5, 6, ],
        }
    }
    
    render() {
       
     
        return (
            <div className='bg-lightgreen top-slanted'>
                <div className='mx-auto pt-60 pb-80 container average-temperature__wrapper'>
                    <h1 className='title text-5xl purple'>Average Temperature.</h1>
                    <div className="grid lg:grid-cols-12 lg:grid-flow-col lg:auto-rows-auto grid-flow-row gap-2">
                        <div className='col-span-5'>
                            <p className='paragraph'>
                        At this point, there is no denying it: since the industrial revolution, our planet has been warming up, and it will keep doing so exponentially if drastic changes aren’t made quickly. 
                            </p>
                        </div>
                        <div className='col-span-7'>
                            <canvas className='chart' id="chart"></canvas>
                        </div>
                       
                    </div>
                    <div className="col-span-12">
                            <p className="paragraph">
                            To get a clear picture of what is actually happening, it is important to understand how the earth warms up naturally. The sun emits solar radiation, which warms up our atmosphere. But when the radiation hits the earth, it would bounce back up into space, which is not very efficient in heating the air.
                        That is why above the atmosphere, there is a sort of blanket containing greenhouse gasses, keeping the solar radiation from escaping so it bounces around in the atmosphere, although some of the heat does escape and make it into space. If this wouldn’t be the case, heat would be trapped forever, creating a very unpleasant environment.
                        To sustain our modern lifestyle, we need things like factories, containerships and electricity, all of which emit greenhouse gasses. These will rise up and thicken the layer above the atmosphere. This makes it harder for solar radiation to escape, heating up the air more and more, while we keep emitting greenhouse gasses.
                        Although this might not seem a big deal, it causes all sorts of (in)direct problems. Take for example the ice on the poles which is melting, creating rising sea levels. Or extreme droughts which result in failed crop harvests, starving people. Rising temperatures are a big issue already, which will get even worse over time, unless some key elements are taken away from our civilization.
                            </p>
                 

                        </div>
                </div>
            </div>
        
        )
    }

    componentDidMount() {
        let chartData = {
            type: 'line',
            data: {
                labels: this.state.labels,
                datasets: [{
                    fill: false,
                    data: this.state.values,
                    backgroundColor: [
                        'rgba(156, 236, 91, 0.1)',
                    ],
                    borderColor: [
                        '#9CEC5B',
                    ],
                    borderWidth: 4,
                    tension: 0.2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                    title: {
                        display: false,
                        text: 'Average yearly temperature at your location.'
                    },
                },
                scales: {
                    yAxis: {
                        beginAtZero: false,
                        // The axis for this scale is determined from the first letter of the id as `'x'`
                        // It is recommended to specify `position` and / or `axis` explicitly.
                        title: { 
                            display: true,
                            text: 'Temperature in degrees Celsius.',
                            padding: 4,
                            font: {
                                family: "Roboto",
                                size: 20,
                                weight: 300,
                            }
                        },
                        grid: {
                            borderColor: '#533A71', 
                            borderWidth: 3,
                        }
                    },
                    xAxis: {
                        beginAtZero: false,
                        // The axis for this scale is determined from the first letter of the id as `'x'`
                        // It is recommended to specify `position` and / or `axis` explicitly.
                        title: { 
                            display: true,
                            text: 'Time in years.',
                            padding: 4,
                            font: {
                                family: "Roboto",
                                size: 20,
                                weight: 300,
                            }
                        },
                   
                        grid: {
                            borderColor: '#533A71', 
                            borderWidth: 3,
                        },
                        font: {
                            family: "Roboto",
                            size: 20,
                            weight: 300,
                        }
                    }
                },
            }   
        }
        if (this.props.constants.makeApiCalls) {
            let today = new Date().toISOString().slice(0, 10);
            console.log(today);
            let url = new URL(`https://meteostat.p.rapidapi.com/point/monthly`);
            let params = {  lat: '59.9127', 
                            lon: '10.7461', 
                            alt: '26', 
                            start: '1950-01-01', 
                            end: today
                        };
            url.search = new URLSearchParams(params).toString();

            let headers = new Headers({
                'x-rapidapi-host': 'meteostat.p.rapidapi.com',
                'x-rapidapi-key': this.props.constants.meteoStatKey
            });

            let request = new Request(url.toString(), { 
                method: 'GET',
                headers: headers,
                mode: 'cors',
            })
        
            fetch(request)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    let data = result.data; 
                    let labels = [];
                    let values = [];
                    let sum = 0;
                    let month = 0;
                    for( let i = 0; i < data.length; i++ ) {
                        if (month < 12) { 
                            sum += data[i].tavg;
                            month ++;
                        }
                        else {
                            let date = new Date(data[i].date);
                            labels.push(date.getFullYear().toString());
                            values.push(sum/12);
                            sum = 0;
                            month = 0;
                        }
                    } 
                        console.log(labels, values);
                        this.setState({
                            labels: labels,
                            values: values,
                            }, () => {
                                let ctx = document.getElementById('chart');
                                let chart = new Chart(ctx, {
                                    type: 'line',
                                    data: {
                                        labels: this.state.labels,
                                        datasets: [{
                                            fill: false,
                                            data: this.state.values,
                                            backgroundColor: [
                                                'rgba(156, 236, 91, 0.1)',
                                            ],
                                            borderColor: [
                                                '#9CEC5B',
                                            ],
                                            borderWidth: 4,
                                            tension: 0.2
                                        }]
                                    },
                                    options: {
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                display: false,
                                            },
                                            title: {
                                                display: false,
                                                text: 'Average yearly temperature at your location.'
                                            },
                                        },
                                        scales: {
                                            yAxis: {
                                                beginAtZero: false,
                                                // The axis for this scale is determined from the first letter of the id as `'x'`
                                                // It is recommended to specify `position` and / or `axis` explicitly.
                                                title: { 
                                                    display: true,
                                                    text: 'Temperature in degrees Celsius.',
                                                    padding: 4,
                                                    font: {
                                                        family: "Roboto",
                                                        size: 20,
                                                        weight: 300,
                                                    }
                                                },
                                                grid: {
                                                    borderColor: '#533A71', 
                                                    borderWidth: 3,
                                                }
                                            },
                                            xAxis: {
                                                beginAtZero: false,
                                                // The axis for this scale is determined from the first letter of the id as `'x'`
                                                // It is recommended to specify `position` and / or `axis` explicitly.
                                                title: { 
                                                    display: true,
                                                    text: 'Time in years.',
                                                    padding: 4,
                                                    font: {
                                                        family: "Roboto",
                                                        size: 20,
                                                        weight: 300,
                                                    }
                                                },
                                           
                                                grid: {
                                                    borderColor: '#533A71', 
                                                    borderWidth: 3,
                                                },
                                                font: {
                                                    family: "Roboto",
                                                    size: 20,
                                                    weight: 300,
                                                }
                                            }
                                        },
                                    }   
                                });
                            }
                        )
                },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                (error) => {
                    console.log(error);
                }
            )
        }
        else {
            let ctx = document.getElementById('chart');
            let chart = new Chart(ctx, chartData);
        }
    }

}
