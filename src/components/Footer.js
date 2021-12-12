import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <div className='offset bg-purple top-slanted-2 z-50'>
                <div className="container mx-auto">
                    <div className='grid grid-cols-12 gap-3 py-28'>
                        <div className='col-span-8'>
                            <p className='font-light green title'>Sources</p>
                            <div className='grid grid-flow-row gap-y-3'>
                                <a className="green"href="https://www.airnow.gov/aqi/aqi-basics/">
                                    AQI meaning
                                </a>
                                <a className="green" href="https://ec.europa.eu/clima/climate-change/causes-climate-change_en ">
                                    Climate change causes
                                </a>
                                <a  className="green"href="https://www.youtube.com/watch?v=yiw6_JakZFc  ">
                                    Kurzgesagt on Climate change
                                </a>
                            </div>
                        </div>
                        <div className='col-span-4'>
                            <p className='font-light green title'>Resources</p>
                            <div className='grid grid-flow-row gap-y-3'>
                                <a className="green"href="https://dev.meteostat.net/">
                                    Meteostat weather API
                                </a>
                                <a className="green" href="https://www.iqair.com/air-pollution-data-api">
                                    IQAir air quality API
                                </a>
                                <a  className="green"href="https://developers.google.com/maps/documentation/javascript/elevation">
                                    Google maps elevation API
                                </a>
                            </div>
                          
                        </div>
                    </div>
                    
                </div>
                <div className='py-3 bg-purple d-flex justify-center items-center bg-green-900'>
                    <p className='green text-center text-sm font-bold'>Copyright Kevin en Denzel 2021 ©</p>
                </div>
            </div>
        )
    }
}
