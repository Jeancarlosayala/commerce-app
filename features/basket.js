import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: []
}

export const basket = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItemBasket: (state, action) =>{
      state.items = [...state.items, action.payload];
    },
    removeItemBasket: (state, action) =>{
      const index = state.items.findIndex((item) => item._id === action.payload._id);

      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1)
      }else{
        console.warn(`No se puede remover el producto (id: ${action.payload._id} no se encuentra en el carrito)`);
      }

      state.items = newBasket;
    }
  }
})

export const { addItemBasket, removeItemBasket } = basket.actions;

export const selectItemBasket = state => state.basket.items;
export const selectItemBasketId = (state, _id) => state.basket.items.filter(item => item._id === _id)
export const selectBasketTotal = (state) => state.basket.items.reduce((total,item) => total += item.price , 0)

export default basket.reducer;