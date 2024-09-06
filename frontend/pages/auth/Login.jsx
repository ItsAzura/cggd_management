import React, { useState } from 'react';
import login_img from '../../Assets/login.png';
import { useLoginUserMutation } from '../../redux/api/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { setCredentials } from '../../redux/feature/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [loginUser] = useLoginUserMutation();

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ email, password });

    try {
      const credentials = { email, user_password: password };
      const res = await loginUser(credentials).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Logged in successfully');
      setTimeout(() => {
        navigate('/');
      }, 2000);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('An error occurred:', error);
      return;
    }
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 py-10 md:px-20 ">
      <ToastContainer />
      <div className="flex-1 text-center md:text-left md:ml-[6%]">
        <a
          href="/"
          className="flex flex-row items-center absolute top-4 left-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2rem"
            height="2rem"
            viewBox="0 0 48 48"
            className="text-white"
          >
            <path
              fill="currentColor"
              stroke="currentColor"
              stroke-linejoin="round"
              stroke-width="4"
              d="M30 36L18 24l12-12z"
            />
          </svg>
          <span>
            <span className="text-white ml-2 text-xl ">Back</span>
          </span>
        </a>
        <h1 className="text-4xl md:text-5xl font-bold text-white filter drop-shadow-[0px_0px_6px_rgba(41,125,204,1)] transition-shadow mb-6 md:mb-10">
          Welcome Back
        </h1>
        <form
          className="mt-4 md:mt-6 w-full max-w-xs md:max-w-sm mx-auto md:mx-0"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="mb-2 font-semibold text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="py-3 px-5 border-gray-300 rounded bg-[rgba(41,125,204,0.2)] text-white focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-md transition-shadow duration-200"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="password" className="mb-2 font-semibold text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="py-3 px-5 border-gray-300 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-md transition-shadow duration-200"
            />
          </div>
          <button
            type="submit"
            className="py-3 w-full text-lg md:text-xl font-semibold bg-blue-500 text-white rounded-md mt-8 hover:bg-blue-600 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Login
          </button>
        </form>
        <div>
          <p className="mt-6 text-white">
            Don't have an account?{' '}
            <a
              href="/register"
              className="text-blue-300 hover:text-blue-500 transition-colors duration-200"
            >
              Register
            </a>
          </p>
        </div>
      </div>
      <div className="flex-1 mt-8 md:mt-0">
        <img
          src={login_img}
          alt="Login"
          className="md:ml-10 max-w-full h-auto md:max-w-lg hidden md:block"
        />
      </div>
    </div>
  );
};

export default Login;
