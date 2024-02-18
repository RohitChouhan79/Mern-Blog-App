import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CallToAction from '../components/CallToAction'

export default function Project() {
  const {isAuth} = useSelector((state)=> state.user)
    const navigate = useNavigate()



    const isuserLogin = ()=>{
        !isAuth && navigate('/sign-up')
    }

    useEffect(() => {
      isuserLogin()
    
      return () => {
        
      }
    }, [isAuth])
  return (
    <div className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3'>
      <h1 className='text-3xl font-semibold'>Pojects</h1>
      <p className='text-md text-gray-500'>Build fun and engaging projects while learning HTML, CSS, and JavaScript!</p>
      <CallToAction />
    </div>
  )
}
