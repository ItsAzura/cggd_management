import React, { useState } from 'react';
import PageTitle from '../../components/Shared/PageTitle';
import { useGetHistoryIncomingInventoryQuery } from '../../redux/api/inventorySlice';
import Loading from '../../components/loading/Loading';
import IconBtn from '../../components/Shared/IconBtn';
import { useParams, useNavigate, Link } from 'react-router-dom';
const HistoryInComingInventory = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { data: items, isLoading } = useGetHistoryIncomingInventoryQuery({
    page: page,
  });

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (isLoading) return <Loading />;

  const totalPages = items?.total_pages || 1;

  console.log(items);
  return (
    <div className="ml-72">
      <div className="w-[96%] flex flex-row justify-between">
        <PageTitle title="History InComing Inventory" />
        <button onClick={() => navigate(-1)}>
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
                  d="m4 10l-.707.707L2.586 10l.707-.707zm17 8a1 1 0 1 1-2 0zM8.293 15.707l-5-5l1.414-1.414l5 5zm-5-6.414l5-5l1.414 1.414l-5 5zM4 9h10v2H4zm17 7v2h-2v-2zm-7-7a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5z"
                />
              </svg>
            }
            label={'Back'}
          />
        </button>
      </div>

      <div className=" w-[96%] mt-10 space-y-6 text-white">
        {items && items.data.length > 0 ? (
          <div>
            {items.data.map((log) => (
              <div
                key={log.id}
                className="mt-5 p-6 transition-transform transform hover:scale-[1.01] duration-200 rounded shadow-lg border border-[rgba(41,125,204,0.5)] bg-[rgba(41,125,204,0.2)] ease-in-out hover:shadow-lg hover:shadow-[rgba(41,125,204,0.05)] hover:bg-[rgba(41,125,204,0.2)]"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="mb-4 md:mb-0">
                    <h2 className="text-2xl font-bold text-[#297DCC]">
                      Log ID: {log.id}
                    </h2>
                    <p className="text-sm mt-2">
                      <span className="font-semibold">User Name:</span>{' '}
                      {log.user_name} |{' '}
                      <span className="font-semibold">Type:</span>{' '}
                      {log.type_name} |{' '}
                      <span className="font-semibold">Status:</span>{' '}
                      {log.status_name}
                    </p>
                    <p className="text-sm mt-2">
                      <span className="font-semibold">Created At:</span>{' '}
                      {new Date(log.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <h1 className="text-lg font-semibold">Log Items</h1>
                  <div className="overflow-x-auto">
                    <table className="w-full mt-4 text-left border-collapse">
                      <thead>
                        <tr className="bg-[#1c2a48] text-white">
                          <th className="p-3 border-b border-[#2e3a56]">
                            Product Name
                          </th>
                          <th className="p-3 border-b border-[#2e3a56]">
                            Quantity
                          </th>
                          <th className="p-3 border-b border-[#2e3a56]">
                            Note
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {log.items.map((item, index) => (
                          <tr
                            key={item.product_id}
                            className="hover:bg-[#2a3d64] transition-colors duration-200"
                          >
                            <td className="p-3 border-b border-[#2e3a56]">
                              {item.product_name}
                            </td>
                            <td className="p-3 border-b border-[#2e3a56]">
                              {item.quantity}
                            </td>
                            <td className="p-3 border-b border-[#2e3a56]">
                              {item.note}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No incoming inventory logs found.</p>
        )}
      </div>

      <div className="mt-4 py-2 flex flex-row items-center justify-center space-x-4">
        <button
          className={`px-2 py-1 bg-[#297DCC] text-white rounded-lg transition-transform duration-300 ${
            page === 1
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-[#1d6eb1] hover:scale-105 hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]'
          }`}
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
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
          Page {page} of {totalPages}
        </span>

        <button
          className={`px-2 py-1 bg-[#297DCC] text-white rounded-lg transition-transform duration-300 ${
            page === totalPages
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-[#1d6eb1] hover:scale-105 hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]'
          }`}
          onClick={() => handlePageChange(filters.page + 1)}
          disabled={page === totalPages}
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

export default HistoryInComingInventory;
