import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { app } from '../firebase';
import axios from '../config/axios'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate,useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';



export default function UpdatePost() {
  const {currentUser,isAuth}=useSelector((state)=>state.user);
    const [file, setFile] = useState(null)
    const [imageuploadError, setImageuploadError] = useState(null)
    const [imageuploadProgress, setImageuploadProgress] = useState(null)
    const [formData, setformData] = useState({})
    const [publishError, setpublishError] = useState(null)
    const {postId}=useParams()

    useEffect(async()=>{
        try {
            const response=await axios(`/api/post/getPosts?postId=${postId}`)
        const data=response.data;
        if(response.status===200){
            setpublishError(null)
            setformData(data.posts[0])
        }
        if(response.status!==200){
            console.log(data.message);
            setpublishError(data.message)
        }
        } catch (error) {
            console.log(error.message);
            setpublishError(error.message)
        }
    },[postId])


    const navigate=useNavigate();

    const handleImageUpload= async ()=>{
        try {
            if(!file){
                setImageuploadError('Please selact a image')
                return;
            }
            setImageuploadError(null)
            const storage=getStorage(app)
            const fileName= new Date().getTime()+"-"+file.name;
            const storageRef=ref(storage,fileName);
            const uploadTask=uploadBytesResumable(storageRef,file);
            uploadTask.on(
                'state_changed',
                (snapshot)=>{
                    const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
                    setImageuploadProgress(progress.toFixed(0));
                },
                (error)=>{
                    setImageuploadError('Image upload Fail')
                    setImageuploadProgress(null)
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                        setImageuploadError(null)
                        setImageuploadProgress(null)
                        setformData({...formData,image:downloadURL})
                    })
                }
            )
        } catch (error) {
            setImageuploadError("Image upload Failed")
            setImageuploadProgress(null)
            console.log(error);
        }
    }
    const handleSubmit =async (e)=>{
        e.preventDefault();
        try {
            const response = await axios.post(`/api/post/updatePosts/${formData._id}/${currentUser._id}`,formData)
            console.log("abc");
            const data=response.data;
            if(response.status===200){
                setpublishError(null)
                navigate(`/post/${data.slug}`)
            }else{
                setpublishError(data.message);
                return;
            }
        } catch (error) {
            setpublishError("Somthing Went Wrong ")
        }
    }
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className=' text-center text-3xl my-7 font-semibold'>Update Your Post Now</h1>
        <form className=' flex flex-col gap-5' onSubmit={handleSubmit}>
            <div className=' flex flex-col gap-5 sm:flex-row justify-center'>
                <TextInput type='text' placeholder='Title' required id='title' value={formData.title} className='flex-1 ' onChange={(e)=>setformData({...formData,title:e.target.value})} />
                <Select value={formData.category} onChange={(e)=>setformData({...formData,category:e.target.value})}>
                    <option value='unCategorized'>Select a Category </option>
                    <option value='react-js'>ReactJS</option>
                    <option value='Node-js'>NodeJS</option>
                    <option value='javascript'>JavaScript</option>
                    <option value='next-js'>NextJS</option>

                </Select>

            </div>
            <div className='flex gap-5 items-center justify-between border-4 border-teal-500 border-dotted p-4'>
                <FileInput type='file' accept='image/*' onChange={(e)=>setFile(e.target.files[0])}/>
                <Button onClick={handleImageUpload} type='button' gradientDuoTone='purpleToBlue' size='sm' disabled={imageuploadProgress} outline>
                    {
                        imageuploadProgress ? (<div className='w-16 h-16'>
                        <CircularProgressbar value={imageuploadProgress} text={`${imageuploadProgress || 0 } %`}/>
                    </div>):("Upload Image")
                    }
                </Button>
               
            </div>
            {imageuploadError && <Alert color='failure'>{imageuploadError}</Alert>}
            {formData.image && (
                    <img src={formData.image} alt='Upload' className='w-full h-72 object-cover'/>
                )}
            <ReactQuill value={formData.content} theme="snow"placeholder='Write Somthing .......' className=' h-60 mb-14' onChange={(value)=>setformData({...formData,content:value})}/>
            <Button type='submit' gradientDuoTone='purpleToPink'>Update Your Blog</Button>
            {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
        </form>
    </div>
  )
}
