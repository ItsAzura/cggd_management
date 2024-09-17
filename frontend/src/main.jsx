import App from './App.jsx';
import PrivateRoute from '../components/private/Private.Route.jsx';
import './index.css';
import ReactDOM from 'react-dom';
import store from '../redux/store';
import { Provider } from 'react-redux';
import { Route, RouterProvider, createRoutesFromElements } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loading from '../components/loading/Loading.jsx';
import Home from '../pages/Home/Home.jsx';

//Dashboard
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard.jsx'));
const Login = lazy(() => import('../pages/auth/Login.jsx'));
const Register = lazy(() => import('../pages/auth/Register.jsx'));
//Product
const Products = lazy(() => import('../pages/product/List.Product.jsx'));
const CreateProduct = lazy(() => import('../pages/product/Create.Product.jsx'));
const DetailProduct = lazy(() => import('../pages/product/Detail.Product.jsx'));
const EditProduct = lazy(() => import('../pages/product/Edit.Product.jsx'));
//Supplier
const Suppliers = lazy(() => import('../pages/supplier/List.Supplier.jsx'));
const CreateSupplier = lazy(() =>
  import('../pages/supplier/Create.Supplier.jsx')
);
const DetailSupplier = lazy(() =>
  import('../pages/supplier/Detail.Supplier.jsx')
);
const EditSupplier = lazy(() => import('../pages/supplier/Edit.Supplier.jsx'));
//Customer
const Customers = lazy(() => import('../pages/customer/List.Customer.jsx'));
const CreateCustomer = lazy(() =>
  import('../pages/customer/Create.Customer.jsx')
);
const DetailCustomer = lazy(() =>
  import('../pages/customer/Detail.Customer.jsx')
);
const EditCustomer = lazy(() => import('../pages/customer/Edit.Customer.jsx'));

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
          <Route
            path="/customer"
            element={
              <Suspense fallback={<Loading />}>
                <Customers />
              </Suspense>
            }
          />
          <Route
            path="/customer/create"
            element={
              <Suspense fallback={<Loading />}>
                <CreateCustomer />
              </Suspense>
            }
          />
          <Route
            path="/customer/:id"
            element={
              <Suspense fallback={<Loading />}>
                <DetailCustomer />
              </Suspense>
            }
          />
          <Route
            path="/customer/:id/edit"
            element={
              <Suspense fallback={<Loading />}>
                <EditCustomer />
              </Suspense>
            }
          />
          <Route
            path="/loader"
            element={<Suspense fallback={<Loading />}>{/* s */}</Suspense>}
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
