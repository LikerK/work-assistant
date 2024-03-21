import NavbarMenu from './Navbar.jsx';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { createContext } from 'react';
import _ from 'lodash';
import { Provider } from 'react-redux';
import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
import Schedule from './Schedule.jsx';
import Students from './Students.jsx';
import Salary from './Salary.jsx';
import store from '../slices/index.js';
import { actions as studentsActions } from '../slices/students';
import { actions as lessonsActions } from '../slices/lessons';

const firebaseConfig = {
  apiKey: "AIzaSyD_9cCzljgN4So_VKXAAzz1ruf5DR733Hc",
  authDomain: "myassistant-work.firebaseapp.com",
  projectId: "myassistant-work",
  storageBucket: "myassistant-work.appspot.com",
  messagingSenderId: "578827617404",
  appId: "1:578827617404:web:66ee93e2023bea791e35f9",
  measurementId: "G-3B76GC6YV4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const Context = createContext();

const App = () => {
  const db = getDatabase(app);
  const starCountRef = ref(db, 'users/');

  onValue(starCountRef, (snapshot) => {
    const students = snapshot.val();
    if (students) {
      const keys = Object.keys(students);
      const names = keys.map((name) => {
        return { id: _.uniqueId(), name: name };
      })
      const values = Object.values(students).flat();
      const lessons = _.sortBy(values, (l) => parseInt(l.id));
      const lastId = lessons[lessons.length - 1].id;
      store.dispatch(studentsActions.addStudents(names));
      store.dispatch(lessonsActions.addLessons(lessons));
      store.dispatch(lessonsActions.setLastId(parseInt(lastId) + 1));
    } else {
      console.log(0);
      store.dispatch(lessonsActions.setLastId(0));
    }
  });

  return (
    <Provider store={store}>
      <Context.Provider value={db}>
        <BrowserRouter>
          <div className="overflow-hidden h-100 d-flex flex-column">
            <NavbarMenu />
            <Routes>
              <Route path="/" element={<Schedule />} />
              <Route path="students" element={<Students />} />
              <Route path="salary" element={<Salary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </Context.Provider>
    </Provider>
  )
}

export default App;
