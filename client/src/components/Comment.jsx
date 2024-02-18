import { Button, Textarea } from 'flowbite-react';
import axios from '../config/axios';
import moment from "moment"
import React, { useEffect, useState } from 'react'
import { FaThumbsUp } from 'react-icons/fa6';
import {useSelector} from 'react-redux'

export default function Comment({comment,onLike,onEdit,onDelete}) {
    // console.log("hassjdan");
    const {currentUser,isAuth}=useSelector(state=>state.user)
    const [user, setUser] = useState({})
    const [isEditing, setIsEditing] = useState(false)
    const [editedContent, setEditedContent] = useState(comment.content);

    // console.log(user);
    useEffect(()=>{
        
        const getUser= async ()=>{
            // console.log(comment.userId);
            try {
                const response=await axios.get(`/api/User/${comment.userId}`)
                const data=response.data
                if(data){
                    setUser(data)
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        getUser()
    },[comment])

    const handleEdit = () => {
        setIsEditing(true);
        setEditedContent(comment.content);
      };

      const handleSave= async()=>{
        try {
            const response= await axios.post(`/api/comment/editComment/${comment._id}`,editedContent)
            const data=response.data
            if(data){
                setIsEditing(false)
                onEdit(comment,editedContent)
            }
        } catch (error) {
            console.log(error.message);
        }
      }

  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
      <div className='flex-shrink-0 mr-3'>
        <img
          className='w-10 h-10 rounded-full bg-gray-200'
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className='flex-1'>
        <div className='flex items-center mb-1'>
            <span className='font-bold mr-1 text-xs truncat'>{user ? `@${user.username}`:`anonymous Person`}</span>
        </div>
        <span className='text-gray-500 text-xs'>
            {moment(comment.createdAt).fromNow()}
          </span>
      </div>
      {isEditing ?(
        <>
        <Textarea value={editedContent} className='mb-2' onChange={(e)=>setEditedContent(e.target.value)}  />
        <div className='flex justify-end gap-2 text-xs'>
              <Button
                type='button'
                size='sm'
                gradientDuoTone='purpleToBlue'
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                type='button'
                size='sm'
                gradientDuoTone='purpleToBlue'
                outline
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
        </>
      ):(
        <>
        <p className=' text-gray-500 pb-3'>{comment.content}</p>
      <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2'>
              <button
                type='button'
                onClick={() => onLike(comment._id)}
                className={`text-gray-400 hover:text-blue-500 ${
                  currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  '!text-blue-500'
                }`}
              >
                <FaThumbsUp className='text-sm' />
              </button>
              <p className='text-gray-400'>
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    ' ' +
                    (comment.numberOfLikes === 1 ? 'like' : 'likes')}
              </p>
              {
                currentUser && (currentUser._id===comment.userId || isAuth) &&(
                    <>
                    <button type='button' onClick={handleEdit} className='text-gray-400 hover:text-blue-500'>Edit</button>
                    <button
                      type='button'
                      onClick={() => onDelete(comment._id)}
                      className='text-gray-400 hover:text-red-500'
                    >
                      Delete
                    </button>
                    </>
                )
              }
              </div>
        </>
      )}
    </div>

  )
}




