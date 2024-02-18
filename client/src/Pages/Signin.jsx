import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Label,TextInput,Button,Alert,Spinner } from 'flowbite-react'
import { useState } from 'react'
import {  useDispatch,useSelector } from 'react-redux'
import {  signinStart,signinFailure } from '../redux/user/userSlice'
import OAuth from '../components/OAuth'
import { asyncsignin } from '../redux/Action/actions'
import { FaCampground } from 'react-icons/fa'


function SignIn() {
  const [formdata, setformdata] = useState({})
  const {loading,error:errorMessage}=useSelector(state=>state.user)
  const {isAuth} = useSelector((state)=> state.user)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleChange=(e)=>{
    // console.log(e.target.value)
    setformdata({...formdata,[e.target.id]:e.target.value.trim()})
  }
  const handleSubmit= async (e)=>{
    e.preventDefault();
    if( !formdata.password || !formdata.email){
      return dispatch(signinFailure("Please Fill Out all fields."))
    }

    try {
      dispatch(signinStart())
      dispatch(asyncsignin(formdata))
    } catch (error) {
      dispatch(signinFailure(error.message))
    }
  }
  useEffect(() => {
    // console.log('change isuth', isAuth)
    isAuth && navigate("/");
}, [isAuth]);

  return (
    <div className=' min-h-screen'>
      <div className=' flex gap-6 pt-44 max-w-3xl mx-auto flex-col md:flex-row md:items-center'>
        {/* left */}
        <div className=' flex-1'>
        <Link to='/' className='ml-2 flex self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <FaCampground className=' font-serif font-bold text-center text-5xl'/>
        <span className=' font-serif tracking-wide font-bold text-5xl pl-4'>Rsc</span>
        <span className=' text-6xl'>Blog's</span>
      </Link>
      <p className=' text-sm mt-6 mb-2'>
        You can SignIn With your email and Password <br />Or With Google
      </p>
        </div>
        {/* right */}
        <div className=' flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your Email' />
              <TextInput type='email' placeholder='name@company.com' id='email' className='w-full  mb-2' onChange={handleChange}/>
            </div>
            <div>
              <Label value='Your Password' />
              <TextInput type='password' placeholder='Your Password' id='password' className='w-full  mb-2' onChange={handleChange}/>

            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {
                loading ? (
                  <>
                  <Spinner size='sm' />
                  <span className=' pl-5'>Loading.....</span>
                  </>
                ):"Sign IN"
              }
            </Button>
            <OAuth />
          </form>
          <div className=' flex gap-2 text-sm mt-5'>
            <span>Don't Have an Account? </span>
            <Link to='/sign-up' className=' text-blue-700'>
              Sign Up
            </Link>
          </div>
          {
            errorMessage &&(
              <Alert className=' mt-5 ' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default SignIn