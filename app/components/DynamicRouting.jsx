import Link from 'next/link'
import React from 'react'

 export const courses = [
    {id : 1 ,  title : "Reseaux" , notes : "Must master the network"} , 
    {id : 2 ,  title : "Gestion" , notes : "Must master the time management"} , 
    {id : 3 ,  title : "Php" , notes : "Must master the tps"} , 
  ]


const DynamicRouting = () => {
  return (
    <div>

        <h1>From  DynamicRouting</h1>
        <div className='border-2 p-5 mt-5'>
            {courses.map((course , index) => (
                <div key={index}>
                      <Link href={`/etudes/${course.id}`} > <h1> {course.title} </h1></Link>
                </div>
            ))}
        </div>
      
    </div>
  )
}

export default DynamicRouting
