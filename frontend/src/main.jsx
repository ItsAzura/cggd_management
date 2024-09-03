import App from './App.jsx';
import './index.css';
import ReactDOM from 'react-dom';
import store from '../redux/store';
import { Provider } from 'react-redux';
import { Route, RouterProvider, createRoutesFromElements } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<App />} />)
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
