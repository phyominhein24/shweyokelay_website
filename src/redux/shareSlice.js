import { createSlice } from "@reduxjs/toolkit";

const shareSlice = createSlice({
  name: "share",
  initialState: {
    notification: [],
    errors: null,
    mobileMenu: false,
    user: {},
    userLogIn: false
  },
  reducers: {
    updateUserLogin: (state, action) => {
      state.userLogIn = action.payload;
      return state;
    },
    updateNotification: (state, action) => {
      state.notification.push({
        id : Date.now(),
        variant : action.payload.variant,
        message : action.payload.message
    });
      return state;
    },
    removeNotification: (state, action) => {
      state.notification = state.notification.filter(
        (notification) => notification.id !== action.payload
      );
    },
    updateError: (state, action) => {
      state.errors = { ...action.payload };
      return state;
    },
    sidebarToggle: (state) => {
      state.showSidebar = !state.showSidebar;
      return state;
    },
    updateUser: (state,action) => {
      state.user = action.payload;
      return state;
    },
    mobileMenuOpen: (state, action) => {
      state.mobileMenu = true;
      return state;
    },
    mobileMenuClose: (state) => {
      state.mobileMenu = false;
      return state;
    },
    mobileMenuToggle: (state) => {
      state.mobileMenu = !state.mobileMenu;
      return state;
    },
  },
});

export const { updateUserLogin, updateNotification, removeNotification, updateError, sidebarToggle, updateUser, mobileMenuOpen, mobileMenuToggle } = shareSlice.actions;
export default shareSlice.reducer;
