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
      const { name, email, password } = action.payload;
      state.name = name;
      state.email = email;
      state.password = password;
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
