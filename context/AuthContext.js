import React, { useEffect, useState } from "react";
import { useContext, createContext } from "react";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"; // ? the logic for implementing login and signup feature is written in this context file
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  // ? checking the login state of user via useeffect and onAuthStateChanged
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      // console.log(currentUser);
    });
    return unsubscribe;
  }, []);

  // ? FUNCTION TO SIGN IN WITH GOOGLE
  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
  };

  // ? FUNCTION TO LOG OUT THE USER
  const logOut = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ signIn, user, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const userAuth = () => {
  return useContext(AuthContext);
};
