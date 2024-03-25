import { Provider } from 'react-redux';
import { createContext, useEffect } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import { BdContext } from './contexts/index.jsx';
import store from './slices/index.js';
import App from './components/App.jsx';
import { db } from './firebase.js';

const initApp = () => {
  return (
    <Provider store={store}>
      <BdContext.Provider value={db}>
        <App />
      </BdContext.Provider>
    </Provider>
  );
};

export default initApp;
