import { createSlice } from "@reduxjs/toolkit";

const roleSlice = createSlice({
  name: "role",
  initialState: {
    currentRole: "member", // 'lead' or 'member'
    currentUser: "John Doe",
    isDarkMode: false,
  },
  reducers: {
    switchRole: (state, action) => {
      state.currentRole = action.payload;
    },
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { switchRole, setUser, toggleDarkMode } = roleSlice.actions;
export default roleSlice.reducer;
