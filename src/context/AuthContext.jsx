// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

import { auth } from "../firebase/firebase.config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";

export const AuthContext = createContext();

// কাস্টম হুক — সব জায়গায় ব্যবহার করবে
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const register = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const googleLogin = () => signInWithPopup(auth, googleProvider);

  const updateUserProfile = (name, photo) =>
    updateProfile(auth.currentUser, { displayName: name, photoURL: photo });

  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      googleLogin,
      updateUserProfile,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};