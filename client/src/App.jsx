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
import IsTruePrivateRoute from './components/IsTruePrivatRoute'
import CreatePost from './Pages/CreatePost'
import UpdatePost from './Pages/UpdatePost'
import PostPage from './Pages/PostPage'
import ScrollToTop from './Pages/ScrollToTop'
import Search from './Pages/Search'
function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncCurrenUser());
    }, []);
  return (
    <BrowserRouter>
    <ScrollToTop />
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/sign-in' element={<Signin />} />
      <Route path='/about' element={<About />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/search' element={<Search />} />
      <Route element={<PrivatRoute />}>
        <Route path='/dashboard' element={<Dashboard />} />
      </Route>
      <Route element={<IsTruePrivateRoute />}>
        <Route path='/create-post' element={<CreatePost />} />
        <Route path='/update-post/:postId' element={<UpdatePost />}/>
      </Route>
      <Route path='/Project' element={<Project />} />
      <Route path='/post/:postslug' element={<PostPage />} />
    </Routes>
    <Footer />
    </BrowserRouter>
  )
}

export default App
