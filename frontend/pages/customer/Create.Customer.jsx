import React, { useState, useEffect } from 'react';
import Loading from '../../components/loading/Loading';
import ErrorPage from '../../components/error/Error';
import { useCreateCustomerMutation } from '../../redux/api/customerSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../components/Shared/PageTitle';
import IconBtn from '../../components/Shared/IconBtn';
import { DELAY_TIME } from '../../lib/constants';

const CreateCustomer = () => {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const [createCustomer, { isLoading, error }] = useCreateCustomerMutation();

  useEffect(() => {
    const isFormValid = customerName && email && phone && password && address;
    setIsDisabled(!isFormValid);
  }, [customerName, email, phone, password, address]);

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
      }, DELAY_TIME);
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
              className="p-3 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)] transition duration-300 ease-in-out"
              placeholder="Enter Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
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
            <label className="text-white mb-1">Phone</label>
            <input
              type="text"
              className="p-3 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)] transition duration-300 ease-in-out"
              placeholder="Enter phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
          <div className="flex flex-col">
            <label className="text-white mb-1">Address</label>
            <input
              type="text"
              className="p-3 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)] transition duration-300 ease-in-out"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
            Create Customer
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

export default CreateCustomer;
