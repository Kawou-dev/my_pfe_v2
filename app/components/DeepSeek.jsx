"use client";
import { useState } from "react";
import { FiCheck, FiCalendar, FiBook, FiSun, FiSearch, FiBell, FiUser } from "react-icons/fi";

export default function Clone() {

    const  time = new Date() ;
    console.log(time)  ; 

  const [activeTab, setActiveTab] = useState("dashboard");
  const [tasks, setTasks] = useState([
    { id: 1, title: "Finir le rapport", done: true, deadline: "2h" },
    { id: 2, title: "Réviser maths", done: false, deadline: "1j" },
    { id: 3, title: "Acheter cadeau", done: false, deadline: "3j" },
  ]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* --- Menu Gauche --- */}
      <div className="w-48 bg-indigo-600 text-white p-4">
        <h1 className="text-xl font-bold mb-8">Planify</h1>
        <nav>
          {[
            { id: "dashboard", icon: <FiSun />, label: "Dashboard" },
            { id: "study", icon: <FiBook />, label: "Études" },
            { id: "todo", icon: <FiCheck />, label: "Todo" },
            { id: "vacation", icon: <FiCalendar />, label: "Vacances" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center w-full p-2 mb-2 rounded-lg ${activeTab === item.id ? "bg-indigo-700" : "hover:bg-indigo-500"}`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* --- Contenu Central --- */}
      <div className="flex-1 p-6">
        {/* Barre Supérieure */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <FiBell className="text-gray-600 text-xl cursor-pointer" />
            <div className="flex items-center">
              <FiUser className="mr-2 text-gray-600" />
              <span className="font-medium">John Doe</span>
            </div>
          </div>
        </div>

        {/* Todo List Urgente */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FiCheck className="mr-2 text-indigo-600" /> Todo List (Urgentes)
          </h2>
          <ul>
            {tasks.map((task) => (
              <li key={task.id} className="flex items-center py-2 border-b border-gray-100">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => {}}
                  className="mr-3 h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className={`flex-1 ${task.done ? "line-through text-gray-400" : ""}`}>
                  {task.title}
                </span>
                <span className="text-sm text-gray-500">{task.deadline}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Progression Études */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FiBook className="mr-2 text-indigo-600" /> Progression des Études
          </h2>
          <div className="flex items-center">
            <div className="w-1/2">
              <p className="text-gray-700 mb-2">Mathématiques</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: "50%" }}></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">5/10 chapitres révisés</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Colonne Droite --- */}
      <div className="w-72 p-6 border-l border-gray-200">
        {/* Calendrier */}
        <div className="bg-white p-4 rounded-xl shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FiCalendar className="mr-2 text-indigo-600" /> Calendrier
          </h2>
          <div className="text-center">
            <p className="text-gray-500 mb-2">15 Octobre 2023</p>
            <div className="bg-indigo-100 text-indigo-800 p-2 rounded-lg mb-2">
              📌 Examen de Maths
            </div>
            <div className="bg-green-100 text-green-800 p-2 rounded-lg">
              ✈️ Voyage à Paris
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4">Statistiques</h2>
          <div className="space-y-3">
            <div>
              <p className="text-gray-600">Tâches accomplies</p>
              <p className="font-bold">3/5</p>
            </div>
            <div>
              <p className="text-gray-600">En retard</p>
              <p className="font-bold text-red-500">1</p>
            </div>
          </div>
        </div>

        {/* Chatbot */}
        <button className="mt-6 bg-indigo-600 text-white py-2 px-4 rounded-lg flex items-center justify-center w-full hover:bg-indigo-700">
          🤖 Besoin d'aide ?
        </button>
      </div>
    </div>
  );
}