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
