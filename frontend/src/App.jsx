import './App.css';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from '../pages/Navigation/Navigation';
import Footer from '../pages/Navigation/Footer';

function App() {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
