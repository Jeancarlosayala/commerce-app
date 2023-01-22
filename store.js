import { configureStore } from "@reduxjs/toolkit";
import basketReducer from './features/basket'
import restantReducer from './features/restaurant'
import userReducer from './features/user'

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    restaurant: restantReducer,
    user: userReducer,
  }
})