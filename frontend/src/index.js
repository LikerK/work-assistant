import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// Import the functions you need from the SDKs you need

import App from './components/App';


const app = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(App());
}

app();
