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
                    <h1 className='title purple'>Average Temperature.</h1>
                    <div className="grid grid-cols-12 gap-2">
                        <div className='col-span-5'>
                            <p className='paragraph'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas, voluptates? Temporibus asperiores laboriosam dolor, nemo optio voluptatum eligendi, fugit enim beatae voluptatem veritatis accusamus fugiat. Nisi amet omnis ab. Maiores.</p>
                        </div>
                        <div className='col-span-7'>
                            <canvas className='chart' id="chart"></canvas>
                        </div>
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
