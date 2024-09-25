import React, { useState, useEffect } from 'react';
import { useCreateUserMutation } from '../../redux/api/userSlice';
import { toast } from 'react-toastify';
import PageTitle from '../../components/Shared/PageTitle';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../components/Shared/IconBtn';
import { DELAY_TIME, NAVIGATE_BACK } from '../../lib/constants';

const CreateUser = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const [createUser] = useCreateUserMutation();

  useEffect(() => {
    const isFormValid = username && email && password;
    setIsDisabled(!isFormValid);
  }, [username, email, password]);

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
        navigate(NAVIGATE_BACK);
      }, DELAY_TIME);

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
        <div className="h-18 flex flex-row gap-6 items-center">
          <button
            type="submit"
            disabled={isDisabled}
            className={`${
              isDisabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500'
            } p-3 text-white rounded transition-colors duration-300 ease-in-out`}
          >
            Create User
          </button>
          <button onClick={() => navigate(-1)}>
            <IconBtn
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2rem"
                  height="2rem"
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="currentColor"
                    d="M22 8v2c2.206 0 4 1.794 4 4s-1.794 4-4 4H10v-5l-6 6l6 6v-5h12c3.309 0 6-2.691 6-6s-2.691-6-6-6"
                  />
                </svg>
              }
              label={'Back'}
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
