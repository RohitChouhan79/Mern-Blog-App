import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import axios from "../config/axios"

export default function Home() {
  const [posts, setPosts] = useState([]);
  // console.log(posts);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('/api/post/getPosts');
      const data = await response.data;
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className='flex flex-col h-2/3 gap-6 p-28 px-3 max-w-6xl mx-auto '>
        <h1 className=' text-5xl font-bold lg:text-8xl mb-5'>This is <span className=' text-red-500'>coding.blog</span></h1>
        <p className='text-gray-500 lg:text-xl sm:text-sm mb-2'>
        A platform for developers, that provides you with a personalised curation service on programming topics. <br /> Use it to write and read quality articles on programming. <br /> Not for content-marketing disguised as programming tutorials. <br /> Not for advertisement blended with sincerely interesting pieces. Quality. Articles. About. Coding.
        </p>
        <Link
          to='/search'
          className='text-xs sm:text-sm text-black font-bold hover:underline'
        >
          <button className=' bg-red-500 p-5 border rounded-xl border-teal-500 '>View all posts</button>
        </Link>
      </div>
      <div className='flex flex-col h-2/3 gap-6 p-28 px-3 max-w-6xl mx-auto' >
        <h1 className='text-black dark:text-white lg:text-xl sm:text-sm mb-2'>Today.......</h1>
        <p className='text-gray-500 lg:text-xl sm:text-sm mb-2'>Today ...
Today, it feels like most articles are trying to sell you something. They are, as they cannot reach you for free. Curators like Medium need to put work into ensuring you get the articles you would enjoy. To compensate, they either put the content behind paywalls or shift the costs to the authors. They also curate with only the content available on their platform.

However, there is a tonne of content out there. The problem is finding truly insightful pieces based on your personal needs is time-consuming.</p>
      </div>
      <div className='p-3 '>
        <CallToAction />
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}