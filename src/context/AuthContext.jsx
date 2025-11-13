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

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const login = async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const token = await cred.user.getIdToken();
    localStorage.setItem("fbIdToken", token);
    return cred;
  };

  const register = async (email, password) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const token = await cred.user.getIdToken();
    localStorage.setItem("fbIdToken", token);
    return cred;
  };

  const googleLogin = async () => {
    const cred = await signInWithPopup(auth, googleProvider);
    const token = await cred.user.getIdToken();
    localStorage.setItem("fbIdToken", token);
    return cred;
  };

  const updateUserProfile = (name, photo) =>
    updateProfile(auth.currentUser, { displayName: name, photoURL: photo });

  const logout = async () => {
    localStorage.removeItem("fbIdToken");
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const token = await currentUser.getIdToken();
        localStorage.setItem("fbIdToken", token);
        setUser(currentUser);
      } else {
        localStorage.removeItem("fbIdToken");
        setUser(null);
      }
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
