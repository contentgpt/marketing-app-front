import React from 'react';
import { useState } from 'react';
import Timeline from './Timeline';

export default function Content() {
  const [userPrompt, setUserPrompt] = useState('');
  const [messages, setMessages] = useState([
    { 
      'role': 'system', 
      'content': 'You are an expert marketing content writer for small businesses in the North American outdoor industry.' 
    },
  ]);

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:7890/api/v1/responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, { 'role': 'user', 'content': 'I am a hardcoded user prompt' }] }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      console.log('data', data);
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      setUserPrompt('');
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }
  
  console.log(messages);
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
          <input type="submit" value="Generate Response" />
        </form>
      </main>
      <Timeline messages={messages}/>
    </div>
  );
}