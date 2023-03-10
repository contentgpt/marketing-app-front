import React from 'react';

export default function Timeline({ messages }) {
  console.log('timeline messages', messages);
  return (
    <div>{messages.map((message) => (
      <div key={message.content}>{message.content}
      </div>
    ))}
    </div>

  );
}
