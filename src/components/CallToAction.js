import React, { Component } from 'react'
import { ReactComponent as GreenWave } from '../images/green-wave.svg';
export default class CallToAction extends Component {
    render() {
        return (
            <div className='offset top-slanted'>            
                <div className='bg-green'>
                    <div className="container mx-auto py-60">
                    <h1 className='title purple text-5xl text-center'>How can you help?</h1>
                        <div className="grid lg:grid-cols-2 lg:grid-flow-col grid-flow-row gap-y-10 lg:gap-y-0 md:gap-x-5">
                            <p className='paragraph'>
                             
According to the World Health Organization, “Ambient air pollution accounts for an estimated 4.2 million deaths per year due to stroke, heart disease, lung cancer, lung cancer, acute and chronic respiratory diseases.” Air pollution commonly affects citizens from south-east Asian nations like China or India, where the combination of an immense number of people and polluting factories with very few guidelines creates many environmental and health issues. In total, “99 percent of the world’s population live in places where air quality exceeds WHO guideline limits. Air pollution is strongly connected to other problems like climate change and rising sea levels, and you are the one who should help resolve these issues.

                            </p>
                            <p className='paragraph'>
                            But now the question arises: how do I make a difference? Although doing your little part by trying to reduce your ecological footprint might seem like a good idea, this is not very effective. What actually is important, is reaching important people: politicians ad CEOs for example can make drastic changes; investing in clean energy, banning polluting processes and planting forests for example. But how do you reach these people? By trying to think big: inspire large crowds of people and become noticed. We can see today that the only way to get your point across is in numbers. Think of a creative way to get your point across, and most important of all: never lose hope and try to stay positive.
                            </p>
                        </div>
                    </div> 
                </div>
            </div>
        )
    }
}
