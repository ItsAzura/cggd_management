import React, { useEffect, useState } from 'react';
import { useGetAllCustomersQuery } from '../../redux/api/customerSlice';
import Loading from '../../components/loading/Loading';
import ErrorPage from '../../components/error/Error';
import { Link, useNavigate } from 'react-router-dom';
import PageTitle from '../../components/Shared/PageTitle';
import IconBtn from '../../components/Shared/IconBtn';
import moment from 'moment';
import DeleteModal from '../../components/Shared/DeleteModal';
import { useDeleteCustomerMutation } from '../../redux/api/customerSlice';
import { toast } from 'react-toastify';
const Customers = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    page: 1,
    customer_name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  const {
    data: customers,
    error,
    isLoading,
  } = useGetAllCustomersQuery(filters);

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
    }, 300);

    setDebounceTimeout(newTimeout);
  };

  const handlePageChange = (newPage) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: newPage,
    }));
  };

  const openDeleteModal = (customerId) => {
    setSelectedCustomerId(customerId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedCustomerId(null);
  };

  const [deleteCustomer, { isLoading: isDeleting }] =
    useDeleteCustomerMutation();

  const handleDelete = async () => {
    try {
      const response = await deleteCustomer(selectedCustomerId).unwrap();
      console.log('Response:', response);
      toast.success(response.message);
      closeDeleteModal();
    } catch (error) {
      console.error('Error deleting customer:', error);
      toast.error('Error deleting customer');
    }
  };

  if (isLoading || isDeleting) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage message={error} />;
  }

  const totalPages = customers?.total_pages || 1;

  return (
    <div className="ml-72 ">
      {showDeleteModal && (
        <DeleteModal
          showModal={showDeleteModal}
          onClose={closeDeleteModal}
          content="Are you sure you want to delete this customer?"
          handleDelete={handleDelete}
        />
      )}
      <PageTitle title="Customers" />
      <div className="w-[100%] grid grid-cols-4 gap-1 mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="w-5/6 p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
          name="customer_name"
          value={filters.customer_name}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          placeholder="Search by email"
          className="w-5/6 p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
          name="email"
          value={filters.email}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          placeholder="Search by phone"
          className="w-5/6 p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
          name="phone"
          value={filters.phone}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          placeholder="Search by address"
          className="w-5/6 p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
          name="address"
          value={filters.address}
          onChange={handleFilterChange}
        />
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
        <Link to="/customer/create">
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
            label="Add Customer"
          />
        </Link>
      </div>
      <div className="mt-10">
        <table className="w-[94%] bg-[rgba(41,125,204,0.2)] text-white border border-[rgba(41,125,204,0.7)] rounded shadow-xl shadow-[rgba(41,125,204,0.08)]">
          <thead className="bg-[#163a62]">
            <tr className="text-left">
              <th className="p-3 border-b border-[rgba(41,125,204,0.7)]">
                Name
              </th>
              <th className="p-3 border-b border-[rgba(41,125,204,0.7)]">
                Phone
              </th>
              <th className="p-3 border-b border-[rgba(41,125,204,0.7)]">
                Email
              </th>
              <th className="p-3 border-b border-[rgba(41,125,204,0.7)]">
                Address
              </th>
              <th className="p-3 border-b border-[rgba(41,125,204,0.7)]">
                Updated
              </th>
              <th className="p-3 border-b border-[rgba(41,125,204,0.7)]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {customers?.data.map((customer) => (
              <tr
                key={customer.id}
                className="border-b  border-[rgba(41,125,204,0.4)] transition duration-300 ease-in-out hover:bg-[#2b4f7e] hover:scale-[1.02] hover:shadow-lg"
              >
                <td className="p-4">{customer.customer_name}</td>
                <td className="p-4">{customer.phone}</td>
                <td className="p-4">{customer.email}</td>
                <td className="p-4">{customer.address}</td>
                <td className="p-4">
                  {moment(customer.updated_at).format('DD-MM-YYYY')}
                </td>
                <td className="p-4 flex gap-2 justify-center">
                  <button className="px-3 py-2 bg-[#0b1c37] text-white rounded-full border border-[rgba(41,125,204,0.5)] hover:bg-[#297dcc] hover:scale-110 transition-all duration-300">
                    <Link
                      to={`/customer/${customer.id}`}
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
                    onClick={() => openDeleteModal(customer.id)}
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

export default Customers;
