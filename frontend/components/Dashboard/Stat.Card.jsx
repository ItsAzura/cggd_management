import React, { useState, useEffect } from 'react';

const easeOutQuad = (t) => t * (2 - t);

const StatCard = ({ title, value, change, changeType, description }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(String(value).replace(/,/g, ''), 10);
    if (start === end) return;

    const duration = 1500;
    const incrementTime = 10;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      start = end * easeOutQuad(progress);

      if (progress === 1) {
        clearInterval(timer);
      }

      setDisplayValue(Math.floor(start).toLocaleString());
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="rounded p-4 border border-[rgba(41,125,204,0.5)] bg-[rgba(41,125,204,0.2)] transition ease-in-out shadow-lg shadow-[rgba(41,125,204,0.1)]">
      <div className="text-[#b7b7b7] text-sm font-medium">{title}</div>
      <div className="text-2xl font-bold text-white">{displayValue}</div>
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
