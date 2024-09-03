// StatCard.js
import React from 'react';

const StatCard = ({ title, value, change, changeType, description }) => {
  return (
    <div className="bg-white shadow rounded p-4">
      <div className="text-gray-500 text-sm font-medium">{title}</div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div
        className={`text-sm mt-2 ${
          changeType === 'positive' ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {change} <span className="text-gray-500">{description}</span>
      </div>
    </div>
  );
};

export default StatCard;
