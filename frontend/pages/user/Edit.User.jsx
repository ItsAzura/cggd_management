import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from '../../redux/api/userSlice';
import { useGetAllRoleQuery } from '../../redux/api/seletorSlice';
import Loading from '../../components/loading/Loading';
import ErrorPage from '../../components/error/Error';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../components/Shared/PageTitle';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');

  const { data: user, isLoading, isError } = useGetUserByIdQuery(id);

  const { data: roles } = useGetAllRoleQuery();

  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setRole(user.role_id);
      setPassword(user.user_password);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      id,
      username,
      email,
      role_id: role,
      user_password: password,
    };

    try {
      const response = await updateUser({ id, updatedUser });
      if (response.error) {
        throw new Error(response.error.message);
      }
      toast.success('User updated successfully');
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      console.error('Failed to update user:', error);
      toast.error('Failed to update user');
    }
  };

  if (isLoading) return <Loading />;

  if (isError) return <ErrorPage />;
  return (
    <div className="ml-72">
      <PageTitle title="Edit User" />
      <form
        className="w-[96%]"
        onSubmit={handleSubmit}
        enctype="multipart/form-data"
      >
        <div className="w-[60%] grid grid-cols-1 gap-8 mb-4">
          <div className="flex flex-col gap-2">
            <label className="text-white mb-1">Customer Name</label>
            <input
              type="text"
              className="p-3 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)] transition duration-300 ease-in-out"
              placeholder="Enter Customer Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-1">Email</label>
            <input
              type="email"
              className="p-3 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)] transition duration-300 ease-in-out"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-1">Role</label>
            <select
              className="p-3 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)] transition duration-300 ease-in-out"
              value={role}
              onChange={(e) => setRole(e.target.value)}
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
        </div>
        <button
          type="submit"
          className="border border-[rgba(41,125,204,0.5)] bg-[rgba(41,125,204,0.2)] transition ease-in-out delay-0 hover:bg-[rgba(41,125,204,0.3)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)] text-white font-semibold py-2 px-2 rounded my-6"
        >
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditUser;
