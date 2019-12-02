import React from 'react'

import { blockStatement } from '@babel/types';

import Mike from '../../Website_About_Me.jpg';

export default function About() {

    return (

       <div>

        <div>

            <img src={Mike} alt=""style={pstyle} className="p-3" />

        </div>

        <div className="container-fluid">
            
        <div style={sstyle} className="pt-2 text-right pr-2">

<p>I'm a portrait photographer based in St. Louis, Missouri. Born in Los Angeles California, I moved to St. Louis when I was 8 years old. I’ve spent my whole life in the arts. From performing arts to now visual art. I have a Bachelor of Arts in Digital Photography from the Art Institute of St. Louis.</p>
<p>I primarily shoot digital. I also like to build sets for photo shoots so I can often distinguish reality from fantasy. I’ve had work published in a local magazine, shot for St. Louis Fashion Week, and worked with other artists. </p>
<p>Roscoe Flora provides expressive, fashionable, top quality photographs that resonate with the individual’s personality and style. I am available for portrait shoots in studio and on location, as well as events in the St. Louis Metropolitan area. I’d love to hear from you so feel free to hit me up!
</p>

</div></div>
        
        </div>
    );
}

const linkstyle = {
    color: '#333',
    
    textDecoration: 'none'}
        
const sstyle = {
    fontFamily: 'monospace',
    textAlign: 'right'
}

const pstyle ={
    display: 'center',
    width: '400px',
    height: 'auto',
    float: 'left'


}




