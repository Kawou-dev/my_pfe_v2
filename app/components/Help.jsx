"use client"
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { VscSend } from 'react-icons/vsc';
import useTicket from '../hooks/useTicket';

const Help = () => {
  const { data: session } = useSession();

  const [feedfeedback, setFeedback] = useState({
    email: session?.user?.email || '',
    content: ''
  });

  useEffect(() => {
    if (session?.user?.email) {
      setFeedback(prev => ({ ...prev, email: session.user.email }));
    }
  }, [session]);

  const { loadingTicket, sendTicket } = useTicket();

  const handleSendTicket = async () => {
    if (!feedfeedback.content.trim()) return; 
    await sendTicket(feedfeedback);
    setFeedback({ email: session?.user?.email || '', content: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Besoin d’aide ou d’assistance ?
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Décris ton problème, une question, ou toute suggestion que tu aimerais partager.
        </p>

        <textarea
          value={feedfeedback.content}
          onChange={(e) =>
            setFeedback({ ...feedfeedback, content: e.target.value })
          }
          placeholder="Décrivez votre problème ici..."
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none text-gray-800"
          rows={6}
        />

        <div className="flex justify-end mt-4">
          <button
            onClick={handleSendTicket}
            disabled={loadingTicket}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg transition ${
              loadingTicket
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            <VscSend className="text-xl" />
            {loadingTicket ? 'Envoi...' : 'Envoyer'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Help;
