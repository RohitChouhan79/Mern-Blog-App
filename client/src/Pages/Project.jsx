import React, { useEffect } from 'react'


export default function Project() {
 
  return (
    <div className=' min-h-screen max-w-2xl mx-auto flex  items-center flex-col gap-6 p-3'>
      <h1 className='text-3xl font-semibold'>Projects</h1>
      <br />
      <h2 className='text-xl font-semibold'>Book App</h2>
      <p className='text-md text-gray-500'>Book App
Created Book App with Node.js, Express.js, and JavaScript. Enables seamless book management: add, update, delete. Enhances productivity, organization, and user experience for Register their books.</p>
<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
  <a href="https://github.com">Let's Check it</a>
</button>

    </div>
  )
}
