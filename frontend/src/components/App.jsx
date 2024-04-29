import NavbarMenu from './Navbar.jsx';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import Main from './Main.jsx';
import LoginPage from './LoginPage.jsx';
import SignUp from './SignUpPage.jsx';
import AuthProvider from '../contexts/AuthProvider.jsx';
import ApiProvider from '../contexts/ApiProvider.jsx';
import { useAuth } from '../hooks/index.js';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  return (
    auth.user ? children : <Navigate to='login' state={{ from: location }} />
  );
};

const App = () => {
  return (
    <AuthProvider>
      <ApiProvider>
        <BrowserRouter>
          <div className="main h-100 d-flex flex-column">
            <NavbarMenu />
            <Routes>
              <Route
                path='/'
                element={(
                  <PrivateRoute>
                    <Main />
                  </PrivateRoute>
                )} />
              <Route path='login' element={<LoginPage />} />
              <Route path='signup' element={<SignUp />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ApiProvider>
    </AuthProvider>
  )
};

export default App;
