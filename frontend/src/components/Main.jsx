import Alert from 'react-bootstrap/Alert';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { ref, onValue, getDatabase } from "firebase/database";
import { selectors } from '../slices/lessons';
import { useBd } from '../hooks';
import { useAuth } from '../hooks';
import { ReactComponent as CopyIcon } from '../assets/copy.svg';
import { useEffect } from 'react';
import '../firebase.js';


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
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    const starCountRef = ref(db, 'users/' + auth.user.uid);
    onValue(starCountRef, (snapshot) => {
      console.log(snapshot.val());
    });
  }, [auth.user.uid, db]);

  const lessons = useSelector(selectors.selectAll);
  const date = new Date();

  const lessonsToday = lessons.length !== 0 ? lessons.filter((lesson) => {
    const lessonToday = new Date(lesson.lessonDate);
    return lessonToday.getDate() === date.getDate() && lessonToday.getMonth() === date.getMonth();
  }) : [];

  return (
    <div className="container h-100 d-flex flex-column justify-content-between">
      <div className="lessons">
        <h3 className='my-2'>Сегодня</h3>
        {lessonsToday.map((lesson) => {
          // const day = lesson.lessonDate.slice(8, 11);
          const time = lesson.lessonDate.slice(16, 21);
          const lessonClass = cn('bg-light', 'p-2', 'my-2', 'd-flex', 'flex-column', 'border', 'rounded', {
            'border-danger': lesson.passed,
            'border-success': !lesson.passed
          });

          return (
            <div key={lesson.id} className={lessonClass}>
              <span className="my-1"> Имя: {lesson.studentName}</span>
              <span>Время: {time}</span>
            </div>
          );
        })}
      </div>
      <div className="copypasta">
        <h3>Copypasta</h3>
        <Alert className="p-0" variant="light">
          <Button
            variant="light"
            type="button"
            className="border-0 p-3 bg-light w-100"
            onClick={() => copyText('Нагорный Кирилл')}
          >
            <div className="d-flex justify-content-between" >
              <span>Нагорный Кирилл</span>
              <CopyIcon />
            </div>
          </Button>
        </Alert>
        <Alert className="p-0" variant="light">
          <Button
            variant="light"
            type="button"
            className="border-0 p-3 bg-light w-100"
            onClick={() => copyText('nagorniykirill@gmail.com')}
          >
            <div className="d-flex justify-content-between" >
              <span>nagorniykirill@gmail.com</span>
              <CopyIcon />
            </div>
          </Button>
        </Alert>
      </div>
    </div>
)};

export default Main;