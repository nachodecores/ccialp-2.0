"use client";

import { useState } from 'react';
import Link from "next/link";
import noticiasData from '@/data/noticias.json';

interface Noticia {
  id: number;
  titulo: string;
  descripcion: string;
  imagen?: string;
  fecha: string;
  categoria: string;
  tipo: 'pequena' | 'mediana' | 'grande';
  publicado: boolean;
  autor: string;
}

export default function Noticias() {
  const [mostrarMas, setMostrarMas] = useState(false);
  
  // Cargar datos desde JSON
  const noticias: Noticia[] = noticiasData as Noticia[];
  const noticiasIniciales = noticias.slice(0, 3);
  const noticiasAdicionales = noticias.slice(3);
  
  const noticiasAMostrar = mostrarMas ? noticias : noticiasIniciales;

  const getCardClasses = (tipo: string) => {
    switch (tipo) {
      case 'grande':
        return 'md:col-span-2 md:row-span-2';
      case 'mediana':
        return 'md:col-span-1 md:row-span-1';
      case 'pequena':
        return 'md:col-span-1 md:row-span-1';
      default:
        return 'md:col-span-1 md:row-span-1';
    }
  };

  return (
    <section className="w-full py-8 px-4 md:px-8 lg:px-16" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-7xl mx-auto">
        {/* Título */}
        <h2 
          className="text-3xl md:text-4xl font-bold mb-8 text-center"
          style={{ 
            fontFamily: 'Kanit, sans-serif',
            fontWeight: '600',
            color: '#0F3439'
          }}
        >
          Noticias y Actualidades
        </h2>

        {/* Grid tipo Pinterest */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {noticiasAMostrar.map((noticia) => (
            <div
              key={noticia.id}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden ${getCardClasses(noticia.tipo)}`}
            >
              {noticia.imagen && (
                <div className="aspect-video bg-gray-200">
                  <div 
                    className="w-full h-full flex items-center justify-center text-gray-500"
                    style={{ backgroundColor: '#f3f4f6' }}
                  >
                    <span className="text-sm">Imagen: {noticia.titulo}</span>
                  </div>
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span 
                    className="text-xs font-semibold px-2 py-1 rounded-full"
                    style={{ 
                      backgroundColor: '#21A85B',
                      color: '#ffffff',
                      fontFamily: 'Inter, sans-serif'
                    }}
                  >
                    {noticia.categoria}
                  </span>
                  <span 
                    className="text-xs"
                    style={{ 
                      color: '#6B6B6B',
                      fontFamily: 'Inter, sans-serif'
                    }}
                  >
                    {new Date(noticia.fecha).toLocaleDateString('es-ES', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                
                <h3 
                  className="text-lg font-semibold mb-3"
                  style={{ 
                    fontFamily: 'Kanit, sans-serif',
                    fontWeight: '600',
                    color: '#0F3439'
                  }}
                >
                  {noticia.titulo}
                </h3>
                
                <p 
                  className="text-sm leading-relaxed"
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '400',
                    color: '#6B6B6B'
                  }}
                >
                  {noticia.descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Botón "Ver más tarjetas" */}
        <div className="text-center">
          <button
            onClick={() => setMostrarMas(!mostrarMas)}
            className="inline-flex items-center px-6 py-3 text-base font-semibold text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            style={{ 
              fontFamily: 'Kanit, sans-serif',
              fontWeight: '600',
              backgroundColor: '#21A85B'
            }}
          >
            {mostrarMas ? 'Ver menos tarjetas' : 'Ver más tarjetas'}
            <svg 
              className={`ml-2 w-4 h-4 transition-transform duration-300 ${mostrarMas ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
