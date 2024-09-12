import React, { useState } from 'react';
import {
  useGetAllColorsQuery,
  useGetAllCategoriesQuery,
  useGetAllLocationsQuery,
  useGetAllSizesQuery,
  useGetAllSelectorSupplierQuery,
} from '../../redux/api/seletorSlice';
import Loading from '../../components/loading/Loading';
import ErrorPage from '../../components/error/Error';
import { toast } from 'react-toastify';
import { useCreateProductMutation } from '../../redux/api/productSlice';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [description, setDescription] = useState('');
  const [category_id, setCategory_id] = useState('');
  const [size_id, setSize_id] = useState('');
  const [color_id, setColor_id] = useState('');
  const [supplier_id, setSupplier_id] = useState('');
  const [material, setMaterial] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const {
    data: colors,
    isLoading: colorsLoading,
    error: colorsError,
  } = useGetAllColorsQuery();
  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetAllCategoriesQuery();
  const {
    data: sizes,
    isLoading: sizesLoading,
    error: sizesError,
  } = useGetAllSizesQuery();
  const {
    data: suppliers,
    isLoading: suppliersLoading,
    error: suppliersError,
  } = useGetAllSelectorSupplierQuery();

  const [createProduct] = useCreateProductMutation();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      console.log('Selected file:', file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('name', name.trim());
    formData.append('sku', sku.trim());
    formData.append('description', description.trim());
    formData.append('category_id', category_id);
    formData.append('size_id', size_id);
    formData.append('color_id', color_id);
    formData.append('supplier_id', supplier_id);
    formData.append('material', material.trim());
    formData.append('price', price);
    if (image) {
      formData.append('image', image);
    }

    console.log('Form data contents:');
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await createProduct(formData).unwrap();
      console.log('Create product response:', response);
      toast.success('Product created successfully');
      setTimeout(() => {
        navigate(-1);
      }, 3000);
      setName('');
      setSku('');
      setDescription('');
      setCategory_id('');
      setSize_id('');
      setColor_id('');
      setSupplier_id('');
      setMaterial('');
      setPrice('');
      setImage('');
    } catch (error) {
      console.error('Error creating product:', error);
      console.error('Error response:', error.response);
      console.error('Error data:', error.response?.data);
      toast.error(error?.data?.message || 'Something went wrong!');
    }
  };

  if (colorsLoading || categoriesLoading || sizesLoading || suppliersLoading) {
    return <Loading />;
  }

  if (colorsError || categoriesError || sizesError || suppliersError) {
    return <ErrorPage />;
  }

  return (
    <div className="ml-72">
      <h1 className="text-4xl pt-4 mb-4 font-semibold text-white py-2 filter drop-shadow-[0px_0px_6px_rgba(41,125,204,1)] transition-shadow">
        Create Product
      </h1>
      <form
        className="w-[96%]"
        onSubmit={handleSubmit}
        enctype="multipart/form-data"
      >
        <div className=" grid grid-cols-2 gap-6 mb-4">
          <div className="flex flex-col">
            <label className="text-white mb-1">Name</label>
            <input
              type="text"
              className="p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-1">Sku</label>
            <input
              type="text"
              className="p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              placeholder="Enter product sku"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-white mb-1">Description</label>
          <textarea
            className="p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
            cols={10}
            rows={6}
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-6 mb-4">
          <div className="flex flex-col">
            <label className="text-white mb-1">Category</label>
            <select
              className="p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              value={category_id}
              onChange={(e) => setCategory_id(e.target.value)}
            >
              <option
                value=""
                className=" bg-[#0b1c37] cursor-pointer text-[#e7e7ea] "
              >
                Select Category
              </option>
              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                  className=" bg-[#0b1c37] cursor-pointer text-[#e7e7ea] "
                >
                  {category.cate_name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-1">Size</label>
            <select
              className="p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              value={size_id}
              onChange={(e) => setSize_id(e.target.value)}
            >
              <option
                value=""
                className=" bg-[#0b1c37] cursor-pointer text-[#e7e7ea] "
              >
                Select Size
              </option>
              {sizes.map((size) => (
                <option
                  key={size.id}
                  value={size.id}
                  className=" bg-[#0b1c37] cursor-pointer text-[#e7e7ea] "
                >
                  {size.size_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 mb-4">
          <div className="flex flex-col">
            <label className="text-white mb-1">Color</label>
            <select
              className="p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              value={color_id}
              onChange={(e) => setColor_id(e.target.value)}
            >
              <option value="" className="bg-[#0b1c37] text-[#e7e7ea] ">
                Select Color
              </option>
              {colors.map((color) => (
                <option
                  key={color.id}
                  value={color.id}
                  className=" bg-[#0b1c37] cursor-pointer text-[#e7e7ea] "
                >
                  {color.color_name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-1">Supplier</label>
            <select
              className="p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              value={supplier_id}
              onChange={(e) => setSupplier_id(e.target.value)}
            >
              <option
                value=""
                className=" bg-[#0b1c37] cursor-pointer text-[#e7e7ea] "
              >
                Select Supplier
              </option>
              {suppliers.map((supplier) => (
                <option
                  key={supplier.id}
                  value={supplier.id}
                  className=" bg-[#0b1c37] cursor-pointer text-[#e7e7ea] "
                >
                  {supplier.supplier_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 mb-4">
          <div className="flex flex-col">
            <label className="text-white mb-1">Material</label>
            <input
              type="text"
              className="p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              placeholder="Enter product material"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-1">Price</label>
            <input
              type="number"
              className="p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              placeholder="Enter product price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="w-[10%]">
          <label htmlFor="image" className="flex flex-col">
            <span className="text-white">Upload Image</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="5rem"
              height="5rem"
              viewBox="0 0 24 24"
              className="text-white hover:filter hover:drop-shadow-[0_0_2px_rgba(41,125,204,1)] transition-shadow"
            >
              <path
                fill="currentColor"
                d="M11 16V7.85l-2.6 2.6L7 9l5-5l5 5l-1.4 1.45l-2.6-2.6V16zm-5 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"
              />
            </svg>
          </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={(e) => handleImageChange(e)}
            className="hidden"
          />
        </div>
        <button
          className="border border-[rgba(41,125,204,0.5)] bg-[rgba(41,125,204,0.2)] transition ease-in-out delay-0 hover:bg-[rgba(41,125,204,0.3)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)] text-white font-semibold py-2 px-2 rounded my-6"
          type="submit"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
