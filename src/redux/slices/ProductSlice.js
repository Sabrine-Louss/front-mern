import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const GetProducts = createAsyncThunk(
  "Products",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.get("/user/getproduct");
      return res.data;
    } 
    catch (error) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    errors: false,
    isLoading: false,
    products: []
  },
  reducers: {},
  extraReducers: {
    [GetProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [GetProducts.fulfilled]: (state, action) => {
      state.errors = null;
      state.products = action.payload.products;
      state.isLoading = false;
    },
    [GetProducts.rejected]: (state, action) => {
      state.errors = action.payload;
      
    }
  }
});

// export const { logout } = UserSlice.actions;
export default ProductSlice.reducer;
