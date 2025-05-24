'use client';
import toast from 'react-hot-toast';
import { useState, useRef, useEffect } from 'react';

export default function Chatbot() {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll vers le bas quand de nouveaux messages arrivent
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = { text: inputMessage, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputMessage }),
      });
      const data = await res.json();
      if(data.error) throw new Error(data.error) ; 
      if(!res.ok) throw new Error(res.error) ;
      setMessages(prev => [...prev, { text: data.reply, sender: 'bot' }]);
    } catch (error) {
      toast.error(error.message) ; 
      setMessages(prev => [...prev, { text: "Vous avez atteint la limite journalière, revenez demain", sender: 'bot' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center px-4 py-8   ">
      <div className="w-full max-w-2xl flex flex-col h-full">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-white text-blackp-3 rounded-full">
            {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg> */}
          </div>
          <h1 className="text-3xl font-bold ml-3 text-blue-400">Chatbot</h1>
        </div>

        {/* Zone de conversation */}
        <div className="flex-1 text-black border rounded-lg p-4 mb-4 overflow-y-auto max-h-[60vh]">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-xl ">
              <p>Comment puis-je vous aider ? </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${msg.sender === 'user' 
                      ? 'bg-blue-600 rounded-tr-none' 
                      : 'bg-gray-700 rounded-tl-none'}`}
                  >
                    <p className="text-white">{msg.text}</p>
                    <p className="text-xs text-gray-300 mt-1 text-right">
                      {msg.sender === 'user' ? 'Vous' : 'Bot'} • {new Date().toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-500 rounded-lg rounded-tl-none px-4 py-2">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Formulaire d'envoi */}
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Tapez votre message..."
            className="flex-1 p-3 rounded border-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !inputMessage.trim()}
            className=" disabled:cursor-not-allowed cursor-pointer  border-2  p-3 rounded font-semibold flex items-center justify-center w-24"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Envoyer'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}