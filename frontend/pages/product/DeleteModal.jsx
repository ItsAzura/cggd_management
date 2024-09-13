import React from 'react';
import { useDeleteProductMutation } from '../../redux/api/productSlice';
import { toast } from 'react-toastify';

const DeleteModal = ({ id, showModal, onClose }) => {
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async () => {
    try {
      const response = await deleteProduct(id).unwrap(); // Use unwrap() for direct access to data
      toast.success('Product deleted successfully');
      onClose(); // Close modal after successful deletion
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  return (
    <>
      {showModal ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#163a62] p-6 rounded-lg shadow-lg w-[400px] border border-[rgba(41,125,204,0.7)]">
            <h2 className="text-white text-2xl font-semibold text-center mb-4">
              Confirm Delete
            </h2>
            <p className="text-center text-white mb-6">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-[#0b1c37] text-white p-2 rounded border border-[rgba(41,125,204,0.5)] hover:bg-red-500 hover:scale-110 transition-all duration-300"
              >
                Delete
              </button>
              <button
                onClick={onClose} // Use the onClose prop to close the modal
                className="px-4 py-2 bg-[#0b1c37] text-white p-2 rounded border border-[rgba(41,125,204,0.5)] hover:bg-[#297dcc] hover:scale-110 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DeleteModal;
