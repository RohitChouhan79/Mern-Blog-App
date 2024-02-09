import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {getDownloadURL, ref,getStorage, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';


export default function DashProfile() {

    const {isAuth} = useSelector((state)=> state.user)
    const navigate = useNavigate()

    const isuserLogin = ()=>{
        !isAuth && navigate('/sign-up')
    }

    useEffect(() => {
      isuserLogin()
    
      return () => {
        
      }
    }, [isAuth])
    

    const {currentUser}=useSelector(state=>state.user)
    const [imageFile, setImageFile] = useState(null)
    const [imageFileURL, setImageFileURL] = useState(null)
    const [imageFileUplodProgress, setImageFileUplodProgress] = useState(null)
    const [imageFileUplodError, setImageFileUplodError] = useState(null)
    // console.log(imageFileUplodProgress,imageFileUplodError);
    const filepickerRef=useRef()
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
        setImageFileUplodError(null)
        const Storage=getStorage(app)
        const fileName=  new Date().getTime() + imageFile.name;
        // console.log(storage,fileName)
        const storageRef = ref(Storage, fileName);
        // console.log(storageRef);

        const uploadtask=uploadBytesResumable(storageRef,imageFile)
        // console.log(uploadtask);
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
            },
            ()=>{
                getDownloadURL(uploadtask.snapshot.ref).then((dowunladUrl)=>{
                    setImageFileURL(dowunladUrl)
                })
            }

        )
    }
  return (
    <div className=' max-w-lg mx-auto p-3 w-full'>
        <h1 className=' my-7 text-center font-semibold text-3xl'>Profile</h1>
        <form className='flex flex-col gap-5'>
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
            <TextInput  type='text' id='username ' defaultValue={currentUser.username} placeholder='username'/>
            <TextInput  type='email' id='email' defaultValue={currentUser.email} placeholder='email'/>
            <TextInput  type='password' id='password'  placeholder='password'/>
            <Button type='submit' gradientDuoTone='purpleToBlue' outline>
                <span>Update</span>
            </Button>
        </form>
        <div className=' text-red-600 flex justify-between mt-5'>
            <span className=' cursor-pointer'> Delete Account</span>
            <span className=' cursor-pointer'>Sign Out</span>
        </div>
    </div>
  )
}
