import React, { useState } from 'react';
import { useCreateUserMutation } from '../../redux/api/userSlice';
import { toast } from 'react-toastify';
import PageTitle from '../../components/Shared/PageTitle';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [createUser] = useCreateUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      return toast.error('All fields are required');
    }

    try {
      const response = await createUser({
        username,
        email,
        user_password: password,
      }).unwrap();
      console.log(response);
      if (response.error) {
        return toast.error(response.message);
      }

      toast.success('User created successfully');
      setTimeout(() => {
        navigate(-1);
      }, 2000);

      setUsername('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.log(error);
      toast.error('An error occurred');
    }
  };
  return (
    <div className="ml-[19rem]">
      <PageTitle title="Create User" />
      <form className="w-[60%] p-2" onSubmit={handleSubmit}>
        <div className=" grid grid-cols-1 gap-8 mb-4">
          <div className="flex flex-col gap-2">
            <label className="text-white mb-1">Username</label>
            <input
              type="text"
              className="p-3 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)] transition duration-300 ease-in-out"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-1">Email</label>
            <input
              type="email"
              className="p-3 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)] transition duration-300 ease-in-out"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-1">Password</label>
            <input
              type="password"
              className="p-3 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)] transition duration-300 ease-in-out"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          className="border border-[rgba(41,125,204,0.5)] bg-[rgba(41,125,204,0.2)] transition ease-in-out delay-0 hover:bg-[rgba(41,125,204,0.3)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)] text-white font-semibold py-2 px-2 rounded my-6"
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
