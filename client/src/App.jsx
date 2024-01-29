import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signin from './Pages/Signin'
import About from './Pages/About'
import SignUp from './Pages/SignUp'
import Dashboard from './Pages/Dashboard'
import Project from './Pages/Project'
import Home from './Pages/Home'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/sign-in' element={<Signin />} />
      <Route path='/about' element={<About />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/Dashboard' element={<Dashboard />} />
      <Route path='/Project' element={<Project />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
