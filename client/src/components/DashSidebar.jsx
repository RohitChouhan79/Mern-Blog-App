import React, { useEffect, useState } from 'react'
import {  Sidebar} from 'flowbite-react'
import { FaUser } from "react-icons/fa";
import { HiAnnotation, HiArrowSmRight,HiChartPie,HiOutlineUserGroup } from "react-icons/hi";
import { IoDocumentTextSharp } from "react-icons/io5";
import { useLocation,Link } from 'react-router-dom';
import axios from '../config/axios';
import { useDispatch, useSelector } from 'react-redux';
import { signinFailure, signoutStart, signoutUser } from '../redux/user/userSlice';


export default function DashSidebar() {
    const location=useLocation();
    const dispatch=useDispatch();
    const {isAuth}=useSelector(state=>state.user)
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
        <Sidebar.ItemGroup className=' flex flex-col gap-2'>
                <Link to='/dashboard?tab=profile'>
                    <Sidebar.Item active={tab==='profile'} icon={FaUser} label={isAuth ? "Admin" :"user"} labelColor='dark' as='div' >
                    
                    <span>Profile</span>
                    </Sidebar.Item>
                </Link>
                {isAuth &&
                <Link to='/dashboard?tab=dash'>
                <Sidebar.Item
                active={tab === 'dash' || !tab}
                icon={HiChartPie}
                as='div'
              >
                Dashboard
              </Sidebar.Item>
            </Link>}
                {isAuth &&
                <Link to='/dashboard?tab=posts'>
                <Sidebar.Item active={tab==='posts'} icon={IoDocumentTextSharp}   as='div' >
                
                <span>Posts</span>
                </Sidebar.Item>
            </Link>
                }
                {isAuth &&
                <Link to='/dashboard?tab=users'>
                <Sidebar.Item active={tab==='users'} icon={HiOutlineUserGroup}   as='div' >
                
                <span>Users</span>
                </Sidebar.Item>
            </Link>
                }
                <Link to='/dashboard?tab=comments'>
                <Sidebar.Item
                  active={tab === 'comments'}
                  icon={HiAnnotation}
                  as='div'
                >
                  Comments
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

