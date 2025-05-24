"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';

const AdminPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [tickets, setTickets] = useState([]);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    if (status === "loading") return;

    if (!session || !session.user?.isAdmin) {
      router.push("/"); 
    } else {
      fetcTickets();
    }
  }, [session, status]);

  const fetcTickets = async () => {
    try {
      const res = await fetch("/api/ticket/reply");
      const data = await res.json();
      setTickets(data.tickets);
    } catch (error) {
      console.log("Erreur", error);
    }
  };

  const handleResponseChange = (ticketId, text) => {
    setResponses({ ...responses, [ticketId]: text });
  };

  const handleSendResponse = async (ticketId) => {
    const res = await fetch("/api/ticket/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ticketId,
        response: responses[ticketId] || "",
      }),
    });

    if (res.ok) {
      // alert("Réponse envoyée !");
      toast.success("Respond sent")
      setResponses((prev) => ({ ...prev, [ticketId]: "" }));
      fetcTickets(); // recharge la liste
    } else {
      alert("Erreur lors de l'envoi.");
    }
  };

  if (status === "loading") {
    return <p>Chargement...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Gestion des Tickets</h1>

      {tickets.length === 0 ? (
        <p>Aucun ticket pour le moment.</p>
      ) : (
        tickets.map((ticket) => (
          <div key={ticket._id} className="border gap-2 p-4 rounded mb-4 bg-white shadow-sm">
            <p><strong>Email :</strong> {ticket.email}</p>
            <p><strong>Question :</strong> {ticket.content}</p>

            {ticket.response && (
              <div className="bg-gray-100 text-gray-800 p-2 rounded mb-2">
                <strong>Réponse envoyée :</strong>
                <p className="whitespace-pre-wrap">{ticket.response}</p>
              </div>
            )}

            <textarea
              className="w-full border mt-2 p-2 rounded"
              placeholder="Écrire une nouvelle réponse..."
              rows={3}
              value={responses[ticket._id] || ""}
              onChange={(e) => handleResponseChange(ticket._id, e.target.value)}
            />

            <button
              onClick={() => handleSendResponse(ticket._id)}
              className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Envoyer la réponse
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminPage;
