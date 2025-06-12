import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    // console.log(user);

     //create user
     const createUser =(email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth , email, password)
        
     } 
     //update user
     const updateUser = (updatedData) =>{
        return updateProfile(auth.currentUser, updatedData)
     }

     //forget pass
     const forgetPassword = (email) =>{
      return sendPasswordResetEmail(auth, email)
     }

     //login
     const login = (email, password)=>{
        setLoading(true)
       return signInWithEmailAndPassword(auth, email, password);
     }

     //logout
     const logOut = ()=>{
        return signOut(auth);
     }

     //GOOGLE
     const provider = new GoogleAuthProvider();
     const googleSignIn = () =>{
        return signInWithPopup(auth, provider)
     }

     //observer
     useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
            setLoading(false)
        });
        return () => {
            unsubscribe();
        }
     },[])

    const authData = {
        user,
        setUser,
        createUser,
        logOut,
        login,
        loading,
        setLoading,
        updateUser,
        googleSignIn,
        forgetPassword,
    }

    return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;