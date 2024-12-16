// jwtService.js
import { encode as jwtEncode, decode as jwtDecode } from 'expo-jwt';
const secret = 'your_secret_key'; // Replace with your actual secret key

export const encodeJWT = (payload) => {
  return jwtEncode(payload, secret);
};

export const decodeJWT = (token) => {
  return jwtDecode(token, secret);
};
