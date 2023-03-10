import React from 'react';

export default function Timeline({ messages }) {

  return (
    <div>{messages.map((message) => (
      <div key={message.content}>
      </div>
    ))}
    </div>

  );
}
