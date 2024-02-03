import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Label,TextInput,Button,Alert,Spinner } from 'flowbite-react'
import { useState } from 'react'
import {  useDispatch,useSelector } from 'react-redux'
import { SignInSuccess, SignInFailure,SignInStart } from '../redux/user/userSlice'
import OAuth from '../components/OAuth'


function SignIn() {
  const [formdata, setformdata] = useState({})
  const {loading,error:errorMessage}=useSelector(state=>state.user)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleChange=(e)=>{
    // console.log(e.target.value)
    setformdata({...formdata,[e.target.id]:e.target.value.trim()})
  }
  const handleSubmit= async (e)=>{
    e.preventDefault();
    if( !formdata.password || !formdata.email){
      return dispatch(SignInFailure("Please Fill Out all fields."))
    }

    try {
      dispatch(SignInStart())
      const res = await fetch('/api/auth//Signin',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(formdata)
      });

      const data= await res.json();

      if (data.errName) {
        return dispatch(SignInFailure(data.message))
    }
    

    if(res.ok){
      dispatch(SignInSuccess(data))
      navigate('/')
    }
    } catch (error) {
      dispatch(SignInFailure(error.message))
    }
  }
  return (
    <div className=' min-h-screen mt-20'>
      <div className=' flex gap-6 p-5 max-w-3xl mx-auto flex-col md:flex-row md:items-center'>
        {/* left */}
        <div className=' flex-1'>
        <Link to='/' className='  text-4xl  font-bold dark:text-white'>
        <span className=' px-2 py-1 bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-500 rounded-xl text-white'>Rsc</span>
        Blog's
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