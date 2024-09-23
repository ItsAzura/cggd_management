import React, { useState } from 'react';
import PageTitle from '../../components/Shared/PageTitle';
import { useGetUserProfileQuery } from '../../redux/api/userSlice';
import Loading from '../../components/loading/Loading';
import ErrorPage from '../../components/error/Error';
import IconBtn from '../../components/Shared/IconBtn';
import { useNavigate, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ProfileUser = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const { data: user, isLoading, error } = useGetUserProfileQuery(id);

  if (isLoading) return <Loading />;
  if (error) return <ErrorPage />;
  console.log(user);
  return (
    <div className="ml-[19rem]">
      <div className="w-[50%] py-4 space-y-6 text-white">
        <PageTitle title="User Profile" />
        <div
          key={user.id}
          className="p-6 transition-transform transform hover:scale-[1.01] duration-200 rounded shadow-lg border border-[rgba(41,125,204,0.5)] bg-[rgba(41,125,204,0.2)] ease-in-out hover:shadow-lg hover:shadow-[rgba(41,125,204,0.05)] hover:bg-[rgba(41,125,204,0.2)]"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-4 md:mb-0">
              <h1 className="text-5xl font-semibold">{user.username}</h1>
              <p className="text-xl mt-8 flex flex-row gap-4">
                <span className="font-semibold">Email: </span>
                {user.email}
              </p>
              <p className="text-xl mt-4 flex flex-row gap-4">
                <span className="font-semibold">Role: </span>
                {user.role_name}
              </p>
              <p className="text-xl mt-4 flex flex-row gap-4">
                <span className="font-semibold">Created At: </span>
                {new Date(user.created_at).toLocaleString()}
              </p>
              <p className="text-xl mt-4 flex flex-row gap-4">
                <span className="font-semibold">Created At: </span>
                {new Date(user.updated_at).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="mt-2 flex flex-row justify-end">
            <Link to={`/profile/${user.id}/edit/`}>
              <IconBtn
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2rem"
                    height="2rem"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="m5 16l-1 4l4-1L19.586 7.414a2 2 0 0 0 0-2.828l-.172-.172a2 2 0 0 0-2.828 0zM15 6l3 3m-5 11h8"
                    />
                  </svg>
                }
                label={'Edit'}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
