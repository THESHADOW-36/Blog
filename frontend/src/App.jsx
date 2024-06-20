import './App.css';
import { Route, Routes } from 'react-router-dom';
import Blog from './pages/blog/Blog';
import Resgister from './pages/register/Register';
import Login from './pages/login/Login';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <div className="App">
      <div className='appNav'>
        <Navbar />
      </div>
      <div className='appContent'>
        <Routes>
          <Route path='/' element={<Blog />} />
          <Route path='/register' element={<Resgister />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </div >
  );
}

export default App;
