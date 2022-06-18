import React from 'react'

import ScrollToBottom from 'react-scroll-to-bottom'

import ChatMessage from '../ChatMessage/ChatMessage'
import './Messages.css';

const Messages = ({ messages, name }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => <div key={i}><ChatMessage message={message} name={name}/></div>)}
  </ScrollToBottom>
);

export default Messages;