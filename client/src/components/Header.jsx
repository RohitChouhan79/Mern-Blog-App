import { Avatar, Button, Dropdown, Navbar, NavbarToggle, TextInput } from 'flowbite-react'
import React from 'react'
import { Link, NavLink,useLocation} from 'react-router-dom'
import { FaMoon, FaSearch } from 'react-icons/fa';
import {useSelector} from "react-redux"
export const Header = () => {
  const {currentUser}=useSelector(state=>state.user)
  const path=useLocation().pathname;
  return (
    <Navbar className=' border-b-2'>
      <Link to='/' className=' self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className=' px-2 py-1 bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-500 rounded-xl text-white'>Rsc</span>
        Blog's
      </Link>
      <form >
        <TextInput type='text ' placeholder='Search' rightIcon={FaSearch} className='hidden lg:inline'/>
      </form>
      <Button className='w-12  h-10 lg:hidden' color='gray' pill>
        <FaSearch/>
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button className=' w-12 h-10 hidden sm:inline ' color='gray' pill>
          <FaMoon/>
        </Button>
        {currentUser ? (
          <Dropdown arrowIcon={false} inline label={
            <Avatar 
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
            <Link to="/signout">
              <Dropdown.Item>Signout</Dropdown.Item>
            </Link>
          </Dropdown>
        ):(
          <Link to="/sign-in">
          <Button   gradientDuoTone="purpleToBlue" outline >Sign In</Button>
          </Link>
        )}
        
        <Navbar.Toggle/>
      </div>
      <Navbar.Collapse>
          <NavLink to="/" style={({ isActive }) => {
 return isActive ? { color: "#3F7CE2" } : {};
 }}
  >Home</NavLink>
          <NavLink to="/about" style={({ isActive }) => {
 return isActive ? { color: "#3F7CE2" } : {};
 }}
 >About</NavLink>
          <NavLink to="/Project"   style={({ isActive }) => {
 return isActive ? { color: "#3F7CE2" } : {};
 }}
 >Projects</NavLink>
        </Navbar.Collapse>
    </Navbar>
  )
}
