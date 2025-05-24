"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'

const layout = ({children}) => {

  const router = useRouter();
  const showSidebar = ['/dashboard', '/etudes', '/todo', '/vacances'].includes(router.pathname);


  return (
    <div className='flex gap-3'>
        
        {showSidebar && (
        <nav className="w-1/4 bg-gray-800 text-white p-4">
          <ul>
            <li className="mb-4">
              <Link href="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/etudes">
                Etudes
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/todo">
                    Todo
                </Link>
            </li>
            <li className="mb-4">
              <Link href="/vacances">
                    Vacances
                  </Link>
            </li>
          </ul>
        </nav>
      )}
      

        <main> {children} </main>
    </div>
  )
}

export default layout
