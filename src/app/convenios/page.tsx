'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { Convenio } from '@/types/convenios';
import HeaderPaginas from '@/components/HeaderPaginas';
import Footer from '@/components/Footer';

export default function Convenios() {
  const [convenios, setConvenios] = useState<Convenio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  useEffect(() => {
    cargarConvenios();
  }, []);

  const cargarConvenios = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/convenios?activo=true');
      const data = await response.json();
      
      console.log('Response status:', response.status);
      console.log('Response data:', data);
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al cargar los convenios');
      }
      
      if (data.data) {
        setConvenios(data.data);
        console.log('Convenios cargados:', data.data.length);
      } else {
        setConvenios([]);
        console.warn('No se recibieron datos en la respuesta');
      }
    } catch (error) {
      console.error('Error al cargar convenios:', error);
      setError(error instanceof Error ? error.message : 'Error desconocido');
      setConvenios([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCardFlip = (cardId: string) => {
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

            {loading ? (
              <div className="text-center py-12">
                <p style={{ fontFamily: 'Inter, sans-serif' }}>Cargando convenios...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p style={{ fontFamily: 'Inter, sans-serif', color: '#ff6b6b' }}>
                  Error: {error}
                </p>
                <button
                  onClick={cargarConvenios}
                  className="mt-4 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-600"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Reintentar
                </button>
              </div>
            ) : convenios.length === 0 ? (
              <div className="text-center py-12">
                <p style={{ fontFamily: 'Inter, sans-serif' }}>
                  No se encontraron convenios activos.
                </p>
              </div>
            ) : (
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
                        <div 
                          className="flip-card-front absolute inset-0 w-full h-full bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 flex flex-col items-center justify-center text-center relative"
                          style={{ 
                            backfaceVisibility: 'hidden',
                            backgroundColor: 'rgba(15, 52, 57, 0.3)'
                          }}
                        >
                          <div 
                            className="absolute top-3 right-3 text-xs opacity-90 px-2 py-1 rounded-full font-medium"
                            style={{
                              backgroundColor: 'rgba(248, 240, 192, 0.3)',
                              color: '#0F3439'
                            }}
                          >
                            {convenio.categoria || 'Sin categoría'}
                          </div>
                          
                          <div className="w-32 h-32 mx-auto my-6 bg-white rounded-lg flex items-center justify-center p-2">
                            {convenio.logo ? (
                              <Image
                                src={convenio.logo}
                                alt={`Logo de ${convenio.nombre}`}
                                width={80}
                                height={80}
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <span className="text-gray-400 text-xs">Sin logo</span>
                            )}
                          </div>
                          <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Kanit, sans-serif' }}>
                            {convenio.nombre}
                          </h3>
                        </div>

                        <div 
                          className="flip-card-back absolute inset-0 w-full h-full bg-primary-green/20 backdrop-blur-sm rounded-lg p-6 border border-primary-green/30 flex flex-col items-center justify-center text-center overflow-y-auto"
                          style={{ 
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                            backgroundColor: 'rgba(15, 52, 57, 0.3)'
                          }}
                        >
                          <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: 'Kanit, sans-serif' }}>
                            {convenio.nombre}
                          </h3>
                          
                          {convenio.beneficios && convenio.beneficios.length > 0 && (
                            <div className="text-xs opacity-90 mb-2 text-left w-full">
                              <ul className="list-disc list-inside space-y-1">
                                {convenio.beneficios.map((beneficio, idx) => (
                                  <li key={idx}>{beneficio}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {convenio.alcance && (
                            <div className="text-xs opacity-75 mt-2 italic">
                              Beneficio para: {convenio.alcance}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
