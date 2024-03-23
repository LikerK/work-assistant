import { Provider } from 'react-redux';
import { createContext } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import { BdContext } from './contexts/index.jsx';
import store from './slices/index.js';
import App from './components/App.jsx';
import app from './firebase.js';

const initApp = () => {
  const db = getDatabase(app);
  return (
    <Provider store={store}>
      <BdContext.Provider value={db}>
        <App />
      </BdContext.Provider>
    </Provider>
  );
};

export default initApp;
