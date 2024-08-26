import React from 'react'
import '../style/messageComponent.css'

import google from '../assets/google.png'
function messageComponent({name,onClick}) {
    return (
        <div id='message-compontnt-parent' onClick={onClick}>
            <img src={google} id='message-component-image'></img>
            <div id='message-component-name'>
                <p id='message-component-name-p'>{name.toUpperCase()}
                    
                <p id='message-component-name-typing'>Typing...</p>
                </p>
            </div>
            <div id='message-component-time'>
                <p>05:11 PM</p>
                <div id='message-component-time-div'>2</div>
            </div>
        </div>
    )
}

export default messageComponent
