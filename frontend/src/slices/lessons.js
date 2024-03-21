import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const lessonsAdapter = createEntityAdapter();
const initialState = lessonsAdapter.getInitialState({});

const lessonsSlice =  createSlice({
  name: 'lessons',
  initialState,
  reducers: {
    addLesson: lessonsAdapter.addOne,
    addLessons: lessonsAdapter.addMany,
    setLastId: (state, { payload }) => ({ ...state, lastId: payload }),
  }
});

export const selectors = lessonsAdapter.getSelectors((state) => state.lessons);
export const { actions } = lessonsSlice;
export default lessonsSlice.reducer;
