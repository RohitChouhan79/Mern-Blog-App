import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export default function CreatePost() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className=' text-center text-3xl my-7 font-semibold'>Create Your Post Now</h1>
        <form className=' flex flex-col gap-5'>
            <div className=' flex flex-col gap-5 sm:flex-row justify-center'>
                <TextInput type='text' placeholder='Title' required id='title' className='flex-1 ' />
                <Select>
                    <option value='unCategorized'>Select a Category </option>
                    <option value='react-js'>ReactJS</option>
                    <option value='react-js'>ReactJS</option>
                    <option value='javascript'>JavaScript</option>
                    <option value='next-js'>NextJS</option>

                </Select>

            </div>
            <div className='flex gap-5 items-center justify-between border-4 border-teal-500 border-dotted p-4'>
                <FileInput type='file' accept='image/*' />
                <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline>Upload Image</Button>
            </div>
            <ReactQuill theme="snow"placeholder='Write Somthing .......' className=' h-60 mb-14' />
            <Button type='submit' gradientDuoTone='purpleToPink'>Publish Your Blog</Button>
        </form>
    </div>
  )
}
