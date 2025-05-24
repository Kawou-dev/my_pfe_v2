import React from 'react'
import LoginForm from '../components/LoginForm'
import { Toaster } from 'react-hot-toast'

const page = () => {
  return (
    <div>
        <LoginForm  />
        <Toaster />
    </div>
  )
}

export default page
