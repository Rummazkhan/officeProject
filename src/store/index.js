import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialStoreState = {
  isAuthenticated: false,
  userEmailId: "",
  name: "",
  image: null,
  resetMail: 0,
  morningData: [],
  lunchData: [],
  eveningData: [],
};
const storeSlice = createSlice({
  name: "StoreState",
  initialState: initialStoreState,
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
    resetState: () => initialStoreState,
  },
});

const store = configureStore({
  reducer: { auth: storeSlice.reducer },
});

export const StoreActions = storeSlice.actions;
export default store;
