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
  const [UserPost, setUserPost] =useState([])
  // console.log(UserPost);
  const [showModel, setShowModel] = useState(false)
  const [postIdToDelete, setPostIdToDelete] = useState('');
  useEffect(()=>{
    const fetchPost=async ()=>{
      try {
        const response = await axios.get(`/api/post/getPosts?userId=${currentUser._id}`)
        const data=response.data;
        if(response.status===200){
          setUserPost(data.posts)
          if(data.posts.length<9){
            setShowmore(false)
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    if(isAuth){
      fetchPost();
    } 
},[currentUser,isAuth])

const handleShowmore=async()=>{
  const startIndex=UserPost.length;
  try {
    const response= await axios.get(`/api/post/getPosts?userId=${currentUser._id}&startIndex=${startIndex}`);
    const data=response.data
    if(response.status===200){
      setUserPost((prev)=>[...prev,...data.posts]);
      if(data.posts.length<9){
        setShowmore(false)
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}

const handleDletePost=async()=>{
  setShowModel(false)
  try {
    const response= await axios.post(`/api/post/deletPosts/${postIdToDelete}/${currentUser._id}`)
    const data=response.data
    if(response===200){
      setUserPost(()=>{
        prev.filter((post)=>post._id !== postIdToDelete)
      })
    }
  } catch (error) {
    console.log(error.message);
  }
}
  return (
    <div className=' table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {isAuth && UserPost.length >0 ?(
      <>
      <Table hoverable className='shadow-md'>
        <Table.Head>
          <Table.HeadCell>Date Updated</Table.HeadCell>
          <Table.HeadCell>Post Image</Table.HeadCell>
          <Table.HeadCell>Post title</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>
            <span>Edit</span>
          </Table.HeadCell>
          <Table.HeadCell>
            <span>Delete</span>
          </Table.HeadCell>
        </Table.Head>
        {UserPost.map((post)=>(
          <Table.Body key={post._id} className=' divide-y'>
            <Table.Row>
              <Table.Cell className=' bg-white dark:border-gray-700 dark:bg-gray-800' >{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
              <Table.Cell>
                <Link className=' font-medium text-gray-900 dark:text-white' to={`/post/${post.slug}`}>
                  <img src={post.image} alt={post.title} className=' w-20 h-10 object-cover bg-gray-500'/>
                </Link>
              </Table.Cell>
              <Table.Cell>
                <Link to={`/post/${post.slug}`}>
                  {post.title}
                </Link>
              </Table.Cell>
              <Table.Cell>{post.category}</Table.Cell>
              <Table.Cell>
              <Link className=' text-teal-500 hover:underline font-medium cursor-pointer' to={`/update-post/${post._id}`}>
            <span>Edit</span>
            </Link >
              </Table.Cell>
              <Table.Cell>
              
            <span className=' text-red-500 hover:underline font-medium cursor-pointer' onClick={()=>{setShowModel(true);
              setPostIdToDelete(post._id);}}>Delete</span>
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
                        <Button color='failure' onClick={handleDletePost}>
                            Yes I am Sure
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </div>
  )
}
