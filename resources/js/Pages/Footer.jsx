import React from 'react';
import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';
import logo from '/img/logo_wbc.png';

export default function Footer() {
  return (
    <footer className="bg-logo-color text-gray-400 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div>
          <img src={logo} alt="Logo" className="h-10" />
        </div>
        <div>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-gray-400 hover:text-gray-200">
                <FaFacebook className="h-6 w-6" />
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-gray-200">
                <FaTwitter className="h-6 w-6" />
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-gray-200">
                <FaYoutube className="h-6 w-6" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
