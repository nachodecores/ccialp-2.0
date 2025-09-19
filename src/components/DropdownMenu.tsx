'use client';

import { useState } from 'react';

export default function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'NOSOTROS', href: '#nosotros' },
    { name: 'SERVICIOS', href: '#servicios' },
    { name: 'CONVENIOS', href: '#convenios' },
    { name: 'CONTACTO', href: '#contacto' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white hover:opacity-80 transition-opacity bg-transparent border-none p-0"
        style={{ color: 'white', backgroundColor: 'transparent' }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 md:w-12 md:h-12"
        >
          <path
            d="M3 12H21M3 6H21M3 18H21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      <div 
        className={`absolute top-full mt-2 rounded-lg shadow-xl z-50 transition-all duration-200 ease-in-out ${
          isOpen 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform -translate-y-2 pointer-events-none'
        }`}
        style={{ 
          backgroundColor: '#f5f5f5',
          right: '0',
          width: '24rem',
          transform: isOpen ? 'translateX(0)' : 'translateX(0) translateY(-0.5rem)',
          maxWidth: 'calc(100vw - 2rem)'
        }}
      >
        <div className="py-3 px-3">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="block px-5 py-4 text-3xl hover:bg-green-600 hover:text-white transition-colors duration-150 rounded-md mx-1 mb-2"
              style={{ color: '#2C2C2C' }}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
