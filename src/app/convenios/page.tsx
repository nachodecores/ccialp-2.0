'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import conveniosData from '@/data/convenios.json';

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
      {/* Header con navegación de vuelta */}
      <header className="w-full h-16 bg-primary-dark flex items-center justify-between px-4">
        <Link 
          href="/" 
          className="text-white hover:opacity-80 transition-opacity"
        >
          ← Volver al inicio
        </Link>
        <div></div>
      </header>

      {/* Contenido principal */}
      <main className="relative">
        {/* Fondo dinámico sutil */}
        <div className="absolute inset-0 w-full min-h-screen overflow-hidden">
          {/* Gradiente base */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={{ 
              background: 'linear-gradient(135deg, #0F3439 0%, #1a4a52 50%, #0F3439 100%)'
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
                Trabajamos con empresas líderes para ofrecerte beneficios exclusivos y descuentos especiales.
              </p>
              
              <p 
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '400',
                  lineHeight: '1.6'
                }}
              >
                Nuestros convenios te permiten acceder a servicios de calidad con precios preferenciales, 
                fortaleciendo así el ecosistema empresarial local.
              </p>
            </div>

            {/* Grid de convenios */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {convenios.map((convenio) => {
                const isFlipped = flippedCards.has(convenio.id);
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
                        className="flip-card-front absolute inset-0 w-full h-full bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 flex flex-col items-center justify-center text-center"
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center">
                          <Image
                            src={convenio.logo}
                            alt={`Logo de ${convenio.nombre}`}
                            width={32}
                            height={32}
                            className="w-8 h-8"
                          />
                        </div>
                        <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Kanit, sans-serif' }}>
                          {convenio.nombre}
                        </h3>
                        <div className="text-sm opacity-90 px-2 py-1 rounded-full bg-primary-green/20 text-primary-green font-medium">
                          {convenio.categoria}
                        </div>
                      </div>

                      {/* Reverso de la card */}
                      <div 
                        className="flip-card-back absolute inset-0 w-full h-full bg-primary-green/20 backdrop-blur-sm rounded-lg p-6 border border-primary-green/30 flex flex-col items-center justify-center text-center"
                        style={{ 
                          backfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)'
                        }}
                      >
                        <div className="w-12 h-12 mx-auto mb-3 bg-white/20 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">💰</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: 'Kanit, sans-serif' }}>
                          {convenio.nombre}
                        </h3>
                        <div className="text-sm font-bold text-primary-green mb-2">
                          {convenio.descuento}
                        </div>
                        <div className="text-xs opacity-90 mb-2">
                          {convenio.descripcion}
                        </div>
                        <div className="text-xs opacity-75">
                          📞 {convenio.telefono}
                        </div>
                        <div className="text-xs opacity-75">
                          ✉️ {convenio.email}
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
    </div>
  );
}
