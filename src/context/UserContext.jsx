import React, {  createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import {auth} from '../utils/firebaseConfig.js'

// import firebase from 'firebase/compat/app';

const UserContext = createContext();
 export const UserProvider = ({children}) =>{
    const [user , setUser] = useState(null);
    const [loading ,setLoading] = useState(true);
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(firebaseUser)=>{
            setUser(firebaseUser);
            setLoading(false);
        });

        return ()=> unsubscribe();
    },[]);


    return(
        <UserContext.Provider value={{user,loading}}>
            {children}
        </UserContext.Provider>
    )

 }

 export const useUser = () => useContext(UserContext);
