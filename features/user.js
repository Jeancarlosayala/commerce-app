import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: [],
  userId: [],
}

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = [...state.userId, action.payload]
    },
    setCurrentUser: (state, action) =>{
      state.currentUser = [...state.currentUser, action.payload]
    }
  }
})

export const { setCurrentUser, setUserId } = user.actions;

export const getCurrentUser = state => state.user.currentUser[0];
export const getUserId = state => state.user.userId[0];

export default user.reducer;