import React from 'react';

const Footer = () => {
  return (
    <footer className="ml-20 my-10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p>
              Azura Warehouse Management is dedicated to providing top-notch
              solutions for warehouse management and inventory control. Our
              platform is designed to streamline operations and improve
              efficiency.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/dashboard" className="hover:underline">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/inventory" className="hover:underline">
                  Inventory
                </a>
              </li>
              <li>
                <a href="/orders" className="hover:underline">
                  Orders
                </a>
              </li>
              <li>
                <a href="/reports" className="hover:underline">
                  Reports
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p>Address: Nghe An, VietNam</p>
            <p>Email: support@azurawarehouse.com</p>
            <p>Phone: +123 456 7890</p>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          © 2024 Warehouse Management by Azura. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
