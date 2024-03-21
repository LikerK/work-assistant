import { configureStore } from '@reduxjs/toolkit';
import modalsSlice from './modals.js';
import studentsSlice from './students.js';
import lessonsSlice from './lessons.js';

export default configureStore({
  reducer: {
    modalsSlice,
    students: studentsSlice,
    lessons: lessonsSlice,
  },
});
