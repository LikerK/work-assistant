import { useDispatch, useSelector } from 'react-redux';
import { ref, onValue } from "firebase/database";
import { useAuth } from '../hooks';
import { useEffect } from 'react';
import { db } from '../firebase.js';
import { actions as studentsActions } from '../slices/students';
import { actions as lessonsActions } from '../slices/lessons';
import Scedule from './Shedule.jsx';
import Salary from './Salary';
import Students from './Students';
import '../index.css';


const Main = () => {
  const auth = useAuth();
  // const db = getDatabase();
  const dispatch = useDispatch();
  const { currentComponent } = useSelector((state) => state.components);
  useEffect(() => {
    const starCountRef = ref(db, 'users/' + auth.user.uid);
    onValue(starCountRef, (snapshot) => {
      const students = snapshot.val() ?? [];
      const keys = Object.keys(students);
      keys.forEach(name => {
        dispatch(lessonsActions.addLessons(students[name].lessons));
      });
      dispatch(studentsActions.addStudents(students));
    }, { onlyOnce: true });
  }, [auth.user.uid, dispatch]);
  
  const renderComponent = () => {
    switch (currentComponent) {
      case 'students':
        return <Students />
      case 'salary':
        return <Salary />
      default:
        return <Scedule />
    }
  }

  return (
    <div className="container overflow-hidden h-100">
      {renderComponent()}
    </div>
  )};

export default Main;