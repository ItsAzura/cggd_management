import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from '../../redux/api/userSlice';
import Loading from '../../components/loading/Loading';
import ErrorPage from '../../components/error/Error';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../components/Shared/PageTitle';

const EditProfileUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { data: user, isLoading, isError } = useGetUserProfileQuery(id);
  const [updateProfileUser] = useUpdateUserProfileMutation();
  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setUsername(user.username);
      setPassword(user.user_password);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProfile = {
      id,
      email,
      username,
      user_password: password,
    };
    try {
      const response = await updateProfileUser({ id, updatedProfile });
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
    <div className="ml-[19rem]">
      <PageTitle title="Edit Profile" />
      <form
        className="w-[56%]"
        onSubmit={handleSubmit}
        enctype="multipart/form-data"
      >
        <div className=" grid grid-cols-1 gap-6 mb-4">
          <div className="flex flex-col gap-4">
            <label className="text-white mb-1">UserName</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="text-white mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="text-white mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
            />
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

export default EditProfileUser;
