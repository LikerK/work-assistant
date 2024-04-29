import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const studentsAdapter = createEntityAdapter();
const initialState = studentsAdapter.getInitialState();

const studentsSlice =  createSlice({
  name: 'students',
  initialState,
  reducers: {
    addStudent: studentsAdapter.addOne,
    addStudents: studentsAdapter.addMany,
    removeStudent: studentsAdapter.removeOne,
    setStudent: studentsAdapter.setOne,
    setLastId: (state, { payload }) => ({ ...state, lastId: payload }),
  }
});

export const selectors = studentsAdapter.getSelectors((state) => state.students);
export const { actions } = studentsSlice;
export default studentsSlice.reducer;
