import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

const layout = ({children}) => {
  return (
    <div className="flex h-screen  overflow-x-hidden ">
   
    <Sidebar className="w-64 fixed z-50 bg-gray-800 text-white h-screen" />
  
   
    <div className="flex flex-col flex-1">
      
      <Header className="fixed top-0 left-64 right-0 h-16 bg-white   shadow-md z-10" />
  
     
      <div className="flex-1 overflow-auto   bg-[#f0f0f0]">
        {children}
      </div>
    </div>
  </div>
  )
}

export default layout
