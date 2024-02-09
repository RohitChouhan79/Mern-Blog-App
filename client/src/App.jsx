import React, { useEffect } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signin from './Pages/Signin'
import About from './Pages/About'
import SignUp from './Pages/SignUp'
import Dashboard from './Pages/Dashboard'
import Project from './Pages/Project'
import Home from './Pages/Home'
import { Header } from './components/Header'
import Footer from './components/Footer'
import PrivatRoute from './components/PrivatRoute'
import { useDispatch } from 'react-redux'
import { asyncCurrenUser } from './redux/Action/actions'
function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncCurrenUser());
    }, []);
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/sign-in' element={<Signin />} />
      <Route path='/about' element={<About />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route element={<PrivatRoute />}>
        <Route path='/dashboard' element={<Dashboard />} />
      </Route>
      <Route path='/Project' element={<Project />} />
    </Routes>
    <Footer />
    </BrowserRouter>
  )
}

export default App
