import React from 'react'
import { Link } from 'react-router-dom'
import { Label,TextInput,Button } from 'flowbite-react'

function SignUp() {
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
          <form className='flex flex-col gap-4'>
            <div>
              <Label value='Your Username' />
              <TextInput type='text' placeholder='Your Username' id='username' className='w-full  mb-2'/>
            </div>
            <div>
              <Label value='Your Email' />
              <TextInput type='text' placeholder='name@company.com' id='email' className='w-full  mb-2'/>
            </div>
            <div>
              <Label value='Your Password' />
              <TextInput type='text' placeholder='Your Password' id='password' className='w-full  mb-2'/>

            </div>
            <Button gradientDuoTone='purpleToPink' type='submit'>
              Sign UP
            </Button>
          </form>
          <div className=' flex gap-2 text-sm mt-5'>
            <span>Have an Account? </span>
            <Link to='/sign-in' className=' text-blue-700'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp