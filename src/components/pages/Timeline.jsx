import React from 'react';

export default function Timeline({ responses }) {

  return (
    <div>{responses.map((response) => (
      <div key={response.value}>
      </div>
    ))}
    </div>

  );
}
