"use client";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";
import { MdLogout } from "react-icons/md";
import { MdArrowBack } from "react-icons/md"; // Icone pour le bouton retour
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useState } from "react";

const Header = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleAccount = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-between items-center h-16 w-full shadow-md px-4 md:px-16 relative">
      {/* Input qui s'adapte */}
      {isSearchOpen ? (
        <div className="absolute left-0 top-2 w-[95%] max-w-[300px] flex items-center gap-2">
          {/* Bouton de retour */}
          <button
            className="text-xl text-black"
            onClick={() => setIsSearchOpen(false)}
          >
            <MdArrowBack />
          </button>
          {/* Input avec icône de recherche */}
          <form className="relative w-full">
            <input
              autoFocus
              placeholder="Enter your search"
              className="w-full pl-4 pr-10 border p-2 rounded-full text-sm"
              type="text"
            />
            <button
              className="absolute text-black right-3 top-1/2 -translate-y-1/2 text-lg"
              type="button"
            >
              <CiSearch />
            </button>
          </form>
        </div>
      ) : (
        <div className="hidden md:block w-1/3">
          <form className="relative w-full">
            <input
              placeholder="Enter your search"
              className="w-full pl-4 pr-10 border p-2 rounded-full"
              type="text"
            />
            <button
              className="absolute text-black right-3 top-1/2 -translate-y-1/2 text-xl"
              type="button"
            >
              <CiSearch />
            </button>
          </form>
        </div>
      )}

      {/* Icônes à droite */}
      <div className="flex items-center gap-5 ml-auto">
        {/* Icône search pour afficher l'input sur petit écran */}
        {!isSearchOpen && (
          <button
            className="text-2xl cursor-pointer md:hidden"
            onClick={() => setIsSearchOpen(true)}
          >
            <CiSearch />
          </button>
        )}

        <div className="text-2xl cursor-pointer">
          <IoIosNotificationsOutline />
        </div>

        <div className="text-2xl cursor-pointer relative">
          <VscAccount onClick={handleAccount} />

          {isOpen && (
            <div className="absolute right-[-60px] top-11 bg-slate-700 text-white w-[250px] h-[300px] border-2 border-black rounded-3xl">
              <div className="flex flex-col justify-center items-center mt-2">
                <span className="text-xl">{session?.user?.username}</span>
                <span className="text-xl">{session?.user?.email}</span>
              </div>
              <div className="mt-8 flex justify-center">
                <MdLogout className="text-2xl" />
                <p
                  onClick={() => signOut()}
                  className="text-xl cursor-pointer ml-3"
                >
                  Se déconnecter
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
