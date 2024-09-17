import React, { useState } from 'react';
import Loading from '../../components/loading/Loading';
import ErrorPage from '../../components/error/Error';
import { useCreateCustomerMutation } from '../../redux/api/customerSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../components/Shared/PageTitle';

const CreateCustomer = () => {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');

  const [createCustomer, { isLoading, error }] = useCreateCustomerMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerName || !email || !phone || !password || !address) {
      return toast.error('All fields are required');
    }

    try {
      const response = await createCustomer({
        customer_name: customerName,
        email,
        phone,
        password,
        address,
      }).unwrap();
      console.log(response);
      if (response.error) {
        return toast.error(response.message);
      }
      toast.success('Customer created successfully');
      setTimeout(() => {
        navigate(-1);
      }, 2000);
      setCustomerName('');
      setEmail('');
      setPhone('');
      setPassword('');
      setAddress('');
    } catch (error) {
      console.log('Error creating customer:', error);
      toast.error('An error occurred');
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className="ml-72">
      <PageTitle title="Create Customer" />
      <form className="w-[96%] p-2" onSubmit={handleSubmit}>
        <div className=" grid grid-cols-2 gap-8 mb-4">
          <div className="flex flex-col">
            <label className="text-white mb-1">Customer Name</label>
            <input
              type="text"
              className="p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              placeholder="Enter Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-1">Email</label>
            <input
              type="email"
              className="p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-1">Phone</label>
            <input
              type="text"
              className="p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              placeholder="Enter phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-1">Password</label>
            <input
              type="password"
              className="p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-1">Address</label>
            <input
              type="text"
              className="p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <button
          className="border border-[rgba(41,125,204,0.5)] bg-[rgba(41,125,204,0.2)] transition ease-in-out delay-0 hover:bg-[rgba(41,125,204,0.3)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)] text-white font-semibold py-2 px-2 rounded my-6"
          type="submit"
        >
          Create Customer
        </button>
      </form>
    </div>
  );
};

export default CreateCustomer;
