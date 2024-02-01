import React from 'react'
import { Footer } from 'flowbite-react'
import { Link} from 'react-router-dom'


export default function Footerc() {
  return (
    <Footer container className=' border border-t-4 border-teal-600'>
        <div className=' w-full max-w-7xl mx-auto'>
            <div className=' grid w-full justify-between sm:flex md:grid-cols-1'>
                <div className=' mt-5'>
                    <Link to='/' className=' self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
                        <span className=' px-2 py-1 bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-500 rounded-xl text-white'>Rsc</span>
                        Blog's
                    </Link>
                </div>
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
            </div>
            <Footer.Divider />
            <div className=''>
                <Footer.Copyright href='#'  by='Rohit Blog' year={new Date().getFullYear()}/>
            </div>
        </div>
    </Footer>
  )
}
