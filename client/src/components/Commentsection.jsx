import { Alert, Button, Modal, Textarea } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import axios from '../config/axios'
import { Link, useNavigate } from 'react-router-dom'
import Comment from "./Comment"
import { FaExclamationCircle } from 'react-icons/fa'

export default function Commentsection({postId}) {
    const {currentUser}=useSelector(state=>state.user)
    const [comment,setComment]=useState('');
    const [comments,setComments]=useState([]);
    const [commentError, setCommentError] = useState(null)
    const [showModel, setShowModel] = useState(false)
    const [commentDelete, setCommentDelete] = useState(null)
    const navigate=useNavigate;
    // console.log(comments);
    const handleSunmit =async (e)=>{
        e.preventDefault();
        if(comment.length >200){
            return;
        }
       try {
        const response=await axios.post('/api/comment/create',{content:comment,postId:postId,userId:currentUser._id});
        const data=await response.data
        if(data){
            setComment('')
            setCommentError(null)
            setComments([data,...comment])
        }
       } catch (error) {
        setCommentError(error.message)
       }
    }
    const handleLikes= async(commentId)=>{
        if(!currentUser){
            return;
        }
        try {
            const response= await axios.post(`/api/comment/likeComment/${commentId}`)
            const data = await response.data
            if(data){
                setComments(comment.map((comment)=>
                    comment._id===commentId ? {
                        ...comment,likes:data.likes , numberOfLikes:data.likes.length,
                    }:comment
                ))
            }
        } catch (error) {
            
        }
    }

    const handleEdit=async(comment,editedContent)=>{
        setComments(
            comments.map((c)=>c._id===comment._id ?{...c,content:editedContent}:c
        ))
    }

    const handleDelete=async (commentId)=>{
        setShowModel(false)
        if(!currentUser){
            navigate(`/sign-in`)
            return;
        }
        try {
            const response= await axios.post(`/api/comment/DeleteComment/${commentId}`)
            const data=response.data
            if(data){
                setComments(comments.filter((comment)=>comment._id !==commentId))
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(()=>{
        const getComments = async () =>{
            try {
                const response= await axios.get(`/api/comment/getPostComments/${postId}`)
                const data = response.data
                // console.log(data);
                if(data){
                    setComments(data)
                }
            } catch (error) {
                
            }
        }
        getComments()
    },[postId])
  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
        {currentUser ? (
            <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                <p>Signed in as:</p>
                <img className='h-5 w-5 object-cover rounded-full' src={currentUser.profilePicture} alt="" />
                <Link to={'/dashboard?tab=profile'} className='text-xs text-cyan-600 hover:underline'>
                @{currentUser.username}
                </Link>
            </div>
        ):(
            <div className='text-sm text-teal-500 my-5 flex gap-1'>
          You must be signed in to comment.
          <Link className='text-blue-500 hover:underline' to={'/sign-in'}>
            Sign In
          </Link>
        </div>
        )}
        {currentUser && (
            <form onSubmit={handleSunmit} className='border border-teal-500 rounded-md p-3'>
                <Textarea onChange={(e)=>setComment(e.target.value)} value={comment}  placeholder='Add a Comment.....' rows='3' maxLength='200'/>
                <div className='flex justify-between items-center mt-5'>
            <p className='text-gray-500 text-xs'>
              {200 - comment.length} characters remaining
            </p>
            <Button outline gradientDuoTone='purpleToBlue' type='submit'>
              Submit
            </Button>
            </div>
            {commentError && <Alert color={"failure"} className='.t-5'>
                {commentError}
            </Alert>}
            </form>
        )
        }
        {comments.length === 0 ? (
            <p className='text-sm my-5'>No Comment Yet</p>
        ):(
            <>
            <div className=' text-sm my-5 flex items-center'>
                <p>Comments</p>
                <div className='border border-gray-400 py-1 px-2 rounded-sm gap-1'>
                    <p>{comments.length}</p>
                </div>
            </div>
            {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLikes}
              onEdit={handleEdit}
              onDelete={(commentId)=>{
                setShowModel(true) 
                setCommentDelete(commentId)
            }}
            />
          ))}
            </>
            
        )}
        <Modal show={showModel} onClose={()=>setShowModel(false)} size='md' popup >
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    <FaExclamationCircle className=' h-14 w-14 text-red-600 dark:text-red-500 mb-4 mx-auto'/>
                    <h3 className=' mb-5 text-lg text-black dark:text-gray-600'>Are you Sure You Want to delete Comment?</h3>
                    <div className=' flex justify-center gap-5'>
                        <Button color='gray' onClick={()=>setShowModel(false)}>
                            No,cencel
                        </Button>
                        <Button color='failure' onClick={()=>handleDelete(setCommentDelete)}>
                            Yes I am Sure
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </div>
  )
}
