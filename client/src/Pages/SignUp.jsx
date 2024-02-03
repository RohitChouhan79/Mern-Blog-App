import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Label,TextInput,Button,Alert,Spinner } from 'flowbite-react'
import { useState } from 'react'
import OAuth from '../components/OAuth'


function SignUp() {
  const [formdata, setformdata] = useState({})
  const [erroMessage, setErroMessage] = useState(null);
  const [loading, setLoading] = useState(false)
  const navigate=useNavigate()
  const handleChange=(e)=>{
    // console.log(e.target.value)
    setformdata({...formdata,[e.target.id]:e.target.value.trim()})
  }
  const handleSubmit= async (e)=>{
    e.preventDefault();
    if(!formdata.username || !formdata.password || !formdata.email){
      return setErroMessage("Please Fill Out all fields.")
    }

    try {
      setLoading(true)
      setErroMessage(null)
      const res = await fetch('/api/auth//Signup',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(formdata)
      });

      const data= await res.json();

      if (data.errName) {
        setErroMessage(data.message)
    }
    setLoading(false)

    if(res.ok){
      navigate('/sign-in')
    }
    } catch (error) {
      setErroMessage(error.message)
      setLoading(false)
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
        You can Signup With your email and Password <br />Or With Google
      </p>
        </div>
        {/* right */}
        <div className=' flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your Username' />
              <TextInput type='text' placeholder='Your Username' id='username' className='w-full  mb-2' onChange={handleChange}/>
            </div>
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
                ):"Sign UP"
              }
            </Button>
            <OAuth />
          </form>
          <div className=' flex gap-2 text-sm mt-5'>
            <span>Have an Account? </span>
            <Link to='/sign-in' className=' text-blue-700'>
              Sign In
            </Link>
          </div>
          {
            erroMessage &&(
              <Alert className=' mt-5 ' color='failure'>
                {erroMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default SignUp