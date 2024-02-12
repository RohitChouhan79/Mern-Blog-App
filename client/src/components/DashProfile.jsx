import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getDownloadURL, ref,getStorage, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateFailure, updateStart, updateUser } from '../redux/user/userSlice';
import axios from '../config/axios'


export default function DashProfile() {
    const dispatch= useDispatch()
    const {currentUser}=useSelector(state=>state.user)
    const [imageFile, setImageFile] = useState(null)
    const [imageFileURL, setImageFileURL] = useState(null)
    const [imageFileUplodProgress, setImageFileUplodProgress] = useState(null)
    const [imageFileUplodError, setImageFileUplodError] = useState(null)
    const [formData, setFormData] = useState({})
    const [imageFileUploding, setImageFileUploding] = useState(false);
    const [updateUsersuccess, setUpdateUsersuccess] = useState(null);
    const filepickerRef=useRef()
    const [updateUserError, setUpdateUserError] = useState(null)
    const handleImageChange =(e)=>{
        const file=e.target.files[0]
        if(file){
            setImageFile(file)
            setImageFileURL(URL.createObjectURL(file))
        }
    }
    useEffect(()=>{
        if(imageFile){
            uploadImage();
        }
    },[imageFile])
    
    const uploadImage= async() =>{
        setImageFileUploding(true)
        setImageFileUplodError(null)
        const Storage=getStorage(app)
        const fileName=  new Date().getTime() + imageFile.name;
        const storageRef = ref(Storage, fileName);

        const uploadtask=uploadBytesResumable(storageRef,imageFile)
        uploadtask.on(
            'state_changed',
            (snapshot)=>{
                const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100
                setImageFileUplodProgress(progress.toFixed(0))
            },
            (error)=>{
                setImageFileUplodError("Could not upload Image")
                setImageFileUplodProgress(null)
                setImageFile(null)
                setImageFileURL(null)
                setImageFileUploding(false)
            },
            ()=>{
                getDownloadURL(uploadtask.snapshot.ref).then((dowunladUrl)=>{
                    setImageFileURL(dowunladUrl)
                    setFormData({...formData,profilePicture:dowunladUrl});
                    setImageFileUploding(false)

                })
            }

        )
    }

    const handleChange =(e) =>{
        setFormData({...formData,[e.target.id]:e.target.value})
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setUpdateUserError(null);
        setUpdateUsersuccess(null);
        if(Object.keys(formData).length===0){
            setUpdateUserError("No data is there");
            return;
        }
        if(imageFileUploding){
            setUpdateUserError('Please Wait For Image to Upload');
            return;
        }
        try {
            dispatch(updateStart())
            const response = await axios.post(`/api/User/update/${currentUser._id}`,formData)
            const data=response.data
            if(response.status===200){
                dispatch(updateUser(data))
                setUpdateUsersuccess("User's Updated Succesfully")
            }else{
                dispatch(updateFailure(data.message))
                setUpdateUserError(data.message)
                
            }
        } catch (error) {
            dispatch(updateFailure(error.message))
            console.log(error);
        }
    }

   
  return (
    <div className=' max-w-lg mx-auto p-3 w-full'>
        <h1 className=' my-7 text-center font-semibold text-3xl'>Profile</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <input type="file" accept='image/*' onChange={handleImageChange} ref={filepickerRef} hidden/>
            <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full mb-5' onClick={()=>filepickerRef.current.click()}>
                {imageFileUplodProgress && (
                    <CircularProgressbar value={imageFileUplodProgress ||0} text={`${imageFileUplodProgress}` } 
                    strokeWidth={5} styles={{
                        root:{
                            width:'100%',
                            height:'100%',
                            position:'absolute',
                            top:0,
                            left:0,
                        },
                        path:{
                            stroke:`rgba(62,155,200,${imageFileUplodProgress/100})`
                        }

                    }}/>
                )}
                <img src={imageFileURL || currentUser.profilePicture} alt="user"  className={` rounded-full w-full h-full object-cover bordr-8 border-[lightgray] ${imageFileUplodProgress &&imageFileUplodProgress<100 && "opacity-60"}`} />
            </div>
            {imageFileUplodError && <Alert color='failure' >{imageFileUplodError}</Alert>}
            <TextInput  type='text' id='username' defaultValue={currentUser.username} placeholder='username' onChange={handleChange}/>
            <TextInput  type='email' id='email' defaultValue={currentUser.email} placeholder='email' onChange={handleChange} />
            <TextInput  type='password' id='password'  placeholder='password' onChange={handleChange} />
            <Button type='submit' gradientDuoTone='purpleToBlue' outline>
                <span>Update</span>
            </Button>
        </form>
        <div className=' text-red-600 flex justify-between mt-5'>
            <span className=' cursor-pointer'> Delete Account</span>
            <span className=' cursor-pointer'>Sign Out</span>
        </div>
        {updateUsersuccess &&(
            <Alert color="success" className=' mt-5'>
                {updateUsersuccess}
            </Alert>
        )
        }
        {updateUserError &&(
            <Alert color="failure" className=' mt-5'>
                {updateUserError}
            </Alert>
        )
        }
    </div>
  )
}
