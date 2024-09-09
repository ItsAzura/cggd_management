// StatCard.js
import React from 'react';

const StatCard = ({ title, value, change, changeType, description }) => {
  return (
    <div className="rounded p-4 border border-[rgba(41,125,204,0.5)] bg-[rgba(41,125,204,0.2)] transition ease-in-out shadow-lg shadow-[rgba(41,125,204,0.1)]">
      <div className="text-[#b7b7b7] text-sm font-medium">{title}</div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div
        className={`text-sm mt-2 ${
          changeType === 'positive' ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {change} <span className="text-[#b7b7b7]">{description}</span>
      </div>
    </div>
  );
};

export default StatCard;
