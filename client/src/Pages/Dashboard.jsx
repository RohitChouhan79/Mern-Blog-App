import React, { useEffect, useState } from 'react'
import {useLocation} from'react-router-dom'
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPost from '../components/DashPost';
import DashUser from '../components/DashUsers';
import DashComment from '../components/DashComment';
import DashbordComp from '../components/DashbordComp';

export default function Dashboard() {
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
    <div className=' min-h-screen flex flex-col md:flex-row'>
      <div className=' md:w-56'>
      {/* sidebar */}
      <DashSidebar />
    </div>
    {/* profile */}
    {tab==='profile' && <DashProfile />}
    {/* posts */}
    {tab==='posts' && <DashPost />}
    {/* Users*/}
    {tab==='users' && <DashUser />}
    {/* Comments */}
    {tab==='comments' && <DashComment />}
    {/* dashboard comp */}
    {tab === 'dash' && <DashbordComp />}
    </div>

  )
}
