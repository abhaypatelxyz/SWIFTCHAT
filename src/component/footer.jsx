import React, { useState } from 'react';
import '../style/footer.css';

const Footer = ({ socket }) => {
    const [message, setMessage] = useState("");

    const send = () => {
        if (socket) {
            socket.emit('send', { message });
            setMessage("");
        }
    };

    return (
        <div id='input-div'>
            <input onChange={(e) => setMessage(e.target.value)} value={message} placeholder='type msg' />
            <button onClick={send}>
                <i className="fa-solid fa-paper-plane fa-2xl"></i>
            </button>
        </div>
    );
}

export default Footer;
