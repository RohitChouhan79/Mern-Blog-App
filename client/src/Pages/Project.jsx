import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

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
    <div>Project</div>
  )
}
