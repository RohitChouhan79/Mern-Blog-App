import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from '../config/axios'
import { Button, Modal, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';


export default function DashPost() {
  const {currentUser,isAuth}=useSelector((state)=>state.user);
  const [Showmore, setShowmore] = useState(true)
  // console.log(isAuth);
  const [users, setUsers] =useState([])
  // console.log(UserPost);
  const [showModel, setShowModel] = useState(false)
  const [userIdToDelete, setUserIdToDelete] = useState('');
  useEffect(()=>{
    const fetchUser=async ()=>{
      try {
        const response = await axios.get(`/api/User/getusers`)
        const data=response.data;
        if(response.status===200){
          setUsers(data.users)
          if(data.users.length<9){
            setShowmore(false)
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    if(isAuth){
      fetchUser();
    } 
},[currentUser,isAuth])

const handleShowmore=async()=>{
  const startIndex=users.length;
  try {
    const response= await axios.get(`/api/User/getusers?startIndex=${startIndex}`);
    const data=response.data
    if(response.status===200){
      setUsers((prev)=>[...prev,...data.users]);
      if(data.users.length<9){
        setShowmore(false)
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}


const handleDleteuser=async()=>{
    setShowModel(false)
    try {
        const response = await axios.post(`/api/User/delete/${userIdToDelete}`)
        const data=response.data
        if(response.status===200){
            setUsers((prev)=>prev.filter((user)=>user._id !== userIdToDelete));
            setShowModel(false)
        }else{
            console.log(data.message);
        }
    } catch (error) {
        console.log(error.message);
    }
}
  return (
    <div className=' table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {isAuth && users.length >0 ?(
      <>
      <Table hoverable className='shadow-md'>
        <Table.Head>
          <Table.HeadCell>Date created</Table.HeadCell>
          <Table.HeadCell>User image</Table.HeadCell>
          <Table.HeadCell>Username</Table.HeadCell>
          <Table.HeadCell>Admin/user</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>
            <span>Delete</span>
          </Table.HeadCell>
        </Table.Head>
        {users.map((user)=>(
          <Table.Body key={user._id} className=' divide-y'>
            <Table.Row>
              <Table.Cell className=' bg-white dark:border-gray-700 dark:bg-gray-800' >{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
              <Table.Cell>
                
                  <img src={user.profilePicture} alt={user.username} className=' w-10 h-10 object-cover bg-gray-500 rounded-full'/>
                
              </Table.Cell>
              <Table.Cell>
                
                  {user.username}
                
              </Table.Cell>
              <Table.Cell>
                
                  {isAuth && isAuth ? "Admin" :"user"}
                
              </Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>
              
            <span className=' text-red-500 hover:underline font-medium cursor-pointer' onClick={()=>{setShowModel(true);
              setUserIdToDelete(user._id);}}>Delete</span>
              </Table.Cell>

            </Table.Row>
          </Table.Body>
        ))}

      </Table>
      {
        Showmore && (
          <button onClick={handleShowmore} className=' w-full text-teal-500 self-center text-sm py-7'>
            Show More
          </button>
        )
      }
      </>):(
        <p>You Have No Post yet</p>
      )}
      <Modal show={showModel} onClose={()=>setShowModel(false)} size='md' popup >
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    <FaExclamationTriangle className=' h-14 w-14 text-red-600 dark:text-red-500 mb-4 mx-auto'/>
                    <h3 className=' mb-5 text-lg text-black dark:text-gray-600'>Are you Sure You Want to delete Post?</h3>
                    <div className=' flex justify-center gap-5'>
                        <Button color='gray' onClick={()=>setShowModel(false)}>
                            No,cencel
                        </Button>
                        <Button color='failure' onClick={handleDleteuser}>
                            Yes I am Sure
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </div>
  )
}
