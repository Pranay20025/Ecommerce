import { createSlice } from "@reduxjs/toolkit"

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    orders:[]
  },
  reducers:{
    setProduct:(state,action) =>{
      state.products = action.payload
    },
    setOrders:(state,action) =>{
      state.orders = action.payload
    }
  }
})

export const {setProduct, setOrders} = productSlice.actions;
export default productSlice.reducer;