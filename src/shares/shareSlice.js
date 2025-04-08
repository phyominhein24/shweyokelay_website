import { createSlice } from "@reduxjs/toolkit";

const shareSlice = createSlice({
  name: "share",
  initialState: {
    notification: [],
    errors: null,
    showSidebar: false,
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
    updateUser: (state,action) => {
      state.user = action.payload;
      return state;
    },
    updateMan: (state,action) => {
      state.man = action.payload;
      return state;
    },
    updateRole: (state,action) => {
      state.role = action.payload;
      return state;
    },
    updatePermission: (state,action) => {
      state.permissions = action.payload;
      return state;
    }
  },
});

export const {
  updateUserLogin,
  updateNotification,
  removeNotification,
  updateError,
  updateUser,
  audioToggle,
  updateRole,
  updatePermission,
  updateMan,
} = shareSlice.actions;
export default shareSlice.reducer;
