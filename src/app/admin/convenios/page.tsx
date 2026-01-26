'use client';

import { useState, useEffect } from 'react';
import { Convenio } from '@/types/convenios';
import Link from 'next/link';

const CATEGORIAS = [
  'Salud',
  'Ocio y entretenimiento',
  'Financiamiento',
  'Software',
  'Servicios'
];

export default function ConveniosAdmin() {
  const [convenios, setConvenios] = useState<Convenio[]>([]);
  const [loading, setLoading] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [convenioEditando, setConvenioEditando] = useState<Convenio | null>(null);

  useEffect(() => {
    cargarConvenios();
  }, []);

  const cargarConvenios = async () => {
    try {
      const response = await fetch('/api/convenios');
      const data = await response.json();
      if (response.ok) {
        setConvenios(data.data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id: string, nombre: string) => {
    if (!confirm(`¿Estás seguro de eliminar el convenio "${nombre}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/convenios/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el convenio');
      }

      alert('Convenio eliminado correctamente');
      cargarConvenios();
    } catch (error) {
      alert('Error al eliminar el convenio');
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 
            className="text-3xl font-bold" 
            style={{ fontFamily: 'Kanit, sans-serif', color: '#0F3439' }}
          >
            Gestión de Convenios
          </h1>
          <div className="flex gap-2">
            <Link
              href="/admin"
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-semibold"
            >
              ← Volver
            </Link>
            <button
              onClick={() => setMostrarFormulario(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold"
            >
              + Agregar Convenio
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 md:p-5">
          {loading ? (
            <div className="text-center py-8">
              <p style={{ fontFamily: 'Inter, sans-serif' }}>Cargando convenios...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 font-semibold text-gray-700">Nombre</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-700">Categoría</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-700">Alcance</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-700">Estado</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {convenios.map((convenio) => (
                    <tr key={convenio.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-2">{convenio.nombre}</td>
                      <td className="py-3 px-2">
                        <span className="px-2 py-1 rounded text-xs bg-gray-100">
                          {convenio.categoria || 'N/A'}
                        </span>
                      </td>
                      <td className="py-3 px-2">{convenio.alcance || '-'}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          convenio.activo 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {convenio.activo ? 'ACTIVO' : 'INACTIVO'}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex gap-2">
                          <Link
                            href={`/admin/convenios/${convenio.id}`}
                            className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors"
                          >
                            Editar
                          </Link>
                          <button
                            onClick={() => handleEliminar(convenio.id, convenio.nombre)}
                            className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {mostrarFormulario && (
        <FormularioConvenio
          convenio={null}
          onClose={() => {
            setMostrarFormulario(false);
            cargarConvenios();
          }}
        />
      )}
    </div>
  );
}

function FormularioConvenio({ convenio, onClose }: { convenio: Convenio | null; onClose: () => void }) {
  const [formData, setFormData] = useState<Partial<Convenio>>({
    nombre: '',
    categoria: '',
    logo: '',
    activo: true,
    alcance: '',
    beneficios: [],
    contacto_nombre: '',
    contacto_email: '',
    contacto_telefono: '',
  });
  const [beneficioActual, setBeneficioActual] = useState('');
  const [guardando, setGuardando] = useState(false);

  const agregarBeneficio = () => {
    if (beneficioActual.trim()) {
      setFormData({
        ...formData,
        beneficios: [...(formData.beneficios || []), beneficioActual.trim()]
      });
      setBeneficioActual('');
    }
  };

  const eliminarBeneficio = (index: number) => {
    const nuevos = formData.beneficios?.filter((_, i) => i !== index) || [];
    setFormData({ ...formData, beneficios: nuevos });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardando(true);

    try {
      const response = await fetch('/api/convenios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al crear el convenio');
      }

      alert('Convenio creado correctamente');
      onClose();
    } catch (error) {
      alert('Error al crear el convenio');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold" style={{ fontFamily: 'Kanit, sans-serif', color: '#0F3439' }}>
              Agregar Nuevo Convenio
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Nombre *</label>
                <input
                  type="text"
                  required
                  value={formData.nombre || ''}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Categoría</label>
                <select
                  value={formData.categoria || ''}
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value || null })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                >
                  <option value="">Seleccionar...</option>
                  {CATEGORIAS.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Logo (URL o path)</label>
                <input
                  type="text"
                  value={formData.logo || ''}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  placeholder="/assets/images/logo.png"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Alcance</label>
                <input
                  type="text"
                  value={formData.alcance || ''}
                  onChange={(e) => setFormData({ ...formData, alcance: e.target.value || null })}
                  placeholder="Ej: Socios, familiares y empleados"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Contacto - Nombre</label>
                <input
                  type="text"
                  value={formData.contacto_nombre || ''}
                  onChange={(e) => setFormData({ ...formData, contacto_nombre: e.target.value || null })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Contacto - Email</label>
                <input
                  type="email"
                  value={formData.contacto_email || ''}
                  onChange={(e) => setFormData({ ...formData, contacto_email: e.target.value || null })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Contacto - Teléfono</label>
                <input
                  type="text"
                  value={formData.contacto_telefono || ''}
                  onChange={(e) => setFormData({ ...formData, contacto_telefono: e.target.value || null })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs text-gray-600 mb-1">Beneficios (lista de bullets)</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={beneficioActual}
                  onChange={(e) => setBeneficioActual(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), agregarBeneficio())}
                  placeholder="Agregar beneficio..."
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg"
                />
                <button
                  type="button"
                  onClick={agregarBeneficio}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
                  Agregar
                </button>
              </div>
              <div className="space-y-1">
                {formData.beneficios?.map((beneficio, index) => (
                  <div key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                    <span className="flex-1 text-sm">• {beneficio}</span>
                    <button
                      type="button"
                      onClick={() => eliminarBeneficio(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.activo || false}
                onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
                className="w-4 h-4"
              />
              <label className="text-xs text-gray-600">Activo</label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={guardando}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {guardando ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
