import React from 'react';

const ProductLoader = () => {
  return (
    <div className="ml-72  p-4 space-y-6">
      {/* Filters Section */}
      <div className="flex justify-between items-center">
        <button className="w-32 h-10 bg-gray-700 dark:bg-gray-800 rounded-lg animate-pulse"></button>
        <button className="w-32 h-10 bg-gray-700 dark:bg-gray-800 rounded-lg animate-pulse"></button>
      </div>
      {/* Filter Inputs */}
      <div className="grid grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((_, index) => (
          <div
            key={index}
            className="w-full h-10 bg-gray-700 dark:bg-gray-800 rounded-lg animate-pulse"
          ></div>
        ))}
      </div>
      {/* Table */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              {[
                'Name',
                'SKU',
                'Category',
                'Size',
                'Color',
                'Price',
                'Supplier',
                'Updated',
                'Action',
              ].map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {[1, 2, 3, 4, 5, 6, 7].map((_, rowIndex) => (
              <tr key={rowIndex} className="animate-pulse">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-600 dark:bg-gray-700 rounded w-3/4"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-600 dark:bg-gray-700 rounded w-1/2"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-600 dark:bg-gray-700 rounded w-2/3"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-600 dark:bg-gray-700 rounded w-1/2"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-600 dark:bg-gray-700 rounded w-1/3"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-600 dark:bg-gray-700 rounded w-1/3"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-600 dark:bg-gray-700 rounded w-2/3"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-600 dark:bg-gray-700 rounded w-1/3"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <div className="h-6 w-6 bg-gray-600 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-6 w-6 bg-gray-600 dark:bg-gray-700 rounded-full"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-center items-center mt-6">
        <div className="h-8 w-32 bg-gray-700 dark:bg-gray-800 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};

export default ProductLoader;
