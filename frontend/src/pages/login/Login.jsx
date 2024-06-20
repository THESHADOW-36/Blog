import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./../register/Register.css";
// import { URL } from '../../constant/Url';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
   const [userData, setUserData] = useState({ email: "", password: "" });
   const [validation, setValidation] = useState({ email: false, password: false });

   const router = useNavigate();

   const handleChange = (event) => {
      setUserData({ ...userData, [event.target.name]: event.target.value })
      setValidation({ ...validation, [event.target.name]: false })
   }

   const handleSubmit = (event) => {
      event.preventDefault();

      let isValid = true;
      const updatedValidation = {};

      for (const field in userData) {
         if (!userData[field]) {
            updatedValidation[field] = true;
            isValid = false;
         } else {
            updatedValidation[field] = false;
         }
      }

      setValidation(updatedValidation);
      if (!isValid) {
         return console.log("All fields are mandatory");
      }

      //  try {
      //    axios
      //      .post(URL.login, userData)
      //      .then((res) => {
      //        localStorage.setItem("user-token", res.data.token)
      //        setUserData({ email: "", password: "" })
      //        router('/')
      //        toast.success("Logged In Successfully")
      //      })
      //      .catch((err) => {
      //        // toast.error(err.response.data.message)
      //        if (err.response.data.message === "User is not found") {
      //          setValidation({ ...validation, email: true })
      //        }
      //        if (err.response.data.message === "Incorrect Password") {
      //          setValidation({ ...validation, password: true })
      //        }
      //      })
      //  } catch (error) {
      //    console.log(error)
      //  }
   }

   return (
      <div className='authContainer'>
         <div className='formContainer'>
            <h3 className='formTitle'>Login</h3>
            <form onSubmit={handleSubmit}>
               <div className='formLay mt-3'>
                  <input className='formInput' type="email" name='email' placeholder='Email ID' value={userData.email} onChange={handleChange} />
                  {(validation.email && !userData.email) &&
                     <p className='formValidation'>Enter your Email ID</p>
                  }
                  {(validation.email && userData.email) &&
                     <p className='formValidation'>Invalid Email</p>
                  }
               </div>
               <div className='formLay mt-3'>
                  <input className='formInput' type="password" name='password' placeholder='Password' value={userData.password} onChange={handleChange} />
                  {(validation.password && !userData.password) &&
                     <p className='formValidation'>Enter your password</p>
                  }
                  {(validation.password && userData.password) &&
                     <p className='formValidation'>Incorrect Password</p>
                  }
               </div>
               <div className='btnLay'>
                  <button className='submitBtn' type='submit'>Submit</button>
                  <p className='clickHere' onClick={() => router('/register')}>Already Register? Click here</p>
               </div>
            </form>
         </div >
      </div >
   )
}

export default Login