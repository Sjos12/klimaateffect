import React, { Component } from 'react'
import { ReactComponent as GreenWave } from '../images/green-wave.svg';
export default class CallToAction extends Component {
    render() {
        return (
            <div className='offset top-slanted'>            
                <div className='bg-darkgreen'>
                    <div className="container mx-auto py-60">
                    <h1 className='title--white text-center'>How can you help?</h1>
                        <div className="grid grid-cols-2 gap-5">
                            <p className='paragraph--white'>
                                According to the World Health Organization, “Ambient air pollution accounts for an estimated 4.2 million deaths per year due to stroke, heart disease, lung cancer, lung cancer, acute and chronic respiratory diseases.” Air pollution commonly affects citizens from south-east Asian nations like China or India, where the combination of an immense number of people and polluting factories with very few guidelines creates many environmental and health issues. In total, “99 percent of the world’s population live in places where air quality exceeds WHO guideline limits.
                            </p>
                            <p className='paragraph--white'>
                            But now the question arises: how do I make a difference? Well, the simple answer is: you can’t (at least not alone). Even if you would live your whole life without polluting the air (no car, no imported foods, etc.), this would be similar to taking away one second of air pollution. What actually is important, is reaching a larger audience, especially the higher-ups. Those are people who can make a difference; they can invest in clean energy, convince everyone on a large scale and stop polluting processes. Also try to think big: invent ways to alert masses of people in large communities. The only way for you to make a change is to inspire others.
                            </p>
                        </div>
                    </div> 
                </div>
            </div>
        )
    }
}
