import { createContext, useEffect, useState } from "react";
import { Url } from "./Url";
import axios from "axios";

export const MyContext = createContext();

const Context = ({ children }) => {
   const [currentUser, setCurrentUser] = useState();

   const token = localStorage.getItem('UserToken')

   const headers = {
      Authorization: "Bearer " + token
   }

   const getUserData = async () => {
      try {
         await axios.get(Url.currentUser, { headers })
            .then((res) => {
               setCurrentUser(res.data.user)
            })
            .catch((error) => console.log(error))
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      getUserData();
      // eslint-disable-next-line
   }, [])

   return (
      <MyContext.Provider value={{ headers, currentUser }}>
         {children}
      </MyContext.Provider>
   )
}

export default Context;