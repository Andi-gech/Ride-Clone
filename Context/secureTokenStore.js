// secureTokenStore.js
import * as SecureStore from 'expo-secure-store';

export const saveToken = async (token) => {
  await SecureStore.setItemAsync('authToken', token);
};

export const getToken = async () => {
  return await SecureStore.getItemAsync('authToken');
};
