import React, { useState, useEffect } from 'react';
import {
  useGetAllInventoryProductQuery,
  useGetAllLocationsQuery,
} from '../../redux/api/selectorSlice';
import { useCreateInventoryMutation } from '../../redux/api/inventorySlice';
import { toast } from 'react-toastify';
import PageTitle from '../../components/Shared/PageTitle';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/Loading';
import ErrorPage from '../../components/error/Error';
import IconBtn from '../../components/Shared/IconBtn';
import { DELAY_TIME, NAVIGATE_BACK } from '../../lib/constants';

const CreateProductInventory = () => {
  const navigate = useNavigate();
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [minQuantity, setMinQuantity] = useState('');
  const [locationId, setLocationId] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

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

  useEffect(() => {
    const isFormValid = productId && quantity && minQuantity && locationId;
    setIsDisabled(!isFormValid);
  }, [productId, quantity, minQuantity, locationId]);

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
        navigate(NAVIGATE_BACK);
      }, DELAY_TIME);
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
    <div className="ml-[19rem]">
      <PageTitle title="Create Product Inventory" />
      <form className="w-[96%] p-2" onSubmit={handleSubmit}>
        <div className=" grid grid-cols-1 gap-8 mb-4">
          <div className="flex flex-col gap-2">
            <label className="text-white mb-1">Product Name</label>
            <select
              className="w-4/5 p-3 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
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
              className="w-4/5 p-3 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
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
              className="w-4/5 p-3 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white mb-1">Minimum Quantity</label>
            <input
              type="number"
              className="w-4/5 p-3 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              placeholder="Enter minimum quantity"
              value={minQuantity}
              onChange={(e) => setMinQuantity(e.target.value)}
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
            Create Inventory Item
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

export default CreateProductInventory;
