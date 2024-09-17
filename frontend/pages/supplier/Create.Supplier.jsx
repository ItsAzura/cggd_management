import React, { useState } from 'react';
import { useCreateSupplierMutation } from '../../redux/api/supplierSlice';
import { toast } from 'react-toastify';
import PageTitle from '../../components/Shared/PageTitle';
import { useNavigate } from 'react-router-dom';

const CreateSupplier = () => {
  const navigate = useNavigate();
  const [supplierName, setSupplierName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const [createSupplier] = useCreateSupplierMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!supplierName || !contactPerson || !phone || !email || !address) {
      return toast.error('All fields are required');
    }

    try {
      const response = await createSupplier({
        supplier_name: supplierName,
        contact_person: contactPerson,
        phone,
        email,
        address,
      }).unwrap();
      console.log(response);
      if (response.error) {
        return toast.error(response.message);
      }
      toast.success('Supplier created successfully');
      setTimeout(() => {
        navigate(-1);
      }, 2000);
      setSupplierName('');
      setContactPerson('');
      setPhone('');
      setEmail('');
      setAddress('');
    } catch (error) {
      toast.error('An error occurred');
    }
  };
  return (
    <div className="ml-72">
      <PageTitle title="Create Supplier" />
      <form className="w-[96%] p-2" onSubmit={handleSubmit}>
        <div className=" grid grid-cols-2 gap-8 mb-4">
          <div className="flex flex-col">
            <label className="text-white mb-1">Supplier Name</label>
            <input
              type="text"
              className="p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              placeholder="Enter product name"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-1">Contact Person</label>
            <input
              type="text"
              className="p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              placeholder="Enter contact person"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-1">Phone</label>
            <input
              type="text"
              className="p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
          Create Supplier
        </button>
      </form>
    </div>
  );
};

export default CreateSupplier;
