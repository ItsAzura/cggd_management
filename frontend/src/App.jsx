import './App.css';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from '../pages/Navigation/Navigation';
import Footer from '../pages/Navigation/Footer';
import { useDispatch } from 'react-redux';
import { checkExpiration } from '../redux/feature/authSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkExpiration());
  }, [dispatch]);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
      <Navigation />
      <main className="min-h-screen h-auto">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
