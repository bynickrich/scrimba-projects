import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../../utils/supabase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // Session state (user info, sign-status)
  const [session, setSession] = useState(undefined);

  const getInitialSession = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;

      console.log(data.session);
      setSession(data.session);
    } catch (error) {
      console.error("Failed to get user session", error.message);
    }
  };

  const handleAuthChange = (_event, session) => {
    setSession(session);
  };

  useEffect(() => {
    // 1. Check on first render for a session (getSession())

    getInitialSession();

    // 2. Listen for changes in auth state
    const { data } = supabase.auth.onAuthStateChange(handleAuthChange);

    // Clean up
    return () => data.subscription.unsubscribe();
  }, []);

  // Auth functions (signin, signup, logout)
  const signInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password: password
      })

      if (error) {
        console.error('Supabase sign-in error:', error.message)
        return { success: false, error: error.message }
      }

      console.log('Supabase sign in success:', data)
      return { success: true, data }
    } catch (error) {
      console.error('Unexpected error during sign in:', error.message)
      return { success: false, error: 'An unexpected error accord, please try again' }
    }
  }

  // Sign out
  const signOutUser = async () => {
    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        console.error('Supabase sign out error:', error.message)
        return { success: false, error: error.message }
      }

      console.log('Supabase sign out success')
      return { success: true }
    } catch (error) {
      console.error('Unexpected error during sign in:', error.message)
      return { success: false, error: 'An unexpected error accord, please try again' }
    }
  }

  // Get user information
  // const getUserDetails = async () => {
  //   try {
  //     const { data: { user } } = await supabase.auth.getUser()

  //   } catch (error) {

  //   }
  // }


  return (
    <AuthContext.Provider value={{ session, signInUser, signOutUser }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
