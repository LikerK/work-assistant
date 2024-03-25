import Alert from 'react-bootstrap/Alert';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { ref, onValue, getDatabase } from "firebase/database";
import { useAuth } from '../hooks';
import { ReactComponent as CopyIcon } from '../assets/copy.svg';
import { useEffect } from 'react';
import '../firebase.js';
import Scedule from './Shedule.jsx';


// const starCountRef = ref(db, 'users/'); // useEffect one

// onValue(starCountRef, (snapshot) => {
//   const students = snapshot.val();
//   if (students) {
//     const keys = Object.keys(students);
//     const names = keys.map((name) => {
//       return { id: _.uniqueId(), name: name };
//     })
//     const values = Object.values(students).flat();
//     const lessons = _.sortBy(values, (l) => parseInt(l.id));
//     const lastId = lessons[lessons.length - 1].id;
//     store.dispatch(studentsActions.addStudents(names));
//     store.dispatch(lessonsActions.addLessons(lessons));
//     store.dispatch(lessonsActions.setLastId(parseInt(lastId) + 1));
//   } else {
//     console.log(0);
//     store.dispatch(lessonsActions.setLastId(0));
//   }
// });


const Main = () => {
  const auth = useAuth();
  const db = getDatabase();
  const { currentComponent } = useSelector((state) => state.components);
  useEffect(() => {
    const starCountRef = ref(db, 'users/' + auth.user.uid);
    onValue(starCountRef, (snapshot) => {
      console.log(snapshot.val());
    });
  }, [auth.user.uid, db]);
  
  const renderComponent = () => {
    if (currentComponent == 'shedule') {
      return <Scedule />
    }
  }

  return (
    <div className="container h-100 d-flex flex-column justify-content-between">
      {renderComponent()}
    </div>
  )};

export default Main;