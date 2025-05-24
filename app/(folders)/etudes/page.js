//  app/course/page.js

import Etude from '@/app/components/Etude'
import { Toaster } from 'react-hot-toast'


const page = () => {
  return (
       <>
             <div className=''>    
                  <Etude />
                  <Toaster />     
             </div>

          
       </>
  )
}

export default page
