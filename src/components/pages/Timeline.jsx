import React from 'react';

export default function Timeline({ messages }) {
  //i think this component rather than adding new responses each time should just map through responses array and render the entire conversation new each time the user submits a prompt
  return (
    <div>{messages.map((message) => (
      <div key={message.content}>
      </div>
    ))}
    </div>

  );
}
