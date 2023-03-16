import React from 'react';
import './Conversation.css';

export default function Conversation({ messages }) {
  
  return (
    <>
      <div className='messages-container'>{messages.map((message) => (
        <div className={`${message.role}`} key={message.content}>{message.content}
        </div>
      ))}
      </div>
    </>
  );
}
