import React, { useState } from 'react';
import {
  useGetAllInventoryProductQuery,
  useGetAllLocationsQuery,
} from '../../redux/api/seletorSlice';
import { useCreateInventoryMutation } from '../../redux/api/inventorySlice';
import { toast } from 'react-toastify';
import PageTitle from '../../components/Shared/PageTitle';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/Loading';
import ErrorPage from '../../components/error/Error';

const CreateProductInventory = () => {
  const navigate = useNavigate();
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [minQuantity, setMinQuantity] = useState('');
  const [locationId, setLocationId] = useState('');

  const {
    data: products,
    error: productsError,
    isLoading: productsLoading,
  } = useGetAllInventoryProductQuery();

  const {
    data: locations,
    error: locationsError,
    isLoading: locationLoading,
  } = useGetAllLocationsQuery();

  const [createInventory] = useCreateInventoryMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productId || !quantity || !minQuantity || !locationId) {
      return toast.error('All fields are required');
    }

    try {
      const response = await createInventory({
        product_id: productId,
        quantity,
        min_quantity: minQuantity,
        location_id: locationId,
      }).unwrap();
      console.log(response);
      if (response.error) {
        return toast.error(response.message);
      }
      toast.success('Inventory created successfully');
      setTimeout(() => {
        navigate(-1);
      }, 2000);
      setProductId('');
      setQuantity('');
      setMinQuantity('');
      setLocationId('');
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  if (productsLoading || locationLoading) {
    return <Loading />;
  }

  if (productsError || locationsError) {
    return <ErrorPage />;
  }
  return (
    <div className="ml-72">
      <PageTitle title="Create Product Inventory" />
      <form className="w-[96%] p-2" onSubmit={handleSubmit}>
        <div className=" grid grid-cols-1 gap-8 mb-4">
          <div className="flex flex-col gap-2">
            <label className="text-white mb-1">Product Name</label>
            <select
              className="w-4/5 p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              name="product_id"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
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
          <div className="flex flex-col gap-2">
            <label className="text-white mb-1">Location</label>
            <select
              className="w-4/5 p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              name="location_id"
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
            >
              <option value="" className="bg-[#0b1c37] text-[#e7e7ea] ">
                Select Location
              </option>
              {locations.map((location) => (
                <option
                  key={location.id}
                  value={location.id}
                  className=" bg-[#0b1c37] cursor-pointer text-[#e7e7ea] "
                >
                  {location.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white mb-1">Quantity</label>
            <input
              type="number"
              className="w-4/5 p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white mb-1">Minimum Quantity</label>
            <input
              type="number"
              className="w-4/5 p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              placeholder="Enter minimum quantity"
              value={minQuantity}
              onChange={(e) => setMinQuantity(e.target.value)}
            />
          </div>
        </div>
        <button
          className="border border-[rgba(41,125,204,0.5)] bg-[rgba(41,125,204,0.2)] transition ease-in-out delay-0 hover:bg-[rgba(41,125,204,0.3)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)] text-white font-semibold py-2 px-2 rounded my-6"
          type="submit"
        >
          Create Inventory Item
        </button>
      </form>
    </div>
  );
};

export default CreateProductInventory;
