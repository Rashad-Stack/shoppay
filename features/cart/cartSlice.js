const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {},
});

// export const{}= cartSlice.actions;
export default cartSlice.reducer;
