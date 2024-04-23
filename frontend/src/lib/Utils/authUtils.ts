import axios from 'axios';

const refreshToken = async (refreshToken: string) => {
  const API_URL = import.meta.env.VITE_API_BASE_URL; // Your API URL

  try {
    const response = await axios.get(`${API_URL}/api/v1/users/refresh/token`, {
      withCredentials: true, // Send cookies with the request
      headers: {
        Cookie: `refreshToken=${refreshToken}` // Send the refresh token as a cookie
      }
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data;
    return { accessToken, refreshToken: newRefreshToken };
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error; // Rethrow the error to handle it in the calling code
  }
};

export default refreshToken;
