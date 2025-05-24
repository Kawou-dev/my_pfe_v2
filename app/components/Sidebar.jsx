"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; 


import { IoCalendarNumberOutline, IoHomeOutline } from "react-icons/io5";
import { FaBookReader } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";
import { FaUmbrellaBeach } from "react-icons/fa6";
import { FiBook } from "react-icons/fi";
import { LuNotebook } from "react-icons/lu";
import { BiCommentError } from "react-icons/bi";

import { IoIosHelpCircleOutline } from "react-icons/io";
import { FaRobot } from "react-icons/fa";
import Image from "next/image";
import { MdLogout } from "react-icons/md";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" , icones : <IoHomeOutline /> },
    { name: "Étude", path: "/etudes" , icones : <LuNotebook /> },
    { name: "To do", path: "/todo" , icones : <LuListTodo /> },
    { name: "Vacances", path: "/vacances" , icones : <FaUmbrellaBeach /> },

    
  ];

  const items = [
        
         { name: "Chatbot", path: "/chat" , icones : <FaRobot /> },
           { name: "Calendrier", path: "/calendar" , icones :    <IoCalendarNumberOutline />},
         { name: "Contacter l'admin", path: "/aide" , icones : <BiCommentError /> },
       

  ]

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".sidebar")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  const closeSideBar = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  }

  return (
    <>
 
      <button 
        className="md:hidden text-2xl cursor-pointer fixed top-3 left-5 z-60 text-black p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="text-white top-6" size={24} /> : <Menu size={24} />}
      </button>

    
      <nav 
        className={`sidebar fixed md:rounded-none rounded-r-2xl  z-50 top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0 md:relative`}
      >
      
      <div className="flex items-center gap-2 hover:opacity-90 transition-opacity">
    <Image   className="drop-shadow-md  hover:scale-105 transition-transform  "
        src="/images/TanzimLy1.png"
        alt="Logo Kawou"
        width={100}   height={75} 
        //  width="auto" height="auto"
       />

    <h1 className="text-2xl font-bold font-sans uppercase   tracking-wider  dark:text-white ">
        TanzimLy

        {/* font-stretch-50%  */}
    </h1>
</div>
          <hr className="text-white   mt-2" />

       
          <ul className="mt-3">
          {menuItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <li
                className={`mb-1 p-2 rounded ${pathname === item.path ? "bg-gray-600" : ""} hover:bg-gray-700`}
                onClick={closeSideBar}
              >
                <div className="flex items-center gap-2">
                   <span className="text-xl"> {item.icones}</span>
                  {item.name}
                </div>
              </li>
            </Link>
          ))}
        </ul>

        <hr className="mt-3" />
        <ul className="mt-3"> 
            {items.map((item) => (
            <Link key={item.path} href={item.path}>
                  <li
                    className={`mb-1 p-2 rounded ${pathname === item.path ? "bg-gray-600" : ""} hover:bg-gray-700`}
                    onClick={closeSideBar}
                  >
                    <div className="flex items-center gap-2">
                       <span className="text-xl">{item.icones}</span>  
                      {item.name}
                    </div>
                    

                  </li>
                </Link>
            ))}
            <li  className="p-2 hover:bg-gray-700 rounded cursor-pointer">
             <div  onClick={() => signOut()}  className="flex items-center gap-2 ">
                       <span className="text-xl"> <MdLogout />  </span>  
                        Se déconnecter
                 </div>
                </li>
         </ul>

      </nav>
    </>
  );
};

export default Sidebar;
