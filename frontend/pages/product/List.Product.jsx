import React, { useEffect, useState } from 'react';
import {
  useGetAllColorsQuery,
  useGetAllCategoriesQuery,
  useGetAllSizesQuery,
  useGetAllSelectorSupplierQuery,
} from '../../redux/api/seletorSlice';
import { useGetAllProductsQuery } from '../../redux/api/productSlice';
import Loading from '../../components/loading/Loading';
import ErrorPage from '../../components/error/Error';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import DeleteModal from '../../components/Shared/DeleteModal';
import PageTitle from '../../components/Shared/PageTitle';
import IconBtn from '../../components/Shared/IconBtn';
import { useDeleteProductMutation } from '../../redux/api/productSlice';
import { toast } from 'react-toastify';

const Products = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    page: 1,
    name: '',
    color_id: '',
    price_min: '',
    price_max: '',
    size_id: '',
    category_id: '',
    supplier_id: '',
  });

  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Cập nhật URL khi filter hoặc paginate thay đổi
  useEffect(() => {
    const params = new URLSearchParams();

    // Lọc các giá trị không hợp lệ (null, undefined, hoặc chuỗi rỗng)
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        params.append(key, filters[key]);
      }
    });

    // Chỉ cập nhật nếu có tham số filter hợp lệ
    if (Array.from(params).length > 0) {
      navigate(`?${params.toString()}`, { replace: true });
    }
  }, [filters, navigate]);

  // Xử lý debounce cho việc filter
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const {
    data: colors,
    isLoading: colorLoading,
    isError: colorError,
  } = useGetAllColorsQuery();

  const {
    data: sizes,
    isLoading: sizeLoading,
    isError: sizeError,
  } = useGetAllSizesQuery();

  const {
    data: categories,
    isLoading: categoryLoading,
    isError: categoryError,
  } = useGetAllCategoriesQuery();

  const {
    data: suppliers,
    isLoading: supplierLoading,
    isError: supplierError,
  } = useGetAllSelectorSupplierQuery();

  const {
    data: products,
    isLoading: productLoading,
    isError: productError,
  } = useGetAllProductsQuery(filters);

  // Handle filter change
  const handleFilterChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    // Clear previous debounce
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Debounce filter change
    const newTimeout = setTimeout(() => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
        page: 1,
      }));
    }, 300);

    setDebounceTimeout(newTimeout);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: newPage,
    }));
  };

  const openDeleteModal = (productId) => {
    setSelectedProductId(productId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedProductId(null);
  };

  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async () => {
    try {
      const response = await deleteProduct(selectedProductId).unwrap();
      console.log(response);
      toast.success('Product deleted successfully', response);
      closeDeleteModal();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  if (
    colorLoading ||
    sizeLoading ||
    categoryLoading ||
    supplierLoading ||
    productLoading
  ) {
    return <Loading />;
  }

  if (
    colorError ||
    sizeError ||
    categoryError ||
    supplierError ||
    productError
  ) {
    return <ErrorPage />;
  }

  console.log(filters);

  const totalPages = products?.total_pages || 1;

  return (
    <div className="ml-72 ">
      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteModal
          showModal={showDeleteModal}
          onClose={closeDeleteModal}
          content="Are you sure you want to delete this product?"
          handleDelete={handleDelete}
        />
      )}
      <PageTitle title="Products" />
      <div className="w-[100%] grid grid-cols-3 gap-1 mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="w-4/5 p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          placeholder="Min price"
          className="w-4/5 p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
          name="price_min"
          value={filters.price_min}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          placeholder="Max price"
          className="w-4/5 p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
          name="price_max"
          value={filters.price_max}
          onChange={handleFilterChange}
        />
      </div>
      <div className="w-[98%] grid grid-cols-4 gap-1 mb-6 mt-6">
        <select
          className="w-4/5 p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
          name="color_id"
          value={filters.color_id}
          onChange={handleFilterChange}
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
        <select
          className="w-4/5 p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
          name="size_id"
          value={filters.size_id}
          onChange={handleFilterChange}
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
        <select
          className="w-4/5 p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
          name="category_id"
          value={filters.category_id}
          onChange={handleFilterChange}
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
        <select
          className="w-4/5 p-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
          name="supplier_id"
          value={filters.supplier_id}
          onChange={handleFilterChange}
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
      <div className="w-[93%] flex flex-row justify-between items-center">
        <IconBtn
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2rem"
              height="2rem"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M472 168H40a24 24 0 0 1 0-48h432a24 24 0 0 1 0 48m-80 112H120a24 24 0 0 1 0-48h272a24 24 0 0 1 0 48m-96 112h-80a24 24 0 0 1 0-48h80a24 24 0 0 1 0 48"
              />
            </svg>
          }
          label="Filter"
        />
        <Link to="/product/create">
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
                  d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1"
                />
              </svg>
            }
            label="Add Product"
          />
        </Link>
      </div>
      <div className="mt-10">
        <table className="w-[94%] bg-[rgba(41,125,204,0.2)] text-white border border-[rgba(41,125,204,0.7)] rounded shadow-xl shadow-[rgba(41,125,204,0.08)]">
          <thead className="bg-[#163a62]">
            <tr className="text-left">
              <th className="p-3 border-b border-[rgba(41,125,204,0.7)]">
                Name
              </th>
              <th className="p-3 border-b border-[rgba(41,125,204,0.7)]">
                SKU
              </th>
              <th className="p-3 border-b border-[rgba(41,125,204,0.7)]">
                Category
              </th>
              <th className="p-3 border-b border-[rgba(41,125,204,0.7)]">
                Size
              </th>
              <th className="p-3 border-b border-[rgba(41,125,204,0.7)]">
                Color
              </th>
              <th className="p-3 border-b border-[rgba(41,125,204,0.7)]">
                Price
              </th>
              <th className="p-3 border-b border-[rgba(41,125,204,0.7)]">
                Supplier
              </th>
              <th className="p-3 border-b border-[rgba(41,125,204,0.7)]">
                Updated
              </th>
              <th className="p-3 border-b border-[rgba(41,125,204,0.7)]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.data.map((product) => (
              <tr
                key={product.id}
                className="border-b  border-[rgba(41,125,204,0.4)] transition duration-300 ease-in-out hover:bg-[#2b4f7e] hover:scale-[1.02] hover:shadow-lg"
              >
                <td className="p-4">{product.name}</td>
                <td className="p-4">{product.sku}</td>
                <td className="p-4">{product.cate_name}</td>
                <td className="p-4">{product.size_name}</td>
                <td className="p-4">{product.color_name}</td>
                <td className="p-4">{product.price}</td>
                <td className="p-4">{product.supplier_name}</td>
                <td className="p-4">
                  {moment(product.updated_at).format('DD-MM-YYYY')}
                </td>
                <td className="p-4 flex gap-2 justify-center">
                  <button className="px-3 py-2 bg-[#0b1c37] text-white rounded-full border border-[rgba(41,125,204,0.5)] hover:bg-[#297dcc] hover:scale-110 transition-all duration-300">
                    <Link
                      to={`/product/${product.id}`}
                      className="flex flex-row items-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="m5 16l-1 4l4-1L19.586 7.414a2 2 0 0 0 0-2.828l-.172-.172a2 2 0 0 0-2.828 0zM15 6l3 3m-5 11h8"
                        />
                      </svg>
                    </Link>
                  </button>
                  <button
                    className="px-2 py-2 bg-[#0b1c37] text-white p-2 rounded-full border border-[rgba(41,125,204,0.5)] hover:bg-red-500 hover:scale-110 transition-all duration-300"
                    onClick={() => openDeleteModal(product.id)}
                  >
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
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 py-2 flex flex-row items-center justify-center space-x-4">
        <button
          className={`px-2 py-1 bg-[#297DCC] text-white rounded-lg transition-transform duration-300 ${
            filters.page === 1
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-[#1d6eb1] hover:scale-105 hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]'
          }`}
          onClick={() => handlePageChange(filters.page - 1)}
          disabled={filters.page === 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2rem"
            height="2rem"
            viewBox="0 0 24 24"
          >
            <g fill="none" fillRule="evenodd">
              <path d="M24 0v24H0V0z" />
              <path
                fill="currentColor"
                d="M7.94 13.06a1.5 1.5 0 0 1 0-2.12l5.656-5.658a1.5 1.5 0 1 1 2.121 2.122L11.122 12l4.596 4.596a1.5 1.5 0 1 1-2.12 2.122l-5.66-5.658Z"
              />
            </g>
          </svg>
        </button>

        <span className="text-white text-lg font-semibold">
          Page {filters.page} of {totalPages}
        </span>

        <button
          className={`px-2 py-1 bg-[#297DCC] text-white rounded-lg transition-transform duration-300 ${
            filters.page === totalPages
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-[#1d6eb1] hover:scale-105 hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]'
          }`}
          onClick={() => handlePageChange(filters.page + 1)}
          disabled={filters.page === totalPages}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2rem"
            height="2rem"
            viewBox="0 0 24 24"
          >
            <g fill="none" fillRule="evenodd">
              <path d="M24 0v24H0V0z" />
              <path
                fill="currentColor"
                d="M16.06 10.94a1.5 1.5 0 0 1 0 2.12l-5.656 5.658a1.5 1.5 0 1 1-2.121-2.122L12.879 12 8.283 7.404a1.5 1.5 0 0 1 2.12-2.122l5.658 5.657Z"
              />
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Products;
