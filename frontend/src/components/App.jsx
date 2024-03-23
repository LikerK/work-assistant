import NavbarMenu from './Navbar.jsx';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { createContext } from 'react';
import _ from 'lodash';
import { Provider } from 'react-redux';
import { getDatabase, ref, onValue } from "firebase/database";
import Students from './Students.jsx';
import Main from './Main.jsx';
import LoginPage from './LoginPage.jsx';
import Salary from './Salary.jsx';
import SignUp from './SignUpPage.jsx';
import AuthProvider from '../contexts/AuthProvider.jsx';
import { useAuth } from '../hooks/index.js';
import { useBd } from '../hooks/index.js';
import { actions as studentsActions } from '../slices/students';
import { actions as lessonsActions } from '../slices/lessons';


const PrivateRoute = () => {
  const auth = useAuth();
  const location = useLocation();
  const toNavigate = auth.user ? '/' : 'login';
  return (
    <Navigate to={toNavigate} state={{ from: location }} />
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="overflow-hidden h-100 d-flex flex-column">
          <NavbarMenu />
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Main />} />
              <Route path="students" element={<Students />} />
              <Route path="salary" element={<Salary />} />
            </Route>
            <Route path='login' element={<LoginPage />} />
            <Route path='signup' element={<SignUp />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
};

export default App;
