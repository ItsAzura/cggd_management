import React, { useState } from 'react';
import PageTitle from '../../components/Shared/PageTitle';
import { useGetAllInventoryExportQuery } from '../../redux/api/inventorySlice';
import Loading from '../../components/loading/Loading';
import IconBtn from '../../components/Shared/IconBtn';
import { useNavigate, Link } from 'react-router-dom';
import { useAcceptExportInventoryMutation } from '../../redux/api/inventorySlice';
import { useRefuseIncomingExportInventoryMutation } from '../../redux/api/inventorySlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ListExportInventory = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const { data: items, isLoading } = useGetAllInventoryExportQuery({
    page: page,
  });

  const [acceptExportLog] = useAcceptExportInventoryMutation();
  const [refuseExportLog] = useRefuseIncomingExportInventoryMutation();

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleAcceptLog = async (id) => {
    try {
      await acceptExportLog(id).unwrap();
      toast.success('Export log accepted successfully');
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRefuseLog = async (id) => {
    try {
      await refuseExportLog(id).unwrap();
      toast.success('Export log refused successfully');
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (isLoading) return <Loading />;

  const totalPages = items?.total_pages || 1;
  return (
    <div className="ml-72">
      <div className="w-[96%] flex flex-row justify-between">
        <PageTitle title="Export Inventory List" />
        <div className="flex flex-row gap-4 mt-1">
          <Link to="/inventory/export/create">
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
                    d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5v2H5v14h14v-5z"
                  />
                  <path
                    fill="currentColor"
                    d="M21 7h-4V3h-2v4h-4v2h4v4h2V9h4z"
                  />
                </svg>
              }
              label={'Create'}
            />
          </Link>
          <Link to="/inventory/export/history">
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
                    d="M12 21q-3.45 0-6.012-2.287T3.05 13H5.1q.35 2.6 2.313 4.3T12 19q2.925 0 4.963-2.037T19 12t-2.037-4.962T12 5q-1.725 0-3.225.8T6.25 8H9v2H3V4h2v2.35q1.275-1.6 3.113-2.475T12 3q1.875 0 3.513.713t2.85 1.924t1.925 2.85T21 12t-.712 3.513t-1.925 2.85t-2.85 1.925T12 21m2.8-4.8L11 12.4V7h2v4.6l3.2 3.2z"
                  />
                </svg>
              }
              label={'History'}
            />
          </Link>
        </div>
      </div>

      <div className="w-[96%] mt-10 space-y-6 text-white">
        {items && items.data.length > 0 ? (
          <div>
            {items.data.map((log) => (
              <div
                key={log.id}
                className="p-6 transition-transform transform hover:scale-[1.01] duration-200 rounded shadow-lg border border-[rgba(41,125,204,0.5)] bg-[rgba(41,125,204,0.2)] ease-in-out hover:shadow-lg hover:shadow-[rgba(41,125,204,0.05)] hover:bg-[rgba(41,125,204,0.2)]"
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

                <div className="mt-4 flex gap-4 justify-end">
                  <button
                    onClick={() => handleAcceptLog(log.id)}
                    disabled={userInfo.role_id == 2}
                  >
                    <IconBtn
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1.6rem"
                          height="1.6rem"
                          viewBox="0 0 2048 2048"
                        >
                          <path
                            fill="currentColor"
                            d="M640 1755L19 1133l90-90l531 530L1939 275l90 90z"
                          />
                        </svg>
                      }
                      label={'Accept'}
                    />
                  </button>

                  <button
                    onClick={() => handleRefuseLog(log.id)}
                    disabled={userInfo.role_id == 2}
                  >
                    <IconBtn
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1.6rem"
                          height="1.6rem"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M3.47 3.47a.75.75 0 0 1 1.06 0L8 6.94l3.47-3.47a.75.75 0 1 1 1.06 1.06L9.06 8l3.47 3.47a.75.75 0 1 1-1.06 1.06L8 9.06l-3.47 3.47a.75.75 0 0 1-1.06-1.06L6.94 8L3.47 4.53a.75.75 0 0 1 0-1.06"
                            clipRule="evenodd"
                          />
                        </svg>
                      }
                      label={'Refuse'}
                    />
                  </button>
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

export default ListExportInventory;
