// utils/jwtUtils.js
export const decodeJWT = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (error) {
    return null;
  }
};

export const getTokenExpirationTime = (token) => {
  const decoded = decodeJWT(token);
  return decoded ? decoded.exp * 1000 : null; // Convert to milliseconds
};