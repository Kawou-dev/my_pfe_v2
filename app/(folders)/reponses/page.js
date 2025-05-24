"use client";
import useTicket from "@/app/hooks/useTicket";
import React, { use, useEffect, useState } from "react";

const Page = () => {

    const {loadingTicket , sendTicket , getTicketRes , ticketRes} = useTicket() ; 


    useEffect(() => {
           getTicketRes()  ;     
    }, [getTicketRes])



  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Vos Questions et Réponses</h1>

      {loadingTicket ? (
        <p>Chargement...</p>
      ) : ticketRes.length === 0 ? (
        <p>Vous n&apos;avez pas encore soumis de ticket.</p>
      ) : (
        ticketRes.map((ticket) => (
          <div key={ticket._id} className="bg-white shadow p-4 mb-4 rounded">
            <p className="mb-1"><strong>Votre message :</strong> {ticket.content}</p>
            {ticket.response ? (
              <p className="text-green-700"><strong>Réponse admin :</strong> {ticket.response}</p>
            ) : (
              <p className="text-gray-500 italic">En attente de réponse...</p>
            )}
          </div>
        ))
      )}
    </div>
//     <div className=" w-[90%] h-screen flex justify-center items-center ">
//     <div class="relative flex items-center w-full">
//   <input
//     type="text"
//     placeholder="Écrivez ici..."
//     class="w-full rounded-l-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
//   />
//   <select
//     onchange="this.previousElementSibling.value = this.value"
//     class="rounded-r-md border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm p-2 border focus:ring-indigo-500 focus:border-indigo-500"
//   >
//     <option value="" selected disabled>Options</option>
//     <option value="Option 1">Option 1</option>
//     <option value="Option 2">Option 2</option>
//     <option value="Option 3">Option 3</option>
//   </select>
// </div>
//  </div>
  );
};

export default Page;
