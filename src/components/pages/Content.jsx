import React from 'react';
import { useState } from 'react';

export default function Content() {
  const [userPrompt, setUserPrompt] = useState('Prompt the AI');
  const [response, setResponse] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:7890/api/v1/responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userPrompt }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      
      setResponse(data.response);
      setUserPrompt('');
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <main>
        <h3>What do you want to create?</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="prompt"
            placeholder="Prompt the AI"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>
        <div>{response}</div>
      </main>
    </div>
  );
}