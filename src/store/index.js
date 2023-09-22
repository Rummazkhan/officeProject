import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  userEmailId: "",
  name: "",
  image: null,
  resetMail: 0,
  morningData: [],
  lunchData: [],
  eveningData: [],
};
const authSlice = createSlice({
  name: "Authentication",
  initialState: initialAuthState,
  reducers: {
    isLoggedIn(state) {
      state.isAuthenticated = true;
    },
    userEmail(state, action) {
      state.userEmailId = action.payload;
    },
    employee(state, action) {
      state.name = action.payload;
    },
    employeePhoto(state, action) {
      state.image = action.payload;
    },
    resetMail(state, action) {
      state.resetMail = action.payload;
    },
    morningTeaData(state, action) {
      state.morningData = action.payload;
    },
    lunchTimeData(state, action) {
      state.lunchData = action.payload;
    },
    eveningTeaData(state, action) {
      state.eveningData = action.payload;
    },
    resetState: () => initialAuthState,
  },
});

const store = configureStore({
  reducer: { auth: authSlice.reducer },
});

export const AuthActions = authSlice.actions;
export default store;
