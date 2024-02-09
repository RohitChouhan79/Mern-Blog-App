import { Button } from 'flowbite-react'
import { FaGooglePlus } from "react-icons/fa6";
import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth"
import { app } from '../firebase';

// import { SignInFailure, SignInSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from "../config/axios"

export default function OAuth() {
    // const navigate=useNavigate()
    const auth=getAuth(app)
    const dispatch= useDispatch();
    const handleGoogleClick=async ()=>{
        const provider= new GoogleAuthProvider();
        provider.setCustomParameters({prompt:'select_account'})
        try {
            const resultFormGoogle=await signInWithPopup(auth,provider)
            // console.log(resultFormGoogle);
            axios.post('/api/auth/google', resultFormGoogle);
            // const data= await res.json()
            // if (data.errName) {
            //     return dispatch(SignInFailure(data.message))
            // }
            // if(res.ok){
            //     dispatch(SignInSuccess(data))
            //     navigate('/')
            //   }
            
        } catch (error) {
            // dispatch(SignInFailure(error.message))
        }
    }
  return (
    <Button type='button' gradientDuoTone='pinkToOrange' onClick={handleGoogleClick} outline>
        <FaGooglePlus className='w-6 h-6 mr-3'/>
        Continue with Google
    </Button>
  )
}
