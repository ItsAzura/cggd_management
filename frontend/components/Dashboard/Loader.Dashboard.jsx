import React from 'react';

const DashboardLoader = () => {
  return (
    <div className="ml-72">
      <div className="p-4 space-y-6">
        <div className="flex justify-between items-center animate-pulse">
          <div className="h-10 bg-gray-600 rounded w-1/5"></div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((_, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg p-4 space-y-4 animate-pulse"
            >
              <div className="h-4 bg-gray-600 rounded w-3/4"></div>
              <div className="h-8 bg-gray-600 rounded w-full"></div>
              <div className="h-4 bg-gray-600 rounded w-1/2"></div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className=" bg-gray-800 rounded-lg p-6 h-80 animate-pulse">
            <div className="h-full bg-gray-600 rounded"></div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 space-y-4 animate-pulse">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="h-6 bg-gray-600 rounded-full w-3/4"></div>
                <div className="h-6 bg-gray-600 rounded-full w-1/4"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg p-4 space-y-4 animate-pulse"
            >
              <div className="h-4 bg-gray-600 rounded w-3/4"></div>
              <div className="h-8 bg-gray-600 rounded w-full"></div>
              <div className="h-4 bg-gray-600 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardLoader;
