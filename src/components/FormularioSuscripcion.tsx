"use client";

import { useState } from 'react';

export default function FormularioSuscripcion() {
  const [tieneEmpresa, setTieneEmpresa] = useState(false);
  return (
    <div className="max-w-4xl mx-auto">
      {/* Título y descripción */}
      <div className="text-center mb-8">
        <h1 
          className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3"
          style={{ 
            fontFamily: 'Kanit, sans-serif',
            fontWeight: '600',
            color: '#0F3439'
          }}
        >
          Solicitar Asociación
        </h1>
        
        <p 
          className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto"
          style={{ 
            fontFamily: 'Inter, sans-serif',
            fontWeight: '400',
            lineHeight: '1.5'
          }}
        >
          Completá el formulario y nos pondremos en contacto contigo a la brevedad 
          para iniciar el proceso de asociación.
        </p>
      </div>

      {/* Formulario */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <form className="space-y-4">
          {/* Información personal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label 
                htmlFor="nombre"
                className="block text-sm font-medium text-gray-700 mb-1"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Nombre y apellido *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors"
                placeholder="Tu nombre completo"
              />
            </div>

            <div>
              <label 
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          {/* Teléfono y Domicilio - Siempre visibles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label 
                htmlFor="telefono"
                className="block text-sm font-medium text-gray-700 mb-1"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Teléfono *
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors"
                placeholder="099 123 456"
              />
            </div>

            <div>
              <label 
                htmlFor="domicilio"
                className="block text-sm font-medium text-gray-700 mb-1"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Domicilio *
              </label>
              <input
                type="text"
                id="domicilio"
                name="domicilio"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors"
                placeholder="Dirección completa"
              />
            </div>
          </div>
          {/* Pregunta sobre empresa */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              ¿Tenés empresa abierta? *
            </label>
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="empresa_abierta"
                  value="si"
                  checked={tieneEmpresa}
                  onChange={() => setTieneEmpresa(true)}
                  className="mr-2 text-primary-green focus:ring-primary-green"
                />
                <span style={{ fontFamily: 'Inter, sans-serif' }}>Sí</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="empresa_abierta"
                  value="no"
                  checked={!tieneEmpresa}
                  onChange={() => setTieneEmpresa(false)}
                  className="mr-2 text-primary-green focus:ring-primary-green"
                />
                <span style={{ fontFamily: 'Inter, sans-serif' }}>No</span>
              </label>
            </div>
          </div>

          {/* Información de la empresa - Solo visible si tiene empresa */}
          {tieneEmpresa && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label 
                    htmlFor="razon_social"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Razón Social *
                  </label>
                  <input
                    type="text"
                    id="razon_social"
                    name="razon_social"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors"
                    placeholder="Razón social de la empresa"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="rut"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    RUT *
                  </label>
                  <input
                    type="text"
                    id="rut"
                    name="rut"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors"
                    placeholder="12345678-9"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label 
                    htmlFor="bps"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    BPS *
                  </label>
                  <input
                    type="text"
                    id="bps"
                    name="bps"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors"
                    placeholder="Número de BPS"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="giro"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Giro/Ramo *
                  </label>
                  <input
                    type="text"
                    id="giro"
                    name="giro"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors"
                    placeholder="Ej: Comercio, Industria, Servicios, etc."
                  />
                </div>
              </div>
            </>
          )}



          {/* Botón de envío */}
          <div className="text-center pt-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              style={{ 
                fontFamily: 'Kanit, sans-serif',
                fontWeight: '600',
                backgroundColor: '#21A85B'
              }}
            >
              ENVIAR SOLICITUD
              <img 
                src="/assets/icons/icono-enviar.svg" 
                alt="Enviar" 
                className="ml-2 w-4 h-4" 
              />
            </button>
          </div>

          
        </form>
      </div>
    </div>
  );
}
