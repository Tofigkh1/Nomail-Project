import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    usebutton: false,
  },
  reducers: {
    setUseButtonTrue(state) {
      state.usebutton = true;
    },
    setUseButtonFalse(state) {
      state.usebutton = false;
    },
  },
});

export const { setUseButtonTrue, setUseButtonFalse } = messageSlice.actions;
export default messageSlice.reducer;