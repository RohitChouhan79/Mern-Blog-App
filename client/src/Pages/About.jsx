import { FaCampground } from "react-icons/fa";

export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='flex gap-5 text-3xl font font-semibold text-center my-7'>
            <span>About</span>
            <div className="flex">
            <FaCampground className=' font-serif font-bold text-center '/>
        <span className=' font-serif tracking-wide font-bold text-xl pl-4'>Rsc</span>
        Blog's
            </div>
          </h1>
          <div className='text-md text-gray-500 flex flex-col gap-6'>
            <p>
              Welcome to <span className=' font-serif tracking-wide font-bold text-xl pl-4'>Rsc</span> Blog! This blog was created by Rohit Chouhan
              as a personal project to share his thoughts and ideas with the
              world. Rohit is a passionate developer who loves to write about
              technology, coding, and everything in between.
            </p>

            <p>
              On this blog, you'll find weekly articles and tutorials on topics
              such as web development, software engineering, and programming
              languages. Sahand is always learning and exploring new
              technologies, so be sure to check back often for new content!
            </p>

            <p>
              We encourage you to leave comments on our posts and engage with
              other readers. You can like other people's comments and reply to
              them as well. We believe that a community of learners can help
              each other grow and improve.
            </p>
            <p>
            We wholeheartedly encourage you to actively participate in our vibrant community by
             leaving comments on posts and interacting with fellow readers. Engage in lively discussions,
              exchange ideas, and foster a culture of collaborative learning and growth. Remember, together we can propel
               each other towards excellence and innovation.
            </p>
            <p className=" text-red-600 ">
            "Embark on a journey of discovery with <span className=' font-serif tracking-wide font-bold text-xl'>Rsc</span>
            <span className=' font-serif tracking-wide font-bold text-xl'>Blog's</span>
            , where every pixel holds a universe of knowledge waiting to be explored."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}