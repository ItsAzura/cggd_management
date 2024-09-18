import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useGetInventoryProductByIdQuery } from '../../redux/api/inventorySlice';
import Loading from '../../components/loading/Loading';
import ErrorPage from '../../components/error/Error';
import IconBtn from '../../components/Shared/IconBtn';
import moment from 'moment';

const DetailProductInventory = () => {
  const { id } = useParams();
  const [inventory, setInventory] = useState({});
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetInventoryProductByIdQuery(id);

  useEffect(() => {
    if (data) setInventory(data);
  }, [data]);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorPage />;
  return (
    <div className="pt-8 ml-72 p-4 text-white  min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="flex flex-row gap-2 items-center md:w-auto font-semibold mb-8 py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300 ease-in-out shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2rem"
          height="2rem"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M9.295 4.177a.73.73 0 0 1 1.205.552v6.542a.73.73 0 0 1-1.205.552L5.786 8.8a1 1 0 0 1-.347-.757v-.084a1 1 0 0 1 .347-.757z"
            clipRule="evenodd"
          />
        </svg>
        <span>Back</span>
      </button>
      <div className="w-[60%]">
        <div className="space-y-8">
          <h1 className="text-5xl pt-4 font-semibold text-white filter drop-shadow-[0px_0px_6px_rgba(41,125,204,1)] transition-shadow duration-300 ease-in-out hover:drop-shadow-[0px_0px_16px_rgba(41,125,204,0.8)]">
            {inventory.product_name}
          </h1>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
            <p className="text-gray-300">
              <span className="font-semibold text-blue-400">Quantity: </span>
              {inventory.quantity}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-blue-400">
                Minimum Quantity:{' '}
              </span>
              {inventory.min_quantity}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-blue-400">Location: </span>
              {inventory.location_name}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-blue-400">Date Added: </span>
              {moment(inventory.created_at).format('MMMM Do YYYY, h:mm:ss a')}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-blue-400">Last Updated:</span>{' '}
              {moment(inventory.updated_at).format('MMMM Do YYYY, h:mm:ss a')}
            </p>
          </div>
          <div className="flex justify-end">
            <Link to={`/inventory/${id}/edit`}>
              <IconBtn
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.8rem"
                    height="1.8rem"
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
                }
                label="Edit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out shadow-md hover:shadow-lg"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProductInventory;
