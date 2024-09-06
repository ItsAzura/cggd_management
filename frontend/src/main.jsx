import App from './App.jsx';
import './index.css';
import ReactDOM from 'react-dom';
import store from '../redux/store';
import { Provider } from 'react-redux';
import { Route, RouterProvider, createRoutesFromElements } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loading from '../components/loading/Loading.jsx';
import Home from '../pages/Home/Home.jsx';

const Dashboard = lazy(() => import('../pages/dashboard/Dashboard.jsx'));
const Login = lazy(() => import('../pages/auth/Login.jsx'));
const Register = lazy(() => import('../pages/auth/Register.jsx'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<Loading />}>
              <Dashboard />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="/login"
        element={
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/register"
        element={
          <Suspense fallback={<Loading />}>
            <Register />
          </Suspense>
        }
      />
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
