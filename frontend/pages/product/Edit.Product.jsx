import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetAllColorsQuery,
  useGetAllCategoriesQuery,
  useGetAllSizesQuery,
  useGetAllSelectorSupplierQuery,
} from '../../redux/api/seletorSlice';
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from '../../redux/api/productSlice';
import Loading from '../../components/loading/Loading';
import ErrorPage from '../../components/error/Error';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../components/Shared/PageTitle';

const EditProduct = () => {
  const { id } = useParams();
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

  const {
    data: product,
    isLoading: ProductLoading,
    isError: ProductError,
  } = useGetProductByIdQuery(id);

  const [updateProduct] = useUpdateProductMutation();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setSku(product.sku);
      setDescription(product.description);
      setCategory_id(product.category_id);
      setSize_id(product.size_id);
      setColor_id(product.color_id);
      setSupplier_id(product.supplier_id);
      setMaterial(product.material);
      setPrice(product.price);
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      id,
      name,
      sku,
      description,
      category_id,
      size_id,
      color_id,
      supplier_id,
      material,
      price,
    };
    console.log('updatedProduct', updatedProduct);

    try {
      const response = await updateProduct({ id, updatedProduct });
      console.log('response', response);
      if (response.error) {
        throw new Error(response.error.message);
      }
      toast.success('Product updated successfully');
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      console.error('error', error);
      toast.error('Failed to update product');
    }
  };

  if (
    colorsLoading ||
    categoriesLoading ||
    sizesLoading ||
    suppliersLoading ||
    ProductLoading
  ) {
    return <Loading />;
  }

  if (
    colorsError ||
    categoriesError ||
    sizesError ||
    suppliersError ||
    ProductError
  ) {
    return <ErrorPage />;
  }

  console.log({
    name,
    sku,
    description,
    category_id,
    size_id,
    color_id,
    supplier_id,
    material,
    price,
  });

  return (
    <div className="ml-[19rem]">
      <PageTitle title="Edit Product" />
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
              className="p-3 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-1">Sku</label>
            <input
              type="text"
              className="p-3 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              placeholder="Enter product sku"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-white mb-1">Description</label>
          <textarea
            className="p-3 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
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
              className="p-3 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              value={category_id}
              onChange={(e) => setCategory_id(e.target.value)}
            >
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
              className="p-3 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              value={size_id}
              onChange={(e) => setSize_id(e.target.value)}
            >
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
              className="p-3 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              value={color_id}
              onChange={(e) => setColor_id(e.target.value)}
            >
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
              className="p-3 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              value={supplier_id}
              onChange={(e) => setSupplier_id(e.target.value)}
            >
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
              className="p-3 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              placeholder="Enter product material"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-1">Price</label>
            <input
              type="number"
              className="p-3 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
              placeholder="Enter product price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <button
          className="border border-[rgba(41,125,204,0.5)] bg-[rgba(41,125,204,0.2)] transition ease-in-out delay-0 hover:bg-[rgba(41,125,204,0.3)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)] text-white font-semibold py-2 px-2 rounded my-6"
          type="submit"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
