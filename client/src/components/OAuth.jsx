import { Button } from 'flowbite-react'
import { FaGooglePlus } from "react-icons/fa6";
import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth"
import { app } from '../firebase';
import { signinFailure,signinStart} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncGooglesignin } from '../redux/Action/actions';

export default function OAuth() {
    const navigate=useNavigate()
    const auth=getAuth(app)
    const dispatch= useDispatch();
    const handleGoogleClick=async ()=>{
        const provider= new GoogleAuthProvider();
        provider.setCustomParameters({prompt:'select_account'})
        try {
            dispatch(signinStart())
            const resultFormGoogle=await signInWithPopup(auth,provider)
            console.log(resultFormGoogle);
            dispatch(asyncGooglesignin(resultFormGoogle))
        } catch (error) {
            dispatch(signinFailure(error.message))
        }
    }
  return (
    <Button type='button' gradientDuoTone='pinkToOrange' onClick={handleGoogleClick} outline>
        <FaGooglePlus className='w-6 h-6 mr-3'/>
        Continue with Google
    </Button>
  )
}
