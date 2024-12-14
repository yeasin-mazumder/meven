import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlices';
import priceRangeReducer from './slices/priceRangeSlice';
import sortReducer from './slices/sorSlice';
import colorReducer from './slices/colorSlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    priceRange: priceRangeReducer,
    sort: sortReducer,
    colors: colorReducer,
  },
});

export default store;
