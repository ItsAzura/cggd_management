import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-10 ml-[19rem] mr-8 bg-[#0b1c37] rounded text-white py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About Us */}
          <div>
            <h3 className="text-xl font-bold text-[#297DCC] mb-4">About Us</h3>
            <p className="text-gray-300">
              Azura Warehouse Management provides top-notch solutions for
              warehouse management and inventory control. Our platform is
              designed to streamline operations and improve efficiency.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-[#297DCC] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link
                  to={'/dashboard'}
                  className="hover:text-[#297DCC] transition-colors duration-200"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to={'/product'}
                  className="hover:text-[#297DCC] transition-colors duration-200"
                >
                  Product
                </Link>
              </li>
              <li>
                <Link
                  to={'/supplier'}
                  className="hover:text-[#297DCC] transition-colors duration-200"
                >
                  Supplier
                </Link>
              </li>
              <li>
                <Link
                  to={'/inventory'}
                  className="hover:text-[#297DCC] transition-colors duration-200"
                >
                  Inventory
                </Link>
              </li>
              <li>
                <Link
                  to={'/customer'}
                  className="hover:text-[#297DCC] transition-colors duration-200"
                >
                  Customer
                </Link>
              </li>
              <li>
                <Link
                  to={'/order'}
                  className="hover:text-[#297DCC] transition-colors duration-200"
                >
                  Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-xl font-bold text-[#297DCC] mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>Address: Nghe An, Vietnam</li>
              <li>
                Email:{' '}
                <a
                  href="mailto:support@azurawarehouse.com"
                  className="hover:text-[#297DCC]"
                >
                  support@azurawarehouse.com
                </a>
              </li>
              <li>
                Phone:{' '}
                <a href="tel:+1234567890" className="hover:text-[#297DCC]">
                  +123 456 7890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
          © 2024 Warehouse Management by Azura. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
