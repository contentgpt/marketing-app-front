import React from 'react';
import './Timeline.css';

export default function Timeline({ messages }) {
  
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
