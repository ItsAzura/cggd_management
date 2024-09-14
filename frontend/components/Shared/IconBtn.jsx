import React from 'react';

const IconBtn = ({ icon, label }) => {
  return (
    <button className="my-4 flex flex-row items-center gap-2 bg-[#0b1c37] text-white p-2 border border-[rgba(41,125,204,0.5)] rounded-lg hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]">
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default IconBtn;
