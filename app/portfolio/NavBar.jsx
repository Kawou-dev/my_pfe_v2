"use client"

import Link from "next/link"
import { CheckIcon, Menu, X } from "lucide-react"
import { useState } from "react"
import Image from "next/image"


const NavBar = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false)
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen)
    }
  return (
    <div>
        <header className="md:w-full w-full flex items-center justify-between py-6 px-8 shadow-md bg-white sticky top-0 z-10">
      
        <div >
            <div className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <Image   className="drop-shadow-xl shadow-xl  hover:scale-105 transition-transform"
                  src="/images/TanzimLy1.png"
                  alt="Logo Kawou"
                  width={100}   height={150} 
                  //  width="auto" height="auto"
                 />
          
              <h1 className="text-xl font-bold uppercase tracking-wider  dark:text-white ">
                  TanzimLy
              </h1>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <Link href="/" className="text-lg hover:text-gray-600 px-3">
            Accueil
          </Link>
          <Link href="/propos" className="text-lg hover:text-gray-600 px-3">
            A propos de nous
          </Link>
          <Link href="/auteur" className="text-lg hover:text-gray-600 px-3">
            Auteurs
          </Link> 
        </nav>

        <div className="hidden md:flex items-center gap-4">
        <Link
            href="/register"
            className="text-lg border border-red-600 text-red-600 hover:bg-red-50 px-4 py-2 rounded-md font-medium"
          >
            S'inscrire
          </Link>
          <Link href="/login" className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-md font-medium">
           Se connecter
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden  ">
          <button className="p-2 cursor-pointer  " onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>



        
      </header>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white w-full shadow-md py-4 px-8 absolute top-[78px] z-10 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-lg py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
                Accueil
            </Link>
             <Link href="/propos" className="text-lg py-2 border-b border-gray-100" onClick={() => setIsMenuOpen(false)}>
             A propos de nous
            </Link>
            <Link href="/auteur" className="text-lg py-2 border-b border-gray-100" onClick={() => setIsMenuOpen(false)}>
             Auteurs
            </Link>
            <div className="flex flex-col space-y-3 pt-2">
              <Link
                href="/register"
                className="text-lg border border-red-600 text-red-600 hover:bg-red-50 px-6 py-3 rounded-md font-medium text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                S'inscrire
              </Link>
              <Link
                href="/login"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-medium text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Se connecter
              </Link>
            </div>
          </nav>
        </div>
      )}

    </div>
  )
}

export default NavBar