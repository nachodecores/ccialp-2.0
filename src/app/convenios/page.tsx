'use client';

import Image from "next/image";
import { useState } from "react";
import conveniosData from '@/data/convenios.json';
import HeaderPaginas from '@/components/HeaderPaginas';
import Footer from '@/components/Footer';

export default function Convenios() {
  const convenios = conveniosData.filter(convenio => convenio.activo);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const handleCardFlip = (cardId: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };
  return (
    <div className="min-h-screen">
      {/* Header reutilizable */}
      <HeaderPaginas />

      {/* Contenido principal */}
      <main className="relative">
        {/* Fondo dinámico sutil */}
        <div className="absolute inset-0 w-full min-h-screen overflow-hidden">
          {/* Gradiente largo hacia abajo */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={{ 
              background: 'linear-gradient(180deg, #0F3439 0%, #1a4a52 30%, #2C6F78 60%, #ffffff 100%)'
            }}
          />
          
          {/* Elementos geométricos decorativos */}
          <div className="absolute inset-0 w-full h-full">
            {/* Círculos decorativos */}
            <div 
              className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-10"
              style={{ backgroundColor: '#21A85B' }}
            />
            <div 
              className="absolute top-40 right-20 w-24 h-24 rounded-full opacity-15"
              style={{ backgroundColor: '#F8F0C0' }}
            />
            <div 
              className="absolute bottom-32 left-1/4 w-16 h-16 rounded-full opacity-20"
              style={{ backgroundColor: '#21A85B' }}
            />
            
            {/* Líneas decorativas */}
            <div 
              className="absolute top-1/3 right-1/3 w-1 h-32 opacity-30"
              style={{ 
                background: 'linear-gradient(to bottom, transparent, #21A85B, transparent)',
                transform: 'rotate(45deg)'
              }}
            />
            <div 
              className="absolute bottom-1/4 left-1/3 w-1 h-24 opacity-25"
              style={{ 
                background: 'linear-gradient(to bottom, transparent, #F8F0C0, transparent)',
                transform: 'rotate(-30deg)'
              }}
            />
            
            {/* Patrón de puntos sutil */}
            <div className="absolute inset-0 w-full h-full opacity-5">
              <div className="grid grid-cols-12 gap-4 h-full">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div 
                    key={i}
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: '#21A85B' }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Contenido sobre el overlay */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-start px-4 py-16">
          <div className="max-w-6xl mx-auto text-center text-white">
            <h2 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8"
              style={{ 
                fontFamily: 'Kanit, sans-serif',
                fontWeight: '600'
              }}
            >
              CONVENIOS
            </h2>
            
            <div className="space-y-6 text-lg md:text-xl lg:text-2xl mb-12">
              <p 
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '400',
                  lineHeight: '1.6'
                }}
              >
                Trabajamos con empresas líderes para ofrecerte beneficios exclusivos y descuentos especiales para nuestros socios.
              </p>
              
            </div>

            {/* Grid de convenios */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {convenios.map((convenio, index) => {
                const isFlipped = flippedCards.has(convenio.id);
                const isFirstCard = index === 0;
                return (
                  <div 
                    key={convenio.id} 
                    className="flip-card h-64 cursor-pointer"
                    style={{ perspective: '1000px' }}
                    onClick={() => handleCardFlip(convenio.id)}
                  >
                    <div 
                      className={`flip-card-inner relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                        isFlipped ? 'rotate-y-180' : ''
                      }`}
                      style={{ 
                        transformStyle: 'preserve-3d',
                        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                      }}
                    >
                      {/* Frente de la card */}
                      <div 
                        className="flip-card-front absolute inset-0 w-full h-full bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 flex flex-col items-center justify-center text-center relative"
                        style={{ 
                          backfaceVisibility: 'hidden',
                          backgroundColor: 'rgba(15, 52, 57, 0.3)'
                        }}
                      >
                        {/* Categoría en esquina superior derecha */}
                        <div 
                          className="absolute top-3 right-3 text-xs opacity-90 px-2 py-1 rounded-full font-medium"
                          style={{
                            backgroundColor: 'rgba(248, 240, 192, 0.3)',
                            color: '#0F3439'
                          }}
                        >
                          {convenio.categoria}
                        </div>
                        
                        <div className="w-32 h-32 mx-auto my-6 bg-white rounded-lg flex items-center justify-center p-2">
                          <Image
                            src={convenio.logo}
                            alt={`Logo de ${convenio.nombre}`}
                            width={80}
                            height={80}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Kanit, sans-serif' }}>
                          {convenio.nombre}
                        </h3>
                      </div>

                      {/* Reverso de la card */}
                      <div 
                        className="flip-card-back absolute inset-0 w-full h-full bg-primary-green/20 backdrop-blur-sm rounded-lg p-6 border border-primary-green/30 flex flex-col items-center justify-center text-center"
                        style={{ 
                          backfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                          backgroundColor: 'rgba(15, 52, 57, 0.3)'
                        }}
                      >
                        <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: 'Kanit, sans-serif' }}>
                          {convenio.nombre}
                        </h3>
                        <div className="text-sm font-bold text-primary-green mb-2">
                          {convenio.descuento}
                        </div>
                        <div className="text-xs opacity-90 mb-2">
                          {convenio.descripcion}
                        </div>
                      
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
