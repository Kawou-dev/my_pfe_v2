"use client";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";
import { MdArrowBack } from "react-icons/md"; 
import { MdLogout } from "react-icons/md";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { IoCalendarNumberOutline } from "react-icons/io5";
import Image from "next/image";
import useTicket from "../hooks/useTicket";


const Header = () => {
  const { data: session } = useSession();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const accountRef = useRef(null); 
   
  const toggleSearchInput = () => {
    setIsSearchOpen(!isSearchOpen); 
  };

  const opVsAccount = () => {
    setIsAccountOpen(!isAccountOpen);
  };

  const targetHref = session?.user?.isAdmin ? "/admin" : "/reponses";

  const {getNbreUnread , nbreUnread, markAsSeen} = useTicket() ; 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setIsAccountOpen(false); 
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside); 
  }, []);
  // console.log(session?.user?.profilePic)

  useEffect(()=> {
       getNbreUnread() ; 
  }, [getNbreUnread])

  const handleReadNotif = async() => {
       await markAsSeen() ; 
  }

  return (
    <div className="flex  justify-between items-center h-16 w-full shadow-md px-4 md:px-16 relative">
     
      <div className="ml-12 text-2xl md:hidden flex items-center">
        <h1>Kawou</h1>
      </div>

      <div className="flex items-center">
       
        {!isSearchOpen && (
          <form className="hidden md:flex relative">
          
            <input
              className="border rounded-full pl-3 p-[2px]"
              type="text"
              placeholder="Search..."
            />
            <button
              className="text-xl absolute right-1 top-[6px] cursor-pointer aspect-square rounded-full"
              type="submit"
            >
              <CiSearch />
            </button>
          </form>
        )}

        {isSearchOpen && (
          <form className="flex relative">
         
            <button
              className="mr-2 text-xl cursor-pointer"
              onClick={toggleSearchInput}
            >
              <MdArrowBack className="md:hidden" /> 
            </button>
            <input
              className="border rounded-full pl-3 p-[2px]"
              type="text"
              placeholder="Search..."
            />
            <button
              className="text-xl absolute right-1 top-[6px] cursor-pointer aspect-square rounded-full"
              type="submit"
            >
              <CiSearch />
            </button>
          </form>
        )}
      </div>

   
      <div className="flex items-center gap-5">
        {!isSearchOpen && (
          <div className="md:hidden">
          
            <CiSearch
              className="text-xl cursor-pointer" onClick={toggleSearchInput}
            />
          </div>
        )}
          <Link href={targetHref}>
              <div className="relative" onClick={handleReadNotif}>
               <span className={`absolute text-sm rounded-full w-4 text-center  bg-red-600 text-white top-[-6px]   left-5 ${nbreUnread == 0 ? 'hidden' : 'absolute' }   `}> {nbreUnread} </span>
              <IoIosNotificationsOutline className="text-2xl cursor-pointer" />
            </div>
          </Link>
        <div className="relative" ref={accountRef}>
          <VscAccount
            className="text-xl cursor-pointer"
            onClick={opVsAccount}
          />
     
          {isAccountOpen && (
  <div className="absolute z-50 border-2 w-[220px] h-[300px] top-11 md:right-[-60px] right-[-15px] rounded-2xl bg-slate-800 shadow-lg">
    <div className="text-white py-4  flex flex-col items-center justify-center space-y-4">
      
      {/* Profile Section */}
      <div className="text-center flex justify-center flex-col items-center   ">
         
        <a href={session?.user?.profilePic}>
          
          <Image 
            // src={session?.user?.profilePic || "aaaaa"}
            src={ session?.user?.isAdmin  ?  "https://res.cloudinary.com/dvnsrfsic/image/upload/v1746581898/cxoxegoedy3afxfw6hz0.jpg"  :  session?.user?.profilePic }
            // src={ session?.user?.isAdmin  ?  "aaaa"  :  session?.user?.profilePic }

            alt="Profile"  width={64} height={64}
            className="w-16 h-16 rounded-full object-cover border-2 border-white mb-2"

          />
        </a>
        <h4 className="text-lg font-semibold">{session?.user?.username}</h4>
        <p className="text-sm">{session?.user?.email}</p>
      </div>

      {/* Divider */}
      <hr className="border-gray-300 w-[90%] mb-4" />

      {/* Calendar Link */}
      <div className="flex w-full items-center gap-2 px-6 pt-2  cursor-pointer hover:bg-slate-600 transition duration-200">
        <div className="text-2xl text-white">
          <IoCalendarNumberOutline />
        </div>  
        <div>
          <Link href={"/calendar"}>
            <h1 className="pl-2 font-medium">Calendrier</h1>
          </Link>
        </div>
      </div>

      {/* Logout Button */}
      <div
        onClick={() => signOut()}
        className="flex w-full items-center gap-2 px-6 py-1  cursor-pointer hover:bg-slate-600 transition duration-200"
      >
        <div className="text-xl text-white">
          <MdLogout />
        </div>
        <div>
          <h1 className="font-medium">Se déconnecter</h1>
        </div>
      </div>
    </div>
  </div>
)}

        </div>
      </div>
    </div>
  );
};

export default Header;