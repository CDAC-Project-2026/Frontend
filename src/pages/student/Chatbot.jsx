import React, { useState } from 'react';
import { SparklesIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I am your AI Study Assistant. Ask me anything about C++, Java, or Database systems.", sender: "bot" }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

        const userMessage = { id: Date.now(), text: inputValue, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

       setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: `You asked about "${userMessage.text}". This is an AI generated response!`,
        sender: "bot"
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-6rem)] bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
      
            <div className="bg-gradient-to-r from-blue-700 to-blue-500 px-6 py-4 flex items-center gap-4 text-white shadow-sm">
        <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
          <SparklesIcon className="w-6 h-6 text-blue-50" />
        </div>
        <div>
          <h2 className="font-bold text-lg tracking-wide">AI Support Portal</h2>
          <p className="text-xs text-blue-100 font-medium">Ask coding doubts instantly</p>
        </div>
      </div>

            <div className="flex-grow p-6 overflow-y-auto space-y-6 bg-gray-50/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] md:max-w-md p-4 rounded-2xl text-sm shadow-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 flex gap-3 items-center">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your query here..."
          className="flex-grow px-5 py-3 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 transition-all"
        />
        <button
          type="submit"
          className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center group"
        >
          <PaperAirplaneIcon className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </form>
    </div>
  );
};

export default Chatbot;