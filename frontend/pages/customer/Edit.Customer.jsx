import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetCustomerByIdQuery,
  useUpdateCustomerMutation,
} from '../../redux/api/customerSlice';
import Loading from '../../components/loading/Loading';
import ErrorPage from '../../components/error/Error';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../components/Shared/PageTitle';
import { DELAY_TIME, NAVIGATE_BACK } from '../../lib/constants';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');

  const { data: customer, isLoading, isError } = useGetCustomerByIdQuery(id);

  const [updateCustomer] = useUpdateCustomerMutation();

  useEffect(() => {
    if (customer) {
      setCustomerName(customer.customer_name);
      setEmail(customer.email);
      setPhone(customer.phone);
      setPassword(customer.password);
      setAddress(customer.address);
    }
  }, [customer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedCustomer = {
      id,
      customer_name: customerName,
      email,
      phone,
      password,
      address,
    };

    try {
      const response = await updateCustomer({ id, updatedCustomer });
      if (response.error) {
        throw new Error(response.error.message);
      }
      toast.success('Customer updated successfully');
      setTimeout(() => {
        navigate(NAVIGATE_BACK);
      }, DELAY_TIME);
    } catch (error) {
      console.error('Failed to update customer:', error);
      toast.error('Failed to update customer');
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <ErrorPage />;

  return (
    <div className="ml-72">
      <PageTitle title="Edit Customers" />
      <form
        className="w-[96%]"
        onSubmit={handleSubmit}
        enctype="multipart/form-data"
      >
        <div className=" grid grid-cols-2 gap-6 mb-4">
          <div className="flex flex-col">
            <label className="text-white mb-1">Customer Name</label>
            <input
              type="text"
              className="p-3 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              placeholder="Enter Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-1">Email</label>
            <input
              type="email"
              className="p-3 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-1">Phone</label>
            <input
              type="text"
              className="p-3 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              placeholder="Enter Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-1">Password</label>
            <input
              type="password"
              className="p-3 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-1">Address</label>
            <input
              type="text"
              className="p-3 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          className="border border-[rgba(41,125,204,0.5)] bg-[rgba(41,125,204,0.2)] transition ease-in-out delay-0 hover:bg-[rgba(41,125,204,0.3)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)] text-white font-semibold py-2 px-2 rounded my-6"
        >
          Update Customer
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
