import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Store, ArrowRight } from 'lucide-react';
import Button from '../components/common/Button';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 mb-6">
              India's Premier B2B Marketplace
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with verified buyers and sellers across India. Streamline your B2B 
              transactions and grow your business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-8">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                  <Store className="w-6 h-6 text-teal-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Register as a Seller
                </h2>
                <p className="text-gray-600 mb-6">
                  Showcase your products to thousands of verified buyers across India. 
                  Expand your business with our trusted platform.
                </p>
                <ul className="mb-8 space-y-2">
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-2">✓</span>
                    <span className="text-gray-600">Verified buyer network</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-2">✓</span>
                    <span className="text-gray-600">Secure payment system</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-2">✓</span>
                    <span className="text-gray-600">Business growth tools</span>
                  </li>
                </ul>
                <Link to="/seller-signup">
                  <Button className="w-full flex items-center justify-center">
                    Register as Seller
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-8">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <ShoppingBag className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Register as a Buyer
                </h2>
                <p className="text-gray-600 mb-6">
                  Find reliable suppliers and high-quality products for your business. 
                  Streamline your procurement process.
                </p>
                <ul className="mb-8 space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    <span className="text-gray-600">Verified seller network</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    <span className="text-gray-600">Competitive pricing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    <span className="text-gray-600">Quality assurance</span>
                  </li>
                </ul>
                <Link to="/buyer-signup">
                  <Button 
                    variant="secondary" 
                    className="w-full flex items-center justify-center"
                  >
                    Register as Buyer
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-gray-500">
              Already have an account? <a href="#" className="text-teal-600 font-medium hover:text-teal-700">Sign in</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;