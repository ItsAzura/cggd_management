import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllInventoryProductQuery } from '../../redux/api/seletorSlice';
import {
  useGetAllOrderStatusQuery,
  useGetAllOrdersQuery,
} from '../../redux/api/orderSlice';
import PageTitle from '../../components/Shared/PageTitle';
import IconBtn from '../../components/Shared/IconBtn';
import ErrorPage from '../../components/error/Error';
import Loading from '../../components/loading/Loading';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ListOrder = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    page: page,
    status_id: '',
    customer_id: '',
  });

  useEffect(() => {
    const params = new URLSearchParams();

    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        params.append(key, filters[key]);
      }
    });

    if (Array.from(params).length > 0) {
      navigate(`?${params.toString()}`, { replace: true });
    }
  }, [filters, navigate]);

  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const { data: orders, isLoading, isError } = useGetAllOrdersQuery(filters);

  const { data: orderStatus, isLoading: isLoadingStatus } =
    useGetAllOrderStatusQuery();

  const { data: products, isLoading: isLoadingProduct } =
    useGetAllInventoryProductQuery();

  const handleFilterChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    setDebounceTimeout(
      setTimeout(() => {
        setFilters((prev) => ({
          ...prev,
          [name]: value,
        }));
      }, 300)
    );
  };

  const handlePageChange = (page) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  if (isLoading || isLoadingStatus || isLoadingProduct) return <Loading />;

  if (isError) return <ErrorPage />;

  const totalPages = orders?.totalPages || 1;
  return (
    <div className="ml-[19rem] ">
      <PageTitle title="Order" />
      <div className="w-[100%] grid grid-cols-4 gap-y-6 mb-4 mt-2">
        <select
          className="w-4/5 p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
          name="status_id"
          value={filters.status_id}
          onChange={handleFilterChange}
        >
          <option value="" className="bg-[#0b1c37] text-[#e7e7ea] ">
            Select Status
          </option>
          {orderStatus.map((status) => (
            <option
              key={status.id}
              value={status.id}
              className=" bg-[#0b1c37] cursor-pointer text-[#e7e7ea] "
            >
              {status.status_name}
            </option>
          ))}
        </select>
        <select
          className="w-4/5 p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
          name="customer_id"
          value={filters.customer_id}
          onChange={handleFilterChange}
        >
          <option value="" className="bg-[#0b1c37] text-[#e7e7ea] ">
            Select Product
          </option>
          {products.map((product) => (
            <option
              key={product.id}
              value={product.id}
              className=" bg-[#0b1c37] cursor-pointer text-[#e7e7ea] "
            >
              {product.name}
            </option>
          ))}
        </select>
      </div>
      <div className="w-[96%] mt-10 space-y-6">
        {orders?.data.map((order) => (
          <div
            key={order.id}
            className="text-white p-6  transition-transform transform hover:scale-[1.01] duration-200 rounded shadow-lg border border-[rgba(41,125,204,0.5)] bg-[rgba(41,125,204,0.2)] ease-in-out hover:shadow-lg hover:shadow-[rgba(41,125,204,0.05)] hover:bg-[rgba(41,125,204,0.2)]"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="mb-4 md:mb-0">
                <h1 className="text-2xl font-bold text-[#297DCC]">
                  Order ID: {order.id}
                </h1>
                <p className="text-sm mt-2">
                  <span className="font-semibold">Customer Name:</span>{' '}
                  {order.customer_name} |{' '}
                  <span className="font-semibold">Status:</span>{' '}
                  {order.status_name}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h1 className="text-lg font-semibold">Order Items</h1>
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
                        Price (VNĐ)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.order_items.map((item) => (
                      <tr
                        key={item.product_id}
                        className="hover:bg-[#2a3d64] transition-colors duration-200"
                      >
                        <td className="p-3 border-b border-[#2e3a56]">
                          {item.name}
                        </td>
                        <td className="p-3 border-b border-[#2e3a56]">
                          {item.quantity}
                        </td>
                        <td className="p-3 border-b border-[#2e3a56]">
                          {Number(item.price).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-lg font-semibold">
                Total Price:{' '}
                {`${Number(
                  order.order_items
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toFixed(2)
                ).toLocaleString()} VNĐ`}
              </p>
              <p className="text-sm mt-2">
                <span className="font-semibold">Order Date:</span>{' '}
                {moment(order.created_at).format('DD-MM-YYYY')}
              </p>
            </div>
          </div>
        ))}
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

export default ListOrder;
