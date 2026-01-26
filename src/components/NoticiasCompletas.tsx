"use client";

import Link from 'next/link';
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

export default function NoticiasCompletas() {
  // Cargar datos desde JSON
  const noticias: Noticia[] = noticiasData as Noticia[];

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
    <div className="max-w-7xl mx-auto mt-8">
      {/* Título */}
      <div className="text-center mb-12">
        <h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          style={{ 
            fontFamily: 'Kanit, sans-serif',
            fontWeight: '600',
            color: '#0F3439'
          }}
        >
          Noticias
        </h1>
      </div>

      {/* Grid de noticias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {noticias.map((noticia) => (
          <div
            key={noticia.id}
            className={`bg-white rounded-xl shadow-lg overflow-hidden ${getCardClasses(noticia.tipo)}`}
          >
            {noticia.imagen && (
              <div className="aspect-video bg-gray-200 overflow-hidden">
                <img
                  src={noticia.imagen}
                  alt={noticia.titulo}
                  className="w-full h-full object-cover"
                />
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


      {/* Botón para volver al inicio */}
      <div className="text-center">
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 text-base font-semibold text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
          style={{ 
            fontFamily: 'Kanit, sans-serif',
            fontWeight: '600',
            backgroundColor: '#21A85B'
          }}
        >
          Volver al inicio
          <svg 
            className="ml-2 w-4 h-4"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
