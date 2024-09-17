import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../redux/api/productSlice';
import Loading from '../../components/loading/Loading';
import ErrorPage from '../../components/error/Error';
import placeholderimg from '../../Assets/placeholder_img.png';
import IconBtn from '../../components/Shared/IconBtn';

const DetailProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetProductByIdQuery(id);

  useEffect(() => {
    if (data) setProduct(data);
  }, [data]);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorPage />;

  return (
    <div className="pt-8 ml-72 p-4 text-white">
      <button
        onClick={() => navigate(-1)}
        className="flex flex-row gap-2 items-center md:w-auto font-semibold mb-4 py-1 px-2  "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2rem"
          height="2rem"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M9.295 4.177a.73.73 0 0 1 1.205.552v6.542a.73.73 0 0 1-1.205.552L5.786 8.8a1 1 0 0 1-.347-.757v-.084a1 1 0 0 1 .347-.757z"
            clip-rule="evenodd"
          />
        </svg>
        <span>Back</span>
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Image Section */}
        <div className="flex justify-center items-center">
          <img
            src={placeholderimg}
            alt={product.name}
            className="w-full max-w-xs md:max-w-md rounded-lg shadow-lg transition-transform duration-500 ease-in-out hover:scale-105"
          />
        </div>

        {/* Product Info Section */}
        <div className="space-y-4">
          <h1 className="text-5xl pt-4 font-semibold text-white filter drop-shadow-[0px_0px_6px_rgba(41,125,204,1)] transition-shadow duration-300 ease-in-out hover:drop-shadow-[0px_0px_12px_rgba(41,125,204,0.8)]">
            {product.name}
          </h1>
          <p className="text-gray-300">{product.description}</p>
          <div className="text-4xl font-bold py-2 text-blue-500">
            {product.price} VND
          </div>

          {/* Product Attributes */}
          <div className="space-y-2 pt-2">
            <p>
              <span className="font-medium">Chất liệu:</span> {product.material}
            </p>
            <p>
              <span className="font-medium">Màu sắc:</span> {product.color_name}
            </p>
            <p>
              <span className="font-medium">Kích thước:</span>{' '}
              {product.size_name}
            </p>
          </div>

          {/* Supplier Info */}
          <div className="mt-4">
            <h3 className="font-semibold text-lg">Nhà cung cấp</h3>
            <p>{product.supplier_name}</p>
          </div>

          <Link to={`/product/${id}/edit`}>
            <IconBtn
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.8rem"
                  height="1.8rem"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="m5 16l-1 4l4-1L19.586 7.414a2 2 0 0 0 0-2.828l-.172-.172a2 2 0 0 0-2.828 0zM15 6l3 3m-5 11h8"
                  />
                </svg>
              }
              label="Edit"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
