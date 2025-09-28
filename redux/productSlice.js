import {createSlice} from "@reduxjs/toolkit"

const productSlice = createSlice({
  name: 'product',
  initialState:{
    products: [],
    cart:[],
    fav:[],
    order:[],
  },
  reducers:{
    setProduct:(state,action)=>{
      state.products = action.payload
    },
    setCart:(state,action)=>{
      state.cart = action.payload
    },
    setFav:(state,action)=>{
      state.fav = action.payload
    },
    setOrder:(state,action)=>{
      state.order = action.payload
    }
  }
})

export const {setProduct, setCart, setFav, setOrder} = productSlice.actions;
export default productSlice.reducer;