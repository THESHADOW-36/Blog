import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Homepage from './pages/homepage/Homepage';
import Resgister from './pages/register/Register';
import Login from './pages/login/Login';
import Navbar from './components/navbar/Navbar';
import Bookmark from './pages/bookmark/Bookmark';
import Profile from './pages/profile/Profile';
import UserList from './pages/userList/UserList';
import BlogForm from './pages/blog/BlogForm';
import { useContext } from 'react';
import { MyContext } from './constant/Context';

function App() {
  const { currentUser } = useContext(MyContext)

  const loc = useLocation();
  const isLoginPg = loc.pathname === "/login";
  const isRegPg = loc.pathname === "/register";

  const isAdmin = currentUser?.role === "Admin"

  return (
    <div className="App">
      {!(isLoginPg || isRegPg) &&
        <div className='appNav'>
          <Navbar />
        </div>
      }
      <div className='appContent'>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/register' element={<Resgister />} />
          <Route path='/login' element={<Login />} />
          <Route path='/bookmark' element={<Bookmark />} />
          <Route path='/profile' element={<Profile />} />
          {isAdmin &&
            <>
              <Route path='/profile/:id' element={<Profile />} />
              <Route path='/user-list' element={<UserList />} />
              <Route path='/user-list/:id' element={<UserList />} />
              <Route path='/add-blog' element={<BlogForm />} />
              <Route path='/edit-blog/:id' element={<BlogForm />} />
            </>
          }
        </Routes>
      </div>
    </div >
  );
}

export default App;
