import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  initialState: 0,
  name: "counter",
  reducers: {
    inc: (state) => state + 1,
    dec: (state) => state - 1,
  },
});


export const { inc, dec } = counterSlice.actions
export default counterSlice.reducer