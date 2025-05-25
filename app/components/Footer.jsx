import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='text-white'>
        <footer className="bg-slate-500 text-white rounded-lg shadow-md  m-4">
  <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
    <div className="sm:flex sm:items-center sm:justify-between">
      <div className="p-5 shadow-xl shadow-gray-800 ">
        <Link href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
          <img src="/images/TanzimLy1.png" className="h-8 shadow-md" alt="TanzimLy Logo" loading="lazy" />
          <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">TanzimLy</span>
        </Link>
      </div>
      <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 dark:text-white">
        <li>
          <Link href="/" className="hover:underline me-4 md:me-6">Accueil</Link>
        </li>
        <li>
          <Link href="/propos" className="hover:underline me-4 md:me-6">A propos de nous</Link>
        </li>
        <li>
          <Link href="/auteur" className="hover:underline me-4 md:me-6">Auteurs</Link>
        </li>
        <li>
          <Link href="/politique" className="hover:underline">Confidentialité</Link>
        </li>
      </ul>
    </div>
    <hr className="my-4 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-5" />
    <span className="block text-sm  sm:text-center ">
      © 2025 <Link href="/" className="hover:underline">TanzimLy™</Link>. Tous droits réservés.
    </span>
  </div>
</footer>
      
    </div>
  )
}

export default Footer
