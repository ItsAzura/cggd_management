import App from './App.jsx';
import PrivateRoute from '../components/private/PrivateRoute.jsx';
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
const Products = lazy(() => import('../pages/product/Products.jsx'));
const CreateProduct = lazy(() => import('../pages/product/CreateProduct.jsx'));
const DetailProduct = lazy(() => import('../pages/product/DetailProduct.jsx'));
const EditProduct = lazy(() => import('../pages/product/EditProduct.jsx'));
const Suppliers = lazy(() => import('../pages/supplier/Suppliers.jsx'));
const CreateSupplier = lazy(() =>
  import('../pages/supplier/CreateSupplier.jsx')
);
const DetailSupplier = lazy(() =>
  import('../pages/supplier/DetailSupplier.jsx')
);
const EditSupplier = lazy(() => import('../pages/supplier/EditSupplier.jsx'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="" element={<Home />} />
        <Route path="" element={<PrivateRoute />}>
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<Loading />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="/product"
            element={
              <Suspense fallback={<Loading />}>
                <Products />
              </Suspense>
            }
          />
          <Route
            path="/product/create"
            element={
              <Suspense fallback={<Loading />}>
                <CreateProduct />
              </Suspense>
            }
          />
          <Route
            path="/product/:id"
            element={
              <Suspense fallback={<Loading />}>
                <DetailProduct />
              </Suspense>
            }
          />
          <Route
            path="/product/:id/edit"
            element={
              <Suspense fallback={<Loading />}>
                <EditProduct />
              </Suspense>
            }
          />
          <Route
            path="/supplier"
            element={
              <Suspense fallback={<Loading />}>
                <Suppliers />
              </Suspense>
            }
          />
          <Route
            path="/supplier/create"
            element={
              <Suspense fallback={<Loading />}>
                <CreateSupplier />
              </Suspense>
            }
          />
          <Route
            path="/supplier/:id"
            element={
              <Suspense fallback={<Loading />}>
                <DetailSupplier />
              </Suspense>
            }
          />
          <Route
            path="/supplier/:id/edit"
            element={
              <Suspense fallback={<Loading />}>
                <EditSupplier />
              </Suspense>
            }
          />
        </Route>
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
