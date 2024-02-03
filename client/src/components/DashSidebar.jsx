import React, { useEffect, useState } from 'react'
import {  Sidebar} from 'flowbite-react'
import { FaUser } from "react-icons/fa";
import { HiArrowSmRight } from "react-icons/hi";
import { useLocation,Link } from 'react-router-dom';
export default function DashSidebar() {
    const location=useLocation();
  const [tab, setTab] = useState('')
  useEffect(()=>{
    const urlParams=new URLSearchParams(location.search)
    const tabFormUrl=urlParams.get('tab'); 
    // console.log(tabFormUrl)
    if(tabFormUrl){
      setTab(tabFormUrl)
    } 

  },[location.search])
  return (
    <Sidebar className=' w-full md:w-56'>
        <Sidebar.Items>
        <Sidebar.ItemGroup>
                <Link to='/dashboard?tab=profile'>
                    <Sidebar.Item active={tab==='profile'} icon={FaUser} label={"User"} labelColor='dark' >
                    
                    <span>Profile</span>
                    </Sidebar.Item>
                </Link>

                <Sidebar.Item  icon={HiArrowSmRight} classname=' cursor-pointer'>
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