import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetAllInventoryProductQuery,
  useGetAllLocationsQuery,
} from '../../redux/api/selectorSlice';
import {
  useUpdateInventoryMutation,
  useGetInventoryProductByIdQuery,
} from '../../redux/api/inventorySlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PageTitle from '../../components/Shared/PageTitle';
import Loading from '../../components/loading/Loading';
import ErrorPage from '../../components/error/Error';
import { DELAY_TIME, NAVIGATE_BACK } from '../../lib/constants';

const EditProductInventory = () => {
  const { id } = useParams();
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

  const {
    data: inventoryProducts,
    isLoading,
    isError,
  } = useGetInventoryProductByIdQuery(id);

  const [editInventory] = useUpdateInventoryMutation();

  useEffect(() => {
    if (inventoryProducts) {
      setProductId(inventoryProducts.product_id);
      setQuantity(inventoryProducts.quantity);
      setMinQuantity(inventoryProducts.min_quantity);
      setLocationId(inventoryProducts.location_id);
    }
  }, [inventoryProducts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedInventory = {
      product_id: productId,
      quantity,
      min_quantity: minQuantity,
      location_id: locationId,
    };
    try {
      const response = await editInventory({
        id,
        updatedInventory,
      });
      console.log(response);
      if (response.error) {
        return toast.error(response.message);
      }
      toast.success('Inventory updated successfully');
      setTimeout(() => {
        navigate(NAVIGATE_BACK);
      }, DELAY_TIME);
    } catch (error) {
      console.error('error', error);
      toast.error('Failed to update product');
    }
  };

  if (productsLoading || locationLoading || isLoading) {
    return <Loading />;
  }

  if (productsError || locationsError || isError) {
    return <ErrorPage />;
  }

  return (
    <div className="ml-[19rem]">
      <PageTitle title="Edit Product" />
      <form
        className="w-[96%]"
        onSubmit={handleSubmit}
        enctype="multipart/form-data"
      >
        <div className="w-[50%] grid grid-cols-1 gap-6 mb-4">
          <div className="flex flex-col gap-4">
            <label className="text-white mb-1">Product Name</label>
            <select
              className="p-3 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
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
          <div className="flex flex-col gap-4">
            <label className="text-white mb-1">Quantity</label>
            <input
              type="number"
              className="p-3 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="text-white mb-1">Min Quantity</label>
            <input
              type="number"
              className="p-3 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              placeholder="Enter min quantity"
              value={minQuantity}
              onChange={(e) => setMinQuantity(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="text-white mb-1">Location</label>
            <select
              className="p-3 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
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
        </div>
        <button
          className="border border-[rgba(41,125,204,0.5)] bg-[rgba(41,125,204,0.2)] transition ease-in-out delay-0 hover:bg-[rgba(41,125,204,0.3)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)] text-white font-semibold py-2 px-2 rounded my-6"
          type="submit"
        >
          Update Inventory Product
        </button>
      </form>
    </div>
  );
};

export default EditProductInventory;
