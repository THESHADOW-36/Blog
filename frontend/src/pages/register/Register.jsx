import React, { useState } from 'react';
import './Register.css'
import axios from 'axios';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { Url } from '../../constant/Url';

const Register = () => {
   const [userData, setUserData] = useState({ firstName: "", lastName: "", dob: "", phone: "", email: "", password: "", confirmPassword: "" });
   const [validation, setValidation] = useState({ firstName: false, lastName: false, dob: false, phone: false, email: false, password: false, confirmPassword: false })
   const router = useNavigate();

   const handleChange = (event) => {

      if (event.target.name === "phone" && event.target.value.length > 10) {
         return console.log("Upto 10 digits")
      }

      setUserData({ ...userData, [event.target.name]: event.target.value })
      setValidation({ ...validation, [event.target.name]: false })

      if (event.target.name === "confirmPassword" && event.target.value !== userData.password) {
         setValidation({ ...validation, [event.target.name]: true })
      }
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

      if (userData.password !== userData.confirmPassword) {
         setValidation({ ...validation, confirmPassword: true })
         return toast.error("Invalid Password")
      }

      try {
         axios
            .post(Url.register, userData)
            .then((res) => {
               setUserData({ firstName: "", lastName: "", dob: "", phone: "", email: "", password: "", confirmPassword: "" })
               toast.success("Registered Successfully")
               router("/login")
            })
            .catch((err) => {
               // toast.error(err.response.data.error)
               setValidation({ ...validation, email: true })
            })
      } catch (error) {
         console.log(error)
      }
   }

   return (
      <div className='authContainer'>
         <div className='formContainer'>
            <h3 className='formTitle'>Register</h3>
            <form onSubmit={handleSubmit}>
               <div className='d-flex flex-column flex-md-row'>
                  <div className='formLay w-100 me-md-2'>
                     <input className='formInput' type="text" name='firstName' placeholder='First Name' value={userData.firstName} onChange={handleChange} />
                     {validation.firstName &&
                        <p className='formValidation'>Enter your first name</p>
                     }
                  </div>
                  <div className='formLay w-100 ms-md-2'>
                     <input className='formInput' type="text" name='lastName' placeholder='Last Name' value={userData.lastName} onChange={handleChange} />
                     {validation.lastName &&
                        <p className='formValidation'>Enter your last name</p>
                     }
                  </div>
               </div>
               <div className='formLay'>
                  <input className='formInput' type="date" name='dob' placeholder='Date Of Birth' value={userData.dob} onChange={handleChange} />
                  {validation.dob &&
                     <p className='formValidation'>Enter your Date Of Birth</p>
                  }
               </div>
               <div className='formLay'>
                  <input className='formInput' type="number" name='phone' placeholder='Phone Number' value={userData.phone} onChange={handleChange} />
                  {validation.phone &&
                     <p className='formValidation'>Enter your Phone Number</p>
                  }
               </div>
               <div className='formLay'>
                  <input className='formInput' type="email" name='email' placeholder='Email ID' value={userData.email} onChange={handleChange} />
                  {(validation.email && !userData.email) &&
                     <p className='formValidation'>Enter your Email ID</p>
                  }
                  {(validation.email && userData.email) &&
                     <p className='formValidation'>Duplicate field value entered</p>
                  }
               </div>
               <div className='formLay'>
                  <input className='formInput' type="password" name='password' placeholder='Password' value={userData.password} onChange={handleChange} />
                  {(validation.password && !userData.password) &&
                     <p className='formValidation'>Set your password</p>
                  }
                  {(validation.password && userData.password) &&
                     <p className='formValidation'>Password is not identical</p>
                  }
               </div>
               <div className='formLay'>
                  <input className='formInput' type="password" name='confirmPassword' placeholder='Confirm Password' value={userData.confirmPassword} onChange={handleChange} />
                  {(validation.confirmPassword && !userData.confirmPassword) &&
                     <p className='formValidation'>Confirm your Password</p>
                  }
                  {(validation.confirmPassword && userData.confirmPassword) &&
                     <p className='formValidation'>Password is not identical</p>
                  }
               </div>

               <div className='btnLay'>
                  <button className='submitBtn' type='submit'>Submit</button>
                  <p className='clickHere' onClick={() => router("/login")}>Not yet registered? Click here</p>
               </div>
            </form>
         </div >
      </div >
   )
}

export default Register