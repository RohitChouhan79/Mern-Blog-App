import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import axios from '../config/axios';
import { Link, NavLink, useLocation, useNavigate} from 'react-router-dom'
import { FaMoon, FaSearch,FaSun} from 'react-icons/fa';
import {useSelector,useDispatch} from "react-redux"
import { toggleTheme } from '../redux/theme/themeSlice';
import { signinFailure, signoutStart, signoutUser } from '../redux/user/userSlice';
import { FaCampground } from "react-icons/fa";
export const Header = () => {
  const location = useLocation();
  const {currentUser}=useSelector(state=>state.user)
  const {theme}=useSelector(state=>state.theme)
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch=useDispatch()
  const navigate=useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  const handleSignOut= async (e) =>{
    try {
        dispatch(signoutStart())
        const response = await axios.post(`/api/auth/signout`)
        const data=response.data
        if(response.status===200){
            dispatch(signoutUser(data))
        }else{
            dispatch(signinFailure(data.message))
        }
    } catch (error) {
        dispatch(signinFailure(error.message))
    }
   }

   const handleSubmit= async (e)=>{
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
   }
  return (
    <>
    <Navbar className=' border-b-2 lg:rounded-b-full border-red-500 dark:border-red-400 p-6 sm:rounded-b-md'>
      <Link to='/' className=' ml-8 flex self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <FaCampground className=' font-serif font-bold text-center '/>
        <span className=' font-serif tracking-wide font-bold text-xl pl-4'>Rsc</span>
        Blog's
      </Link>
      <form onSubmit={handleSubmit} >
        <TextInput value={searchTerm} onChange={(e)=>{setSearchTerm(e.target.value)}} type='text ' placeholder='Search' rightIcon={FaSearch} className='hidden lg:inline'/>
      </form>
      <Button className='w-12  h-10 lg:hidden' color='gray' pill>
        <FaSearch/>
      </Button>
      <div className='flex gap-2 md:order-2'>
      <Button className=' w-12 h-10 hidden sm:inline ' onClick={()=>dispatch(toggleTheme())} color='gray' pill>
        {theme==='light' ? <FaSun />:<FaMoon/>}
          
        </Button>
        {currentUser ? (
          <Dropdown arrowIcon={false} inline label={
            <Avatar 
            className=' mr-8'
            alt='user'
            img={currentUser.profilePicture}
            rounded
            />
          }>
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
            </Dropdown.Header>
            <Dropdown.Divider />
            <Link to="/dashboard?tab=profile">
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Link  onClick={handleSignOut}>
              <Dropdown.Item>Signout</Dropdown.Item>
            </Link>
          </Dropdown>
        ):(
          <Link to="/sign-in">
          <Button className=' mr-8'  gradientDuoTone="purpleToBlue" outline >Sign In</Button>
          </Link>
        )}
        
        <Navbar.Toggle/>
      </div>
      <Navbar.Collapse className=''>
          <NavLink to="/" style={({ isActive }) => {
 return isActive ? { color: "red" } : {};
 }}
  >Home</NavLink>
          <NavLink to="/about" style={({ isActive }) => {
 return isActive ? { color: "red" } : {};
 }}
 >About</NavLink>
          <NavLink to="/Project"   style={({ isActive }) => {
 return isActive ? { color: "red" } : {};
 }}
 >Projects</NavLink>
        </Navbar.Collapse>
    </Navbar>
    </>
  )
}
