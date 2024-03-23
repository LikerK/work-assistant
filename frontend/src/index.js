import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import initApp from './init';


const app = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(initApp());
}

app();
