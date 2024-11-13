import React from 'react';
import {useNavigate} from 'react-router-dom'
import { ChevronLeft, Search, Menu, HelpCircle } from 'lucide-react';



const Loan = () => {
    const navigate = useNavigate();

    const handleBack = () => {
      navigate('/profile/gig/673320037e07f2482a611526'); 
    };
    const handleApply = () => {
        navigate('/loan-application'); 
      };

  const loanProducts = [
    {
      id: 1,
      name: "Kisan Credit Card Loan",
      maxAmount: 300000,
      interest: 4.0,
      tenure: "Up to 3 years",
      category: "Agriculture",
      description: "Short-term credit for crop production, post-harvest expenses and maintenance of farm assets"
    },
    {
      id: 2,
      name: "Rural Youth Business Loan",
      maxAmount: 250000,
      interest: 5.5,
      tenure: "Up to 5 years",
      category: "Youth Enterprise",
      description: "Special startup loans for rural youth entrepreneurs under age 35"
    },
    {
      id: 3,
      name: "Dairy Development Loan",
      maxAmount: 200000,
      interest: 4.5,
      tenure: "Up to 4 years",
      category: "Animal Husbandry",
      description: "Financial support for dairy farming, cattle purchase and infrastructure"
    },
    {
      id: 4,
      name: "Rural Women SHG Loan",
      maxAmount: 150000,
      interest: 4.0,
      tenure: "Up to 3 years",
      category: "Women Empowerment",
      description: "Loans for women's self-help groups in rural areas"
    },
    {
      id: 5,
      name: "Farm Mechanization Loan",
      maxAmount: 500000,
      interest: 5.0,
      tenure: "Up to 7 years",
      category: "Agriculture",
      description: "Loans for purchase of tractors, harvesters and farm equipment"
    },
    {
      id: 6,
      name: "Rural Artisan Loan",
      maxAmount: 100000,
      interest: 4.5,
      tenure: "Up to 2 years",
      category: "Rural Craft",
      description: "Support for rural artisans and traditional craft workers"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
          <button className="hover:bg-green-700 p-2 rounded-full" onClick={handleBack}>
              <ChevronLeft size={24} />
            </button>
            {/* /profile/gig/673320037e07f2482a611526 */}
            <h1 className="text-xl font-bold">GraminVittiya</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="hover:bg-green-700 p-2 rounded-full">
              <Search size={24} />
            </button>
            <button className="hover:bg-green-700 p-2 rounded-full">
              <HelpCircle size={24} />
            </button>
            <button className="hover:bg-green-700 p-2 rounded-full">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Rural Development Loans</h2>
          <p className="text-gray-600">Supporting rural growth with affordable financial solutions</p>
        </div>

        {/* Loan Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loanProducts.map((loan) => (
            <div key={loan.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-green-50 p-4">
                <h3 className="text-lg font-semibold text-green-800">{loan.name}</h3>
                <p className="text-sm text-green-600">{loan.category}</p>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-3">{loan.description}</p>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-semibold">Maximum Amount:</span> ₹{loan.maxAmount.toLocaleString()}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Interest Rate:</span> {loan.interest}% p.a.
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Loan Period:</span> {loan.tenure}
                  </p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors w-full" onClick={handleApply}>
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About GraminVittiya</h3>
              <p className="text-gray-400">Empowering rural India through accessible and affordable financial solutions.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">EMI Calculator</a></li>
                <li><a href="#" className="hover:text-white">Documents Required</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Toll Free: 1800-123-4567</li>
                <li>Email: help@graminvittiya.in</li>
                <li>WhatsApp: +91 98765 43210</li>
                <li>Available in: हिंदी, मराठी, తెలుగు</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2024 GraminVittiya. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Loan;