import { createSlice } from '@reduxjs/toolkit';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const expirationTimeFromStorage = localStorage.getItem('expirationTime')
  ? parseInt(localStorage.getItem('expirationTime'), 10)
  : null;

const initialState = {
  userInfo: userInfoFromStorage,
  expirationTime: expirationTimeFromStorage,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      // Set expiration time to 1 hour from now
      const expirationTime = new Date().getTime() + 60 * 60 * 1000;
      state.expirationTime = expirationTime;

      // Save user info and expiration time to localStorage
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      localStorage.setItem('expirationTime', expirationTime);
    },
    logout: (state) => {
      state.userInfo = null;
      state.expirationTime = null;
      // Remove user info and expiration time from localStorage
      localStorage.removeItem('userInfo');
      localStorage.removeItem('expirationTime');
    },
    checkExpiration: (state) => {
      const currentTime = new Date().getTime();
      if (state.expirationTime && currentTime > state.expirationTime) {
        state.userInfo = null;
        state.expirationTime = null;
        // Remove user info and expiration time from localStorage
        localStorage.removeItem('userInfo');
        localStorage.removeItem('expirationTime');
      }
    },
  },
});

export const { setCredentials, logout, checkExpiration } = authSlice.actions;

export default authSlice.reducer;
