import React from 'react'
import RegisterForm from '../components/RegisterForm'
import { Toaster } from 'react-hot-toast'

const page = () => {
  return (
    <div>
      <RegisterForm />
      <Toaster />
      
    </div>
  )
}

export default page
