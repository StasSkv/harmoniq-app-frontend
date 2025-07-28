import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  password: '',
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setStepOneData: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    clearRegistrationData: (state) => {
      state.name = '';
      state.email = '';
      state.password = '';
    },
  },
});

export const { setStepOneData, clearRegistrationData } = registrationSlice.actions;
export default registrationSlice.reducer;
