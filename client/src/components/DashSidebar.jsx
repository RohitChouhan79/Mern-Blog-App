import React, { useEffect, useState } from 'react'
import {  Sidebar} from 'flowbite-react'
import { FaUser } from "react-icons/fa";
import { HiArrowSmRight } from "react-icons/hi";
import { useLocation,Link } from 'react-router-dom';
import axios from '../config/axios';
import { useDispatch } from 'react-redux';
import { signinFailure, signoutStart, signoutUser } from '../redux/user/userSlice';


export default function DashSidebar() {
    const location=useLocation();
    const dispatch=useDispatch();
    const [tab, setTab] = useState('')
  useEffect(()=>{
    const urlParams=new URLSearchParams(location.search)
    const tabFormUrl=urlParams.get('tab'); 
    // console.log(tabFormUrl)
    if(tabFormUrl){
      setTab(tabFormUrl)
    } 

  },[location.search])
  const handleSignOut= async (e) =>{
    try {
        dispatch(signoutStart())
        const response = await axios.post(`/api/auth/signout`)
        const data=response.data
        if(response.status===200){
            dispatch(signoutUser(data))
        }else{
            dispatch(signinFailure(data.message))
        }
    } catch (error) {
        dispatch(signinFailure(error.message))
    }
   }
  return (
    <Sidebar className=' w-full md:w-56'>
        <Sidebar.Items>
        <Sidebar.ItemGroup>
                <Link to='/dashboard?tab=profile'>
                    <Sidebar.Item active={tab==='profile'} icon={FaUser} label={"User"} labelColor='dark' as='div' >
                    
                    <span>Profile</span>
                    </Sidebar.Item>
                </Link>

                <Sidebar.Item   icon={HiArrowSmRight} className=' cursor-pointer' onClick={handleSignOut}>
                    SignOut
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}


{/* <Sidebar.Item active icon={<FaUser />} label={'User'} labelColor='dark'>
                    Profile
                </Sidebar.Item>
                <Sidebar.Item active icon={< />} >
                    SignOut
                </Sidebar.Item> */}