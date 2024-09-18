import React, { useEffect, useState } from 'react';
import { useGetAllRoleQuery } from '../../redux/api/seletorSlice';
import { useGetAllUsersQuery } from '../../redux/api/userSlice';
import UserLoader from '../../components/User/Loader.User';
import ErrorPage from '../../components/error/Error';
import { Link, useNavigate } from 'react-router-dom';
import PageTitle from '../../components/Shared/PageTitle';
import IconBtn from '../../components/Shared/IconBtn';
import moment from 'moment';
import DeleteModal from '../../components/Shared/DeleteModal';
import { useDeleteUserMutation } from '../../redux/api/userSlice';
import { toast } from 'react-toastify';

const Users = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    page: 1,
    email: '',
    username: '',
    role_id: '',
  });

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Cập nhật URL khi filter hoặc paginate thay đổi
  useEffect(() => {
    const params = new URLSearchParams();

    // Lọc các giá trị không hợp lệ (null, undefined, hoặc chuỗi rỗng)
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        params.append(key, filters[key]);
      }
    });

    // Chỉ cập nhật nếu có tham số filter hợp lệ
    if (Array.from(params).length > 0) {
      navigate(`?${params.toString()}`, { replace: true });
    }
  }, [filters, navigate]);

  // Xử lý debounce cho việc filter
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const {
    data: roles,
    isLoading: roleLoading,
    isError: roleError,
  } = useGetAllRoleQuery();

  const { data: users, isLoading, isError } = useGetAllUsersQuery(filters);

  const handleFilterChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const newTimeout = setTimeout(() => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
        page: 1,
      }));
    }, 200);

    setDebounceTimeout(newTimeout);
  };

  const handlePageChange = (page) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page,
    }));
  };

  const openDeleteModal = (userId) => {
    setSelectedUserId(userId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedUserId(null);
    setShowDeleteModal(false);
  };

  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();

  const handleDeleteUser = async () => {
    try {
      const response = await deleteUser(selectedUserId).unwrap();
      console.log('Delete user response:', response);
      toast.success(response.message);
      handleCloseDeleteModal();
    } catch (error) {
      toast.error('Delete user failed');
      console.error('Delete user failed:', error);
    }
  };

  if (isLoading || roleLoading || deleteLoading) {
    return <UserLoader />;
  }

  if (isError || roleError) {
    return <ErrorPage />;
  }

  const totalPages = users?.total_pages || 1;
  return (
    <div className="ml-72 ">
      {showDeleteModal && (
        <DeleteModal
          showModal={showDeleteModal}
          onClose={handleCloseDeleteModal}
          content="Are you sure you want to delete this User?"
          handleDelete={handleDeleteUser}
        />
      )}
      <PageTitle title="Users" />
      <div className="w-[100%] grid grid-cols-3 gap-1 mb-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-4/5 p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
          value={filters.email}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-4/5 p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
          value={filters.username}
          onChange={handleFilterChange}
        />
        <select
          name="role_id"
          className="w-4/5 p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
          value={filters.role_id}
          onChange={handleFilterChange}
        >
          <option value="" className="bg-[#0b1c37] text-[#e7e7ea] ">
            Select Roles
          </option>
          {roles.map((role) => (
            <option
              key={role.id}
              value={role.id}
              className="bg-[#0b1c37] cursor-pointer text-[#e7e7ea]"
            >
              {role.role_name}
            </option>
          ))}
        </select>
      </div>
      <div className="w-[93%] flex flex-row justify-between items-center">
        <IconBtn
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2rem"
              height="2rem"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M472 168H40a24 24 0 0 1 0-48h432a24 24 0 0 1 0 48m-80 112H120a24 24 0 0 1 0-48h272a24 24 0 0 1 0 48m-96 112h-80a24 24 0 0 1 0-48h80a24 24 0 0 1 0 48"
              />
            </svg>
          }
          label="Filter"
        />
        <Link to="/user/create">
          <IconBtn
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="2rem"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1"
                />
              </svg>
            }
            label="Add User"
          />
        </Link>
      </div>
      <div className="mt-10">
        <table className="w-[94%] bg-[rgba(41,125,204,0.2)] text-white border border-[rgba(41,125,204,0.7)] rounded shadow-xl shadow-[rgba(41,125,204,0.08)]">
          <thead className="bg-[#163a62]">
            <tr className="text-left">
              <th className="p-3 border-b border-[rgba(41,125,204,0.7)]">ID</th>
              <th className="p-3 border-b border-[rgba(41,125,204,0.7)]">
                Email
              </th>
              <th className="p-3 border-b border-[rgba(41,125,204,0.7)]">
                Username
              </th>
              <th className="p-3 border-b border-[rgba(41,125,204,0.7)]">
                Role
              </th>
              <th className="p-3 border-b border-[rgba(41,125,204,0.7)]">
                Created At
              </th>
              <th className="p-3 border-b border-[rgba(41,125,204,0.7)]">
                Updated At
              </th>
              <th className="p-3 border-b border-[rgba(41,125,204,0.7)]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.data.map((user) => (
              <tr
                key={user.id}
                className="border-b border-[rgba(41,125,204,0.7)]"
              >
                <td className="p-3">{user.id}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.username}</td>
                <td className="p-3">{user.role_name}</td>
                <td className="p-3">
                  {moment(user.created_at).format('DD/MM/YYYY')}
                </td>
                <td className="p-3">
                  {moment(user.updated_at).format('DD/MM/YYYY')}
                </td>
                <td className="p-4 flex gap-2 justify-center">
                  <button className="px-3 py-2 bg-[#0b1c37] text-white rounded-full border border-[rgba(41,125,204,0.5)] hover:bg-[#297dcc] hover:scale-110 transition-all duration-300">
                    <Link
                      to={`/user/${user.id}`}
                      className="flex flex-row items-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="m5 16l-1 4l4-1L19.586 7.414a2 2 0 0 0 0-2.828l-.172-.172a2 2 0 0 0-2.828 0zM15 6l3 3m-5 11h8"
                        />
                      </svg>
                    </Link>
                  </button>
                  <button
                    className="px-2 py-2 bg-[#0b1c37] text-white p-2 rounded-full border border-[rgba(41,125,204,0.5)] hover:bg-red-500 hover:scale-110 transition-all duration-300"
                    onClick={() => openDeleteModal(user.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="2rem"
                      height="2rem"
                      viewBox="0 0 256 256"
                    >
                      <path
                        fill="currentColor"
                        d="M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16M96 40a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm96 168H64V64h128Zm-80-104v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0m48 0v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 py-2 flex flex-row items-center justify-center space-x-4">
        <button
          className={`px-2 py-1 bg-[#297DCC] text-white rounded-lg transition-transform duration-300 ${
            filters.page === 1
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-[#1d6eb1] hover:scale-105 hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]'
          }`}
          onClick={() => handlePageChange(filters.page - 1)}
          disabled={filters.page === 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2rem"
            height="2rem"
            viewBox="0 0 24 24"
          >
            <g fill="none" fillRule="evenodd">
              <path d="M24 0v24H0V0z" />
              <path
                fill="currentColor"
                d="M7.94 13.06a1.5 1.5 0 0 1 0-2.12l5.656-5.658a1.5 1.5 0 1 1 2.121 2.122L11.122 12l4.596 4.596a1.5 1.5 0 1 1-2.12 2.122l-5.66-5.658Z"
              />
            </g>
          </svg>
        </button>

        <span className="text-white text-lg font-semibold">
          Page {filters.page} of {totalPages}
        </span>

        <button
          className={`px-2 py-1 bg-[#297DCC] text-white rounded-lg transition-transform duration-300 ${
            filters.page === totalPages
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-[#1d6eb1] hover:scale-105 hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]'
          }`}
          onClick={() => handlePageChange(filters.page + 1)}
          disabled={filters.page === totalPages}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2rem"
            height="2rem"
            viewBox="0 0 24 24"
          >
            <g fill="none" fillRule="evenodd">
              <path d="M24 0v24H0V0z" />
              <path
                fill="currentColor"
                d="M16.06 10.94a1.5 1.5 0 0 1 0 2.12l-5.656 5.658a1.5 1.5 0 1 1-2.121-2.122L12.879 12 8.283 7.404a1.5 1.5 0 0 1 2.12-2.122l5.658 5.657Z"
              />
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Users;
