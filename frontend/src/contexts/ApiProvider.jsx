import React, { useCallback } from 'react';
import { ApiContext } from '.';
import { ref, set } from "firebase/database";
import { db } from '../firebase.js';
import { useAuth } from '../hooks/index';
import { useDispatch } from 'react-redux';
import { actions as studentsActions } from '../slices/students';
import { actions as lessonsActions } from '../slices/lessons';


const ApiProvider = ({ children }) => {
  const auth = useAuth();
  const dispatch = useDispatch();

  const removeStudent = useCallback((student) => {
    const studentRef = ref(db, `users/${auth.user.uid}/${student.id}`);
    const idsLessons = student.lessons.map((lesson) => lesson.id);
    set(studentRef, null);
    dispatch(lessonsActions.removeLessons(idsLessons));
    dispatch(studentsActions.removeStudent(student.id));
  }, [auth, dispatch]);

  const removeLesson = useCallback((data) => {
    const { student, lesson } = data;
    const lessons = student.lessons;
    const newLessons = lessons.filter((item) => JSON.stringify(item) !== JSON.stringify(lesson));
    const lessonsRef = ref(db, `users/${auth.user.uid}/${student.id}/lessons`);
    const newStudent = {
      id: student.id,
      lessons: newLessons,
      name: student.name
    };
    set(lessonsRef, newLessons);
    dispatch(lessonsActions.removeLesson(lesson.id));
    dispatch(studentsActions.setStudent(newStudent));
  }, [dispatch, auth]);

  const api = {
    removeStudent,
    removeLesson,
  }

  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>

  );
};

export default ApiProvider;