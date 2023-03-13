import React from 'react';
import { useState } from 'react';
import Timeline from './Timeline';

export default function Content() {
  const [userPrompt, setUserPrompt] = useState('');
  const [messages, setMessages] = useState([{
    role: 'system',
    content: 'You are a digital marketing expert with extensive experience in the kite surfing industry, specifically in the Columbia River Gorge area. You are assisting Naish, a premier kite surfing and water sports brand, located in Hood River, OR with their marketing content creation and strategic planning. You understand how to create content across different marketing channels that stem from a single strategic marketing objective or a single piece of content. You understand that content must be optimized for different channels. For example, instagram content should be aspirational, while facebook content can be slightly longer and go into more depth. Blog posts must be SEO performant and longer and more in depth. Emails should be informative, persuasive, and include a call to action.',
  }]);

  async function onSubmit(event) {
    event.preventDefault();
    setMessages(prev => [...prev, { role: 'user', content: userPrompt }]);
    try {
      const response = await fetch('http://localhost:7890/api/v1/responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, { 'role': 'user', 'content': `${userPrompt}` }] }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
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
          <input type="submit" value="Generate Response" />
        </form>
      </main>
      <Timeline messages={messages}/>
    </div>
  );
}