import { Provider } from 'react-redux';
import store from './slices/index.js';
import App from './components/App.jsx';

const initApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default initApp;
