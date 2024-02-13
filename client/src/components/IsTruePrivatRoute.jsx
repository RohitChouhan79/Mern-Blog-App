import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export default function IsTruePrivateRoute() {
    
    const {isAuth}=useSelector((state)=>state.user)
    return isAuth && isAuth ? <Outlet />:<Navigate to="sign-in" />

}
