import React from 'react';
import '../style/textChats.css';

function TextChats({ message}) {
  return (
    <>
    <div className={`chat-bubble chat-${message.side}`}>
      {message.text}
    </div>
    </>
  );
}

export default TextChats;
