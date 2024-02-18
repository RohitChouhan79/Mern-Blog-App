import React from 'react'
import { Footer } from 'flowbite-react'
import { Link} from 'react-router-dom'
import { FaCampground, FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footerc() {
  return (
    <Footer container className=' border border-t-4 rounded-t-3xl    border-red-600'>
        <div className=' w-full max-w-7xl mx-auto'>
            
            
            <div className='w-full sm:flex sm:items-center sm:justify-between'>
                <Footer.Copyright href='#'  by='Rohit Blog' year={new Date().getFullYear()}/>
                <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
                    <Footer.Icon href='#' icon={FaFacebook} />
                    <Footer.Icon href='#' icon={FaInstagram} />
                    <Footer.Icon href='#' icon={FaTwitter} />
                    <Footer.Icon href='#' icon={FaGithub} />

                </div>
            </div>
            <Footer.Divider />
            <div className=' grid w-full justify-between sm:flex md:grid-cols-1'>
                <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
                    <div>
                        <Footer.Title title='About' />
                        <Footer.LinkGroup col>
                            <Footer.Link href='https://www.100jsproject.com' target='_blank' rel='noopener noreferrer'>
                                100 JS Project 
                            </Footer.Link>
                            <Footer.Link href='/about' target='_blank' rel='noopener noreferrer'>
                                Rohit Blog's
                            </Footer.Link>
                        </Footer.LinkGroup>

                    </div>
                    <div>
                        <Footer.Title title='Follow Us' />
                        <Footer.LinkGroup col>
                            <Footer.Link href='https://github.com/RohitChouhan79' target='_blank' rel='noopener noreferrer'>
                                Github
                            </Footer.Link>
                            <Footer.Link href='https://www.instagram.com/ku.rohitbanna'>
                                Instagram
                            </Footer.Link>
                        </Footer.LinkGroup>

                    </div>
                    <div>
                        <Footer.Title title='Legal' />
                        <Footer.LinkGroup col>
                            <Footer.Link href='#' >
                                Privacy Policy
                            </Footer.Link>
                            <Footer.Link href='#'>
                                Term's &amp; Conditions
                            </Footer.Link>
                        </Footer.LinkGroup>

                    </div>
                </div>
                <div className=' mt-5'>
                <Link to='/' className=' ml-8 flex self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                    <FaCampground className=' font-serif font-bold text-center '/>
                    <span className=' font-serif tracking-wide font-bold text-xl pl-4'>Rsc</span>
                    Blog's
                </Link>
                </div>
            </div>
        </div>
    </Footer>
  )
}
