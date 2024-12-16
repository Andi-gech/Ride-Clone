// AuthProvider.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getToken, saveToken } from './secureTokenStore';
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState();
  useEffect(() => {
    const initializeUserToken = async () => {
      const token = await getToken();
      
      if (token) {
        setUserToken(token);
      }
    };
    initializeUserToken();
  }, []);

  const signIn = async (jwtToken) => {
    await saveToken(jwtToken);
    setUserToken(jwtToken);
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync('authToken');
    setUserToken(null);
  };

 
  

  return (
    <AuthContext.Provider value={{ userToken, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
