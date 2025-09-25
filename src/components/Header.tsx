"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import DropdownMenu from "./DropdownMenu";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
          const scrolled = scrollTop > 50;
          setIsScrolled(scrolled);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Llamar inmediatamente
    handleScroll();

    // Agregar múltiples listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    document.body.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      document.body.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`w-full flex items-center justify-between px-4 md:px-6 fixed top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? 'h-16 md:h-20' : 'h-20 md:h-24'
      }`}
      style={{ 
        backgroundColor: isScrolled ? 'rgba(15, 52, 57, 0.9)' : 'rgba(15, 52, 57, 0.5)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999
      }}
    >
      {/* Logo izquierdo */}
      <div className="flex items-center" style={{ marginLeft: '1rem' }}>
        <Image
          src={isScrolled ? "/assets/logos/logo-min-blanco.svg" : "/assets/logos/logo-min-verde.svg"}
          alt="CCIALP Logo"
          width={40}
          height={30}
          className="h-6 w-auto md:h-10 md:w-auto"
        />
      </div>

      {/* Logo central completo */}
      <div 
        className={`flex flex-col items-center text-center transition-opacity duration-1000 ${
          isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{ gap: '0.375rem' }}
      >
        {/* Línea curva superior */}
        <div>
          <Image
            src="/assets/icons/linea-curva-verde-up.svg"
            alt="Línea curva superior"
            width={120}
            height={2}
            className="h-auto w-24 md:w-32 lg:w-40"
          />
        </div>
        
        {/* Texto descriptivo */}
        <p 
          className="whitespace-nowrap text-xs md:text-sm lg:text-base"
          style={{ 
            color: 'white',
            fontFamily: 'Kanit, sans-serif',
            fontWeight: '300',
            margin: '0',
            padding: '0',
            lineHeight: '1'
          }}
        >
          CENTRO COMERCIAL, INDUSTRIAL Y AGRARIO
        </p>
        
        {/* Texto principal */}
        <h1 
          className="whitespace-nowrap text-sm md:text-base lg:text-lg"
          style={{ 
            color: 'white',
            fontFamily: 'Kanit, sans-serif',
            fontWeight: '600',
            margin: '0',
            padding: '0',
            lineHeight: '1',
            letterSpacing: '0.5em',
          }}
        >
          LAS PIEDRAS
        </h1>
        
        {/* Línea curva inferior */}
        <div>
          <Image
            src="/assets/icons/linea-curva-verde-down.svg"
            alt="Línea curva inferior"
            width={120}
            height={2}
            className="h-auto w-24 md:w-32 lg:w-40"
          />
        </div>
      </div>

      {/* Menú desplegable derecho */}
      <div className="flex items-center" style={{ marginRight: '1rem' }}>
        <DropdownMenu />
      </div>
    </header>
  );
}
