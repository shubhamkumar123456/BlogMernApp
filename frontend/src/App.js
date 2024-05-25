import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes ,Route, Navigate} from 'react-router-dom'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import YourPosts from './pages/YourPosts';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import SinglePost from './pages/SinglePost';
function App() {

  let store = useContext(AuthContext)
  console.log(store)
  console.log(store.userDetail.login)
  let value = store.userDetail.login
  return (
    <div className="App">
      <BrowserRouter>
            <Navbar/>
          <Routes>
             {value && <Route path='/'  element={<Home/>}/>}
             {!value && <Route path='/'  element={<Navigate to={'/login'}/>}/>}
              <Route path='/register'  element={<Signup/>}/>
             {value && <Route path='/login'  element={<Navigate to={'/'}/>}/>}
             {!value && <Route path='/login'  element={<Login/>}/>}
             {value && <Route path='/yourBlogs'  element={<YourPosts/>}/>}
             {!value && <Route path='/yourBlogs'  element={<Navigate to={'/login'}/>}/>}
              <Route path='/single' element={<SinglePost/>}/>
          </Routes>
          <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
