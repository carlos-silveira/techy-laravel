import React, { useState } from 'react';

function TopNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-logo-color shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <a href="/" className="flex-shrink-0 flex items-center">
              <img className="block lg:hidden h-8 w-auto" src="/img/logo_wbc.png" alt="Logo" />
              <img className="hidden lg:block h-8 w-auto" src="/img/logo_wbc.png" alt="Logo" />
            </a>
          </div>
          <div className="flex items-center">
            <div className="md:hidden">
              {/* Hamburger menu button for mobile */}
              <button
                type="button"
                className="block text-gray-500 hover:text-white focus:text-white focus:outline-none"
                onClick={toggleMobileMenu}
              >
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
                </svg>
              </button>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="/" className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-900 hover:bg-gray-50">
                  Inicio
                </a>

                <a href="/about-us" className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-900 hover:bg-gray-50">
                  Acerca de
                </a>

                <a href="/contact" className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-900 hover:bg-gray-50">
                  Contacto
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu, show/hide based on menu state. */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-900 hover:bg-gray-50">
              Inicio
            </a>

            <a href="/about-us" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-900 hover:bg-gray-50">
              Acerca de
            </a>

            <a href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-900 hover:bg-gray-50">
              Contacto
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default TopNav;
