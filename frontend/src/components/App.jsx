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


const PrivateRoute = ( { children } ) => {
  const auth = useAuth();
  const location = useLocation();
  return (
    auth.user ? children : <Navigate to='login' state={{ from: location }} />
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="overflow-hidden h-100 d-flex flex-column">
          <NavbarMenu />
          <Routes>
            <Route
              path='/'
              element={(
                <PrivateRoute>
                  <Main />
                </PrivateRoute>
              )} />
            <Route path='students' element={<Students />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='signup' element={<SignUp />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
};

export default App;
