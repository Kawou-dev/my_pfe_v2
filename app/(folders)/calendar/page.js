"use client";
import useCalendar from "@/app/hooks/useCalendar";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { MdEventBusy } from "react-icons/md";
import "react-calendar/dist/Calendar.css";
import { Toaster } from "react-hot-toast";

const Page = () => {
  const [date, setDate] = useState(new Date());
  // const [events, setEvents] = useState([]);
  const [newEventText, setNewEventText] = useState("");

  // const handleAddEvent = () => {
  //   if (newEventText.trim() === "") return;
  //   const newEvent = {
  //     id: Date.now(),
  //     title: newEventText,
  //     date: date.toLocaleDateString("fr-FR"), // stocke la date simple ici (jj/mm/aaaa)
  //   };
  //   setEvents([...events, newEvent]);
  //   setNewEventText("");
  // };


  const [eventName , setEventName] = useState("") ; 
  const [eventDate, setEventDate] = useState(new Date())

  const {fetchEvents , loadingCalendar , addEvent , events, deleteEvent } = useCalendar() ; 


  const handleAddEvent = async() =>{
      await  addEvent({eventName, eventDate}) ; 
      setEventName("") ; 
      setEventDate(null) ; 
      
  }

  useEffect(() => {
    fetchEvents() ; 
  },[fetchEvents])

  const handleDeleteEvent = async(id) => {
        await deleteEvent(id) ; 
  }

  


  return (
    <div className="flex flex-col items-center gap-2 p-4 md:p-6 max-w-4xl mx-auto">
      <div><Toaster/></div>
      <h1 className="text-2xl md:text-3xl font-bold text-green-500 text-center">
        Calendrier
      </h1>

      <div className="w-full mx-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl border rounded-lg shadow-md">
        <Calendar className="w-full calendar-custom" onChange={setEventDate} value={eventDate} />
      </div>


        {/* selected date */}
      <div className="flex flex-col sm:flex-row sm:gap-2 items-center">
        <p className="text-lg md:text-xl text-slate-900">Date sélectionnée:</p>
        <p className="text-lg md:text-xl text-green-400 ml-0 sm:ml-1">
          {date.toLocaleDateString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

            {/* add new Event */}

      <div className="flex flex-col items-center gap-2">
        <input type="text" placeholder="Nom de l'événement" value={eventName} onChange={(e) => setEventName(e.target.value)}
          className="border-2 p-2 rounded w-full max-w-sm" />
        <button onClick={handleAddEvent} className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-600 w-full max-w-sm">
          Ajouter l&apos; événement
        </button>



               {/* All your events */}

          <div className="mt-6 w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-2 text-slate-700">Mes Événements :</h2>
          <ul className="list-disc list-inside">
            {loadingCalendar ? (
              <div>
                     <div role="status">
                                  <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                  </svg>
                                  <span className="sr-only">Loading...</span>
                      </div>
              </div>
            ) : (
                <div>
                  
                </div>
            )}
          {events.map((event, index) => (
            <div key={index}>
                  <li className="flex gap-1 mt-2" > {event?.eventName}{" - "}
                 {new Date(event?.eventDate).toLocaleDateString("fr-FR", {weekday: "long",year: "numeric",month: "long",day: "numeric", })}
                    <button onClick={() => handleDeleteEvent(event._id)} className="border-2 border-black px-2 ml-5 cursor-pointer">X</button>
              </li>
            </div>
              
            ))}

          </ul>
        </div>

        {/* <div className="mt-6 w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-2 text-slate-700">Événements du jour :</h2>
          <ul className="list-disc list-inside">
            {events
              .filter((event) => event.date === date.toLocaleDateString("fr-FR"))
              .map((event) => (
                <li key={event.id} className="text-slate-800">
                  {event.title} {event.date}
                </li>
              ))}
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default Page;
