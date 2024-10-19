import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  token: "",
  userId: "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      const response = action.payload;
      //console.log("auth response", response);

      state.token = response.token;
      localStorage.setItem("token", response.token);
      localStorage.setItem("email", response.email);
      localStorage.setItem("userId", response.userId);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = "";
      state.userId = "";
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("userId");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
