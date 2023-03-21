import React, { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { redirect } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Conversation from './Conversation';

export default function Creator() {
  const [userPrompt, setUserPrompt] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'system',
      content:
        'You are a digital marketing expert with extensive experience in the mountain biking and gravel biking industries. You are assisting Mountain View Cycles, a premier local bike shop, located in Hood River, OR with their marketing content creation and strategic planning. You understand how to create content across different marketing channels that stem from a single strategic marketing objective or a single piece of content. You understand that content must be optimized for different channels. For example, instagram content should be aspirational, while facebook content can be slightly longer and go into more depth. Blog posts must be SEO performant and longer and more in depth. Emails should be informative, persuasive, and include a call to action. Mountain View Cycles" primary objective is to increase direct to consumer sales on its e-commerce platform, and increase SEO to drive tourist traffic into the store.',
    },
  ]);

  useEffect(() => {
    // if last message in messages has role of user, run the API call
    if (messages[messages.length - 1].role === 'user') {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:7890/api/v1/responses', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              messages: [...messages, { role: 'user', content: `${userPrompt}` }],
            }),
          });

          const data = await response.json();
          if (response.status !== 200) {
            throw data.error || new Error(`Request failed with status ${response.status}`);
          }

          setMessages((prev) => [...prev, { role: 'assistant', content: data.response }]);
          setUserPrompt('');
        } catch (error) {
          console.error(error);
          alert(error.message);
        }
      };
      fetchData();
    } else {
      return;
    }
  }, [messages, userPrompt]);

  async function onSubmit(event) {
    event.preventDefault();
    setMessages((prev) => [...prev, { role: 'user', content: userPrompt }]);
  }

  return (
    <div>
      <main className="submit-form">
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
      <Conversation messages={messages} />
    </div>
  );
}
