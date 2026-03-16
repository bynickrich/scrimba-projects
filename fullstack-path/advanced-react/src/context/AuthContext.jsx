import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../../utils/supabase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // Seesion state (user info, sign-status)
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
    console.log(`Session changed: ${session}`);
  };

  useEffect(() => {
    // 1. Check on first render for a sessonion (getSession())

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
      console.error('Unepected error during sign in:', error.message)
      return { success: false, error: 'An unexpected error accord, please try again' }
    }
  }


  return (
    <AuthContext.Provider value={{ session, signInUser }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
