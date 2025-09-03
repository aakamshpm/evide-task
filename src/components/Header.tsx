"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden mr-3 text-gray-600 hover:text-gray-900"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
            Digital Signage Dashboard
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 hidden sm:block">
            Admin User
          </span>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-sm border-b">
          <div className="px-4 py-3">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Navigation
              </h2>
            </div>
            <nav>
              <ul className="space-y-2">
                <li>
                  <div className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg font-medium cursor-pointer">
                    Dashboard
                  </div>
                </li>
                <li>
                  <div className="flex items-center px-4 py-2 text-gray-400 rounded-lg cursor-not-allowed">
                    Content Library
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
