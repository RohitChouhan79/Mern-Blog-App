import { Button, Navbar, NavbarToggle, TextInput } from 'flowbite-react'
import React from 'react'
import { Link, NavLink,useLocation} from 'react-router-dom'
import { FaMoon, FaSearch } from 'react-icons/fa';
export const Header = () => {
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
        <Link to="/sign-in">
        <Button   gradientDuoTone="purpleToBlue" outline >Sign In</Button>
        </Link>
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
