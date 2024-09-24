import React, { useState } from 'react';
import PageTitle from '../../components/Shared/PageTitle';
import { useCreateInventoryExportMutation } from '../../redux/api/inventorySlice';
import Loading from '../../components/loading/Loading';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import IconBtn from '../../components/Shared/IconBtn';
import { useGetAllInventoryProductQuery } from '../../redux/api/seletorSlice';
import { useNavigate } from 'react-router-dom';
import { DELAY_TIME } from '../../lib/constants';

const CreateExportInventory = () => {
  const navigate = useNavigate();
  const [createExportLog, { isLoading }] = useCreateInventoryExportMutation();

  const { data: products, isLoading: productLoading } =
    useGetAllInventoryProductQuery();

  const { userInfo } = useSelector((state) => state.auth);
  const [logItems, setLogItems] = useState([
    { product_id: '', quantity: '', note: '' },
  ]);

  const handleLogItemChange = (index, e) => {
    const { name, value } = e.target;
    const items = [...logItems];
    items[index][name] = value;
    setLogItems(items);
  };

  const handleAddLogItem = () => {
    setLogItems([...logItems, { product_id: '', quantity: '', note: '' }]);
  };

  const handleRemoveLogItem = (index) => {
    const items = logItems.filter((_, i) => i !== index);
    setLogItems(items);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createExportLog({ user_id: userInfo.id, logItems }).unwrap();
      toast.success('Export log created successfully');
      setLogItems([{ product_id: '', quantity: '', note: '' }]);
      setTimeout(() => {
        navigate(-1);
      }, DELAY_TIME);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (productLoading) return <Loading />;

  console.log(userInfo);
  return (
    <div className="ml-[19rem]">
      <div className="w-[96%] flex flex-row justify-between">
        <PageTitle title="Create Export Product" />
        <button onClick={() => navigate(-1)}>
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
                  d="m4 10l-.707.707L2.586 10l.707-.707zm17 8a1 1 0 1 1-2 0zM8.293 15.707l-5-5l1.414-1.414l5 5zm-5-6.414l5-5l1.414 1.414l-5 5zM4 9h10v2H4zm17 7v2h-2v-2zm-7-7a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5z"
                />
              </svg>
            }
            label={'Back'}
          />
        </button>
      </div>
      <div className="p-2">
        <form onSubmit={handleSubmit} className="w-3/5 mt-4 text-white">
          {logItems.map((item, index) => (
            <div
              key={index}
              className="mt-4 flex flex-col gap-2 pl-8 py-6 rounded shadow-lg border border-[rgba(41,125,204,0.5)] bg-[rgba(41,125,204,0.2)] transition ease-in-out hover:shadow-lg hover:shadow-[rgba(41,125,204,0.05)] hover:bg-[rgba(41,125,204,0.2)]"
            >
              <h3 className="font-semibold text-2xl mb-4">
                Inventory Item {index + 1}
              </h3>
              <label className="block mb-2">Product: </label>
              <select
                name="product_id"
                value={item.product_id}
                onChange={(e) => handleLogItemChange(index, e)}
                required
                className="w-4/5 p-2 bg-[#040411] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
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
              <label className="block mb-2">Quantity:</label>
              <input
                type="number"
                name="quantity"
                value={item.quantity}
                onChange={(e) => handleLogItemChange(index, e)}
                required
                className="w-4/5 p-2 bg-[#040411] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              />
              <label className="block mb-2">Note:</label>
              <textarea
                type="text"
                name="note"
                cols={30}
                rows={5}
                value={item.note}
                onChange={(e) => handleLogItemChange(index, e)}
                className="w-4/5 p-2 bg-[#040411] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              />
              <button
                type="button"
                onClick={() => handleRemoveLogItem(index)}
                disabled={logItems.length === 1}
              >
                <IconBtn
                  icon={
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
                  }
                  label="Remove Item"
                />
              </button>
            </div>
          ))}

          <div className="flex flex-row gap-2">
            <button type="button" onClick={handleAddLogItem} className="">
              <IconBtn
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2rem"
                    height="2rem"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none">
                      <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                      <path
                        fill="currentColor"
                        d="M10.5 20a1.5 1.5 0 0 0 3 0v-6.5H20a1.5 1.5 0 0 0 0-3h-6.5V4a1.5 1.5 0 0 0-3 0v6.5H4a1.5 1.5 0 0 0 0 3h6.5z"
                      />
                    </g>
                  </svg>
                }
                label="Add Item"
              />
            </button>

            <button
              type="submit"
              className={`my-4 flex flex-row items-center gap-2 bg-[#0b1c37] text-white p-2 border border-[rgba(41,125,204,0.5)] rounded-lg hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)] ${
                isLoading ? 'opacity-50' : ''
              }`}
              disabled={isLoading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="2rem"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5v2H5v14h14v-5z"
                />
                <path fill="currentColor" d="M21 7h-4V3h-2v4h-4v2h4v4h2V9h4z" />
              </svg>
              {isLoading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateExportInventory;
