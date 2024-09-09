import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/feature/authSlice';
import { useLogoutUserMutation } from '../../redux/api/userSlice';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);

  console.log(userInfo);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutUser] = useLogoutUserMutation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getLinkClass = (path) => {
    return location.pathname === path
      ? 'flex items-center text-[#e7e7ea] p-2 rounded border border-[rgba(41,125,204,0.5)] gap-2 transition-transform duration-300 group bg-blue-500'
      : 'flex items-center text-[#e7e7ea] p-2 rounded gap-2 transition-transform duration-300 group';
  };

  const truncateEmail = (email, maxLength = 10) => {
    if (email.length <= maxLength) {
      return email;
    }
    return email.substring(0, maxLength) + '...';
  };

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{ zIndex: 9999 }}
      className="h-auto w-64 border-[rgba(41,125,204,0.2)] bg-[rgba(41,125,204,0.1)] border flex flex-col justify-between p-4 mt-4 ml-4 sm:w-20 md:w-64 lg:w-64 xl:w-64 fixed rounded shadow-lg shadow-[rgba(41,125,204,0.1)]"
    >
      <div className="mb-14">
        <div className="ml-3 text-3xl font-bold text-[#e7e7ea] mb-6 sm:text-xl md:text-2xl lg:text-3xl filter drop-shadow-[0px_0px_3px_rgba(41,125,204,1)] transition-shadow">
          <Link to={`/`}>Azura Store</Link>
        </div>
        <div className="flex flex-col space-y-2">
          <Link to={`/dashboard`} className={getLinkClass('/dashboard')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2rem"
              height="2rem"
              viewBox="0 0 36 36"
              className="text-[#e7e7ea] group-hover:filter group-hover:drop-shadow-[0_0_2px_rgba(41,125,204,1)] transition-shadow"
            >
              <path
                fill="currentColor"
                d="m25.18 12.32l-5.91 5.81a3 3 0 1 0 1.41 1.42l5.92-5.81Z"
                className="clr-i-outline clr-i-outline-path-1"
              />
              <path
                fill="currentColor"
                d="M18 4.25A16.49 16.49 0 0 0 5.4 31.4l.3.35h24.6l.3-.35A16.49 16.49 0 0 0 18 4.25m11.34 25.5H6.66a14.43 14.43 0 0 1-3.11-7.84H7v-2H3.55A14.4 14.4 0 0 1 7 11.29l2.45 2.45l1.41-1.41l-2.43-2.46A14.4 14.4 0 0 1 17 6.29v3.5h2V6.3a14.47 14.47 0 0 1 13.4 13.61h-3.48v2h3.53a14.43 14.43 0 0 1-3.11 7.84"
                className="clr-i-outline clr-i-outline-path-2"
              />
              <path fill="none" d="M0 0h36v36H0z" />
            </svg>
            <span className="hidden sm:hidden md:hidden lg:inline font-semibold group-hover:filter group-hover:drop-shadow-[0_0_2px_rgba(41,125,204,1)] transition-shadow">
              Dashboard
            </span>
          </Link>
          <Link to={`/product`} className={getLinkClass('/product')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2rem"
              height="2rem"
              viewBox="0 0 2048 2048"
              className="text-[#e7e7ea] group-hover:filter group-hover:drop-shadow-[0_0_2px_rgba(41,125,204,1)] transition-shadow"
            >
              <path
                fill="currentColor"
                d="m960 120l832 416v1040l-832 415l-832-415V536zm625 456L960 264L719 384l621 314zM960 888l238-118l-622-314l-241 120zM256 680v816l640 320v-816zm768 1136l640-320V680l-640 320z"
              />
            </svg>
            <span className="hidden sm:hidden md:hidden lg:inline font-semibold group-hover:filter group-hover:drop-shadow-[0_0_2px_rgba(41,125,204,1)] transition-shadow">
              Product
            </span>
          </Link>

          <Link to={`/supplier`} className={getLinkClass('/supplier')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2rem"
              height="2rem"
              viewBox="0 0 48 48"
              className="text-[#e7e7ea] group-hover:filter group-hover:drop-shadow-[0_0_2px_rgba(41,125,204,1)] transition-shadow"
            >
              <g
                fill="none"
                stroke="currentColor"
                stroke-linejoin="round"
                stroke-width="4"
              >
                <path d="M42 8H20a2 2 0 0 0-2 2v22a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2ZM4 34h14V20h-7l-7 6.462z" />
                <path
                  stroke-linecap="round"
                  d="M18 36a4 4 0 0 1-8 0m30 0a4 4 0 0 1-8 0"
                />
              </g>
            </svg>
            <span className="hidden sm:hidden md:hidden lg:inline font-semibold group-hover:filter group-hover:drop-shadow-[0_0_2px_rgba(41,125,204,1)] transition-shadow">
              Supplier
            </span>
          </Link>

          <Link to={`/inventory`} className={getLinkClass('/inventory')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2rem"
              height="2rem"
              viewBox="0 0 32 32"
              className="text-[#e7e7ea] group-hover:filter group-hover:drop-shadow-[0_0_2px_rgba(41,125,204,1)] transition-shadow"
            >
              <path
                fill="currentColor"
                d="M19 24h4v4h-4zm7 0h4v4h-4zm-7-7h4v4h-4zm7 0h4v4h-4z"
              />
              <path
                fill="currentColor"
                d="M17 24H4V10h24v5h2v-5a2 2 0 0 0-2-2h-6V4a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h13ZM12 4h8v4h-8Z"
              />
            </svg>
            <span className="hidden sm:hidden md:hidden lg:inline font-semibold group-hover:filter group-hover:drop-shadow-[0_0_2px_rgba(41,125,204,1)] transition-shadow">
              Inventory
            </span>
          </Link>

          <Link to={`/customer`} className={getLinkClass('/customer')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2rem"
              height="2rem"
              viewBox="0 0 32 32"
              className="text-[#e7e7ea] group-hover:filter group-hover:drop-shadow-[0_0_2px_rgba(41,125,204,1)] transition-shadow"
            >
              <path
                fill="currentColor"
                d="M29.755 21.345A1 1 0 0 0 29 21h-2v-2c0-1.102-.897-2-2-2h-4c-1.103 0-2 .898-2 2v2h-2a1 1 0 0 0-.99 1.142l1 7A1 1 0 0 0 18 30h10a1 1 0 0 0 .99-.858l1-7a1 1 0 0 0-.235-.797M21 19h4v2h-4zm6.133 9h-8.266l-.714-5h9.694zM10 20h2v10h-2z"
              />
              <path
                fill="currentColor"
                d="m16.78 17.875l-1.906-2.384l-1.442-3.605A2.99 2.99 0 0 0 10.646 10H5c-1.654 0-3 1.346-3 3v7c0 1.103.897 2 2 2h1v8h2V20H4v-7a1 1 0 0 1 1-1h5.646c.411 0 .776.247.928.629l1.645 3.996l2 2.5zM4 5c0-2.206 1.794-4 4-4s4 1.794 4 4s-1.794 4-4 4s-4-1.794-4-4m2 0c0 1.103.897 2 2 2s2-.897 2-2s-.897-2-2-2s-2 .897-2 2"
              />
            </svg>
            <span className="hidden sm:hidden md:hidden lg:inline font-semibold group-hover:filter group-hover:drop-shadow-[0_0_2px_rgba(41,125,204,1)] transition-shadow">
              Customers
            </span>
          </Link>

          <Link to={`/order`} className={getLinkClass('/order')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2rem"
              height="2rem"
              viewBox="0 0 24 24"
              className="text-[#e7e7ea] group-hover:filter group-hover:drop-shadow-[0_0_2px_rgba(41,125,204,1)] transition-shadow"
            >
              <g fill="none" stroke="currentColor" stroke-width="2">
                <rect width="14" height="17" x="5" y="4" rx="2" />
                <path stroke-linecap="round" d="M9 9h6m-6 4h6m-6 4h4" />
              </g>
            </svg>
            <span className="hidden sm:hidden md:hidden lg:inline font-semibold group-hover:filter group-hover:drop-shadow-[0_0_2px_rgba(41,125,204,1)] transition-shadow">
              Order
            </span>
          </Link>

          <Link to={`/reports`} className={getLinkClass('/reports')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2rem"
              height="2rem"
              viewBox="0 0 24 24"
              className="text-[#e7e7ea] group-hover:filter group-hover:drop-shadow-[0_0_2px_rgba(41,125,204,1)] transition-shadow"
            >
              <path
                fill="currentColor"
                d="M22 16v2H6V2h2v11.57l5.71-9l3.16 2.11l2.42-2.42l1.42 1.42l-3.58 3.61l-2.84-1.89L8.82 16M4 20V4H2v18h20v-2Z"
              />
            </svg>
            <span className="hidden sm:hidden md:hidden lg:inline font-semibold group-hover:filter group-hover:drop-shadow-[0_0_2px_rgba(41,125,204,1)] transition-shadow">
              Reports
            </span>
          </Link>

          {userInfo?.role_id === 3 && (
            <Link to={`/user`} className={getLinkClass('/user')}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="2rem"
                viewBox="0 0 24 24"
                className="text-[#e7e7ea] group-hover:filter group-hover:drop-shadow-[0_0_2px_rgba(41,125,204,1)] transition-shadow"
              >
                <path
                  fill="currentColor"
                  d="M15.71 12.71a6 6 0 1 0-7.42 0a10 10 0 0 0-6.22 8.18a1 1 0 0 0 2 .22a8 8 0 0 1 15.9 0a1 1 0 0 0 1 .89h.11a1 1 0 0 0 .88-1.1a10 10 0 0 0-6.25-8.19M12 12a4 4 0 1 1 4-4a4 4 0 0 1-4 4"
                />
              </svg>
              <span className="hidden sm:hidden md:hidden lg:inline font-semibold group-hover:filter group-hover:drop-shadow-[0_0_2px_rgba(41,125,204,1)] transition-shadow">
                User
              </span>
            </Link>
          )}
        </div>
      </div>
      {!userInfo && (
        <ul className="flex flex-col gap-y-4">
          {/* Login */}
          <li>
            <Link to="/login" className={getLinkClass('/login')}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="2rem"
                viewBox="0 0 24 24"
                className="text-[#e7e7ea] group-hover:filter group-hover:drop-shadow-[0_0_2px_rgba(41,125,204,1)] transition-shadow"
              >
                <path
                  fill="currentColor"
                  d="M12 21v-2h7V5h-7V3h7q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm-2-4l-1.375-1.45l2.55-2.55H3v-2h8.175l-2.55-2.55L10 7l5 5z"
                />
              </svg>
              <span className="hidden sm:hidden md:hidden lg:inline font-semibold group-hover:filter group-hover:drop-shadow-[0_0_2px_rgba(41,125,204,1)] transition-shadow">
                Login
              </span>
              {''}
            </Link>
          </li>

          {/* Register */}
          <li>
            <Link to="/register" className={getLinkClass('/register')}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="2rem"
                viewBox="0 0 24 24"
                className="text-[#e7e7ea] group-hover:filter group-hover:drop-shadow-[0_0_2px_rgba(41,125,204,1)] transition-shadow"
              >
                <path
                  fill="currentColor"
                  d="M20 12a1 1 0 0 0-1-1h-7.59l2.3-2.29a1 1 0 1 0-1.42-1.42l-4 4a1 1 0 0 0-.21.33a1 1 0 0 0 0 .76a1 1 0 0 0 .21.33l4 4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42L11.41 13H19a1 1 0 0 0 1-1M17 2H7a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-3a1 1 0 0 0-2 0v3a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3a1 1 0 0 0 2 0V5a3 3 0 0 0-3-3"
                />
              </svg>
              <span className="hidden sm:hidden md:hidden lg:inline font-semibold group-hover:filter group-hover:drop-shadow-[0_0_2px_rgba(41,125,204,1)] transition-shadow">
                Register
              </span>
              {''}
            </Link>
          </li>
        </ul>
      )}

      {userInfo && (
        <div className="flex flex-row items-center">
          <div className="flex flex-row">
            <div className="rounded-full bg-gray-300 h-10 w-10"></div>
            <div className="ml-2">
              <div className="text-lg font-semibold text-white">
                {userInfo.username}
              </div>
              <div className="text-sm text-gray-500">
                {' '}
                {truncateEmail(userInfo.email)}
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={handleLogout}
              className="border border-[rgba(41,125,204,0.5)] bg-[rgba(41,125,204,0.2)] transition ease-in-out delay-0 hover:bg-[rgba(41,125,204,0.3)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)] text-white font-semibold py-2 px-2 rounded ml-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.8rem"
                height="1.8rem"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigation;
