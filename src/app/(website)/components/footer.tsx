import React from 'react';
import 'font-awesome/css/font-awesome.min.css';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto text-center">
        {/* Logo or Company Name */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-300">Jobzilla</h2>
        </div>

        {/* Footer Links */}
        <div className="mb-6 space-x-6">
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">Terms of Service</a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">Contact</a>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mb-6">
          <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300">
            <i className="fab fa-facebook-f text-xl"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300">
            <i className="fab fa-twitter text-xl"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-pink-500 transition duration-300">
            <i className="fab fa-instagram text-xl"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-600 transition duration-300">
            <i className="fab fa-linkedin-in text-xl"></i>
          </a>
        </div>

        {/* Copyright Text */}
        <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Jobzilla. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
