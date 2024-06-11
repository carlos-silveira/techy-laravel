import React from 'react';

function TopNav() {
  return (
    <nav className="bg-logo-color shadow">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <a href="/" className="flex-shrink-0 flex items-center">
              <img className="block lg:hidden h-8 w-auto" src="/img/logo_wbc.png" alt="Logo" />
              <img className="hidden lg:block h-8 w-auto" src="/img/logo_wbc.png" alt="Logo" />
            </a>
          </div>
          <div className="flex items-center">
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
    </nav>
  );
}

export default TopNav;
