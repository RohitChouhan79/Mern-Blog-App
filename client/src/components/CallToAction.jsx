import { Button } from 'flowbite-react';

export default function CallToAction() {
  return (
    <div className='w-full flex justify-center items-center'>
    <div className='bg-amber-100 dark:bg-slate-700 w-2/6 items-center sm:flex-row p-3 border border-red-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
    <div className="  flex-1 justify-center items-center flex flex-col">
            <h2 className='text-2xl'>
                Do you Want To learn Reactjs
            </h2>
            <p className='text-gray-500 my-2'>
                Checkout these resources to learn Reactjs
            </p>
            <Button gradientDuoTone='purpleToPink' className=' w-2/6 rounded-tl-xl rounded-bl-none'>
                <a  href="https://www.sheryians.com/" target='_blank' rel='noopener noreferrer'>
                    Learn Reactjs
                </a>
            </Button>
        </div>
        <div className="p-7 w-full flex justify-center items-center  flex-1">
            <img className='border w-4/6 items-center rounded-lg' src="https://tse3.mm.bing.net/th?id=OIP.eWUjOCd3NX0YumGQSDNQAwHaEK&pid=Api&P=0&h=220" />
        </div>
        
    </div>
    </div>
  )
}