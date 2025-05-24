
// app/course/[id]/page.js
import CourseDetail from '@/app/components/CourseDetail'
import { Toaster } from 'react-hot-toast'
const page = () => {



  return (
    <div className='mx-auto'>
        <CourseDetail />
        <Toaster />
    </div>
  )
}

export default page
