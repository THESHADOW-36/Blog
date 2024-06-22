import './App.css';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/homepage/Homepage';
import Resgister from './pages/register/Register';
import Login from './pages/login/Login';
import Navbar from './components/navbar/Navbar';
import Bookmark from './pages/bookmark/Bookmark';
import Profile from './pages/profile/Profile';
import UserList from './pages/userList/UserList';
import AddBlog from './pages/blog/AddBlog';

function App() {
  return (
    <div className="App">
      <div className='appNav'>
        <Navbar />
      </div>
      <div className='appContent'>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/register' element={<Resgister />} />
          <Route path='/login' element={<Login />} />
          <Route path='/bookmark' element={<Bookmark />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/user-list' element={<UserList />} />
          <Route path='/user-list/:id' element={<UserList />} />
          <Route path='/add-blog' element={<AddBlog />} />
          <Route path='/edit-blog/:id' element={<AddBlog />} />
        </Routes>
      </div>
    </div >
  );
}

export default App;
