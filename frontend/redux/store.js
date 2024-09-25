// store.js
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from './api/apiSlice';
import { userApiSlice } from './api/userSlice';
import { customerApiSlice } from './api/customerSlice';
import { productApiSlice } from './api/productSlice';
import { selectorApiSlice } from './api/selectorSlice';
import { inventoryApiSlice } from './api/inventorySlice';
import { supplierApiSlice } from './api/supplierSlice';
import { orderApiSlice } from './api/orderSlice';
import { reportApiSlice } from './api/reportSlice';
import authReducer from './feature/authSlice';
import themeReducer from './feature/themeSlice';

const slices = [
  userApiSlice,
  customerApiSlice,
  productApiSlice,
  selectorApiSlice,
  inventoryApiSlice,
  supplierApiSlice,
  orderApiSlice,
  reportApiSlice,
];

const store = configureStore({
  reducer: slices.reduce(
    (reducers, slice) => {
      reducers[slice.reducerPath] = slice.reducer;
      return reducers;
    },
    {
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth: authReducer,
      theme: themeReducer,
    }
  ),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

export default store;
