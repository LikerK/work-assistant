import { createSlice } from '@reduxjs/toolkit';

const componentsSlice = createSlice({
  name: 'components',
  initialState: { currentComponent: 'shedule' },
  reducers: {
    setComponent: (state, { payload }) => {
      state.currentComponent = payload.currentComponent;
    }
  }
});

export const { setComponent } = componentsSlice.actions;
export default componentsSlice.reducer;
