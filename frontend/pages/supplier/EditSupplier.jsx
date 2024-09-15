import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetSupplierByIdQuery,
  useUpdateSupplierMutation,
} from '../../redux/api/supplierSlice';
import Loading from '../../components/loading/Loading';
import ErrorPage from '../../components/error/Error';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../components/Shared/PageTitle';

const EditSupplier = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [supplierName, setSupplierName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const { data: supplier, isLoading, isError } = useGetSupplierByIdQuery(id);

  const [updateSupplier] = useUpdateSupplierMutation();

  useEffect(() => {
    if (supplier) {
      setSupplierName(supplier.supplier_name);
      setContactPerson(supplier.contact_person);
      setPhone(supplier.phone);
      setEmail(supplier.email);
      setAddress(supplier.address);
    }
  }, [supplier]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedSupplier = {
      id,
      supplier_name: supplierName,
      contact_person: contactPerson,
      phone,
      email,
      address,
    };

    try {
      const response = await updateSupplier({ id, updatedSupplier });
      if (response.error) {
        throw new Error(response.error.message);
      }
      toast.success('Supplier updated successfully');
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      console.error('Failed to update supplier:', error);
      toast.error('Failed to update supplier');
    }
  };

  if (isLoading) return <Loading />;

  if (isError) return <ErrorPage />;

  return (
    <div className="ml-72">
      <PageTitle title="Edit Product" />
      <form
        className="w-[96%]"
        onSubmit={handleSubmit}
        enctype="multipart/form-data"
      >
        <div className=" grid grid-cols-2 gap-6 mb-4">
          <div className="flex flex-col">
            <label className="text-white mb-1">Supplier Name</label>
            <input
              type="text"
              className="p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              placeholder="Enter Supplier Name"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-1">Contact Person</label>
            <input
              type="text"
              className="p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              placeholder="Enter Contact Person"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-1">Phone</label>
            <input
              type="number"
              className="p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              placeholder="Enter Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-1">Email</label>
            <input
              type="email"
              className="p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-1">Address</label>
            <input
              type="text"
              className="p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
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
          Update Supplier
        </button>
      </form>
    </div>
  );
};

export default EditSupplier;
