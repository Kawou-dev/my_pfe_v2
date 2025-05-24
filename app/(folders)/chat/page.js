import Chatbot from '@/app/components/Chatbot'
import { ChatDemo } from '@/components/Chat-demo'
import React from 'react'
import { Toaster } from 'react-hot-toast'

const page = () => {
  return (
    <div className=' '>
          <div className=' '>
              <Chatbot />
              <Toaster />
          </div>
    </div>
  )
}

export default page
