import React from 'react';

const DeleteModal = ({ showModal, onClose, content, handleDelete }) => {
  return (
    <>
      {showModal ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-[#163a62] p-6 rounded-lg shadow-lg w-[400px] border border-[rgba(41,125,204,0.7)] shadow-[rgba(41,125,204,0.12)]">
            <h2 className="text-white text-3xl font-semibold text-center mb-4">
              Confirm Delete
            </h2>
            <p className="text-center text-white mb-6">{content}</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-[#0b1c37] text-white p-2 rounded border border-[rgba(41,125,204,0.5)] hover:bg-red-500 hover:scale-110 transition-all duration-300"
              >
                Delete
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#0b1c37] text-white p-2 rounded border border-[rgba(41,125,204,0.5)] hover:bg-white hover:text-black hover:scale-110 transition-all duration-300"
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
