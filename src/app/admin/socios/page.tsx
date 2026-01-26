'use client';

import { useState, useEffect, useMemo } from 'react';
import { Socio } from '@/types/socios';
import Link from 'next/link';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

export default function SociosAdmin() {
  const [socios, setSocios] = useState<Socio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [socioEditando, setSocioEditando] = useState<Socio | null>(null);

  // Cargar socios
  const cargarSocios = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      params.append('limit', '10000'); // Límite alto para cargar todos los socios

      const response = await fetch(`/api/socios?${params}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al cargar los socios');
      }

      setSocios(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarSocios();
  }, []);

  // Calcular estadísticas
  const estadisticas = useMemo(() => {
    const totalActivos = socios.filter(s => s.al_dia_cuota).length;
    const totalInactivos = socios.length - totalActivos;
    
    // Agrupar por segmento_principal
    const segmentosMap = new Map<string, number>();
    socios.forEach(socio => {
      const segmento = socio.segmento_principal || 'Sin segmento';
      segmentosMap.set(segmento, (segmentosMap.get(segmento) || 0) + 1);
    });
    
    const totalSegmentos = Array.from(segmentosMap.values()).reduce((sum, val) => sum + val, 0);
    const datosSegmentos = Array.from(segmentosMap.entries())
      .map(([name, value]) => ({
        name,
        value,
        percent: totalSegmentos > 0 ? (value / totalSegmentos) * 100 : 0
      }))
      .sort((a, b) => b.percent - a.percent); // Ordenar por porcentaje de mayor a menor

    // Agrupar por tipo_socio (gremial vs gestoria) con activos e inactivos
    const tipoSocioMap = new Map<string, { activos: number; inactivos: number }>();
    socios.forEach(socio => {
      const tipo = socio.tipo_socio || 'Sin tipo';
      if (!tipoSocioMap.has(tipo)) {
        tipoSocioMap.set(tipo, { activos: 0, inactivos: 0 });
      }
      const datos = tipoSocioMap.get(tipo)!;
      if (socio.al_dia_cuota) {
        datos.activos++;
      } else {
        datos.inactivos++;
      }
    });

    const datosTipoSocio = Array.from(tipoSocioMap.entries()).map(([name, datos]) => ({
      name: name === 'gremial' ? 'Gremial' : name === 'gestoria' ? 'Con Gestoría' : name,
      activos: datos.activos,
      inactivos: datos.inactivos,
      total: datos.activos + datos.inactivos
    }));

    return {
      totalActivos,
      totalInactivos,
      total: socios.length,
      datosSegmentos,
      datosTipoSocio
    };
  }, [socios]);

  // Colores para el gráfico
  const COLORS = ['#21A85B', '#0F3439', '#FFA500', '#FF6B6B', '#4ECDC4', '#95E1D3', '#F38181', '#AA96DA', '#FCBAD3', '#FFD93D'];

  // Cambiar estado de pago (al_dia_cuota: true = activo, false = inactivo)
  const handleCambiarEstado = async (id: string, alDiaActual: boolean) => {
    const nuevoEstado = !alDiaActual; // Invertir el booleano
    
    try {
      const response = await fetch(`/api/socios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ al_dia_cuota: nuevoEstado }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al cambiar el estado');
      }

      // Actualizar el estado local sin recargar toda la lista
      setSocios(socios.map(socio => 
        socio.id === id ? { ...socio, al_dia_cuota: nuevoEstado } : socio
      ));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al cambiar el estado');
      console.error('Error:', err);
    }
  };

  // Eliminar socio
  const handleEliminar = async (id: string, nombre: string) => {
    if (!confirm(`¿Estás seguro de eliminar al socio "${nombre}"? Esta acción no se puede deshacer.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/socios/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al eliminar el socio');
      }

      alert('Socio eliminado correctamente');
      cargarSocios();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al eliminar el socio');
      console.error('Error:', err);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="max-w-7xl mx-auto">
        {/* Título y botón agregar */}
        <div className="flex justify-between items-center mb-6">
          <h1 
            className="text-3xl font-bold" 
            style={{ fontFamily: 'Kanit, sans-serif', color: '#0F3439' }}
          >
            Gestión de Socios
          </h1>
          <button
            onClick={() => setMostrarFormulario(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold"
            style={{ fontFamily: 'Kanit, sans-serif' }}
          >
            + Agregar Socio
          </button>
        </div>

        {/* Dashboard */}
        <div className="mb-4">
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-5">
            <h2
              className="text-xl font-semibold mb-4"
              style={{ fontFamily: 'Kanit, sans-serif', color: '#0F3439' }}
            >
              Dashboard
            </h2>
            <div className="mb-4">
              <div className="bg-green-50 rounded-lg p-6 border border-green-200 inline-block">
                <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Socios Activos
                </p>
                <p className="text-4xl font-bold" style={{ color: '#21A85B', fontFamily: 'Kanit, sans-serif' }}>
                  {estadisticas.totalActivos}
                </p>
              </div>
            </div>
            
            {/* Gráficos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Gráfico de torta por segmento */}
              {estadisticas.datosSegmentos.length > 0 && (
                <div className="md:col-span-2 border-r border-gray-300 pr-4">
                  <h3 className="text-base font-semibold mb-3 text-center" style={{ fontFamily: 'Kanit, sans-serif', color: '#0F3439' }}>
                    Distribución por Segmento Principal
                  </h3>
                  <div className="flex items-center">
                    <ResponsiveContainer width="60%" height={400}>
                      <PieChart>
                        <Pie
                          data={estadisticas.datosSegmentos}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={160}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {estadisticas.datosSegmentos.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex-1">
                      <div className="space-y-2">
                        {estadisticas.datosSegmentos.map((entry, index) => (
                          <div key={entry.name} className="flex items-center gap-2">
                            <div 
                              className="w-4 h-4 rounded"
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
                              {entry.name} ({entry.percent.toFixed(0)}%)
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Gráfico de barras apilado por tipo de socio */}
              {estadisticas.datosTipoSocio.length > 0 && (
                <div className="pl-4">
                  <h3 className="text-base font-semibold mb-3 text-center" style={{ fontFamily: 'Kanit, sans-serif', color: '#0F3439' }}>
                    Distribución por Tipo de Socio
                  </h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={estadisticas.datosTipoSocio} barCategoryGap="20%">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        tickFormatter={(value, entry: any) => {
                          const data = estadisticas.datosTipoSocio.find(d => d.name === value);
                          return data ? `${value} (${data.total})` : value;
                        }}
                      />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: any, name: string | undefined, props: any) => {
                          const total = props.payload.total;
                          return [
                            <>
                              <div>Activos: {props.payload.activos}</div>
                              <div>Inactivos: {props.payload.inactivos}</div>
                              <div style={{ fontWeight: 'bold', marginTop: '4px' }}>Total: {total}</div>
                            </>,
                            ''
                          ];
                        }}
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
                      />
                      <Bar dataKey="activos" stackId="a" fill="#21A85B" name="Activos" barSize={40} />
                      <Bar dataKey="inactivos" stackId="a" fill="#DC2626" name="Inactivos" barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabla de socios */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-5">
          {loading ? (
            <div className="text-center py-8">
              <p style={{ fontFamily: 'Inter, sans-serif' }}>Cargando socios...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">
              <p style={{ fontFamily: 'Inter, sans-serif' }}>{error}</p>
            </div>
          ) : socios.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p style={{ fontFamily: 'Inter, sans-serif' }}>No se encontraron socios</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 font-semibold text-gray-700">N° de socio</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-700">Razón social</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-700">Nombre de fantasía</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-700">Tipo de socio</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-700">Estado</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {socios.map((socio) => (
                    <tr key={socio.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-2">{socio.numero_socio}</td>
                      <td className="py-3 px-2">
                        {socio.razon_social || socio.nombre_fantasia || `${socio.nombre} ${socio.apellido || ''}`.trim() || '-'}
                      </td>
                      <td className="py-3 px-2">
                        {socio.nombre_fantasia || '-'}
                      </td>
                      <td className="py-3 px-2">
                        <span className="px-2 py-1 rounded text-xs bg-gray-100">
                          {socio.tipo_socio || 'N/A'}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <button
                          onClick={() => handleCambiarEstado(socio.id, socio.al_dia_cuota)}
                          className={`px-2 py-1 rounded text-xs font-semibold cursor-pointer transition-all hover:opacity-80 ${
                            socio.al_dia_cuota
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                          title="Click para cambiar el estado"
                        >
                          {socio.al_dia_cuota ? 'ACTIVO' : 'INACTIVO'}
                        </button>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex gap-2">
                          <Link
                            href={`/admin/socios/${socio.id}`}
                            className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors"
                          >
                            Ver
                          </Link>
                          <button
                            onClick={() => handleEliminar(socio.id, socio.nombre)}
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

      {/* Modal de formulario para agregar socio */}
      {mostrarFormulario && (
        <FormularioSocio
          socio={null}
          onClose={() => {
            setMostrarFormulario(false);
            cargarSocios();
          }}
        />
      )}
    </div>
  );
}

// Componente de formulario para agregar/editar socio
function FormularioSocio({ socio, onClose }: { socio: Socio | null; onClose: () => void }) {
  const [formData, setFormData] = useState<Partial<Socio>>({
    nombre: '',
    rut: '',
    al_dia_cuota: true,
    tipo_socio: null,
    cliente_cpy: false,
    adherido_dia_piedras: false,
    nombre_fantasia: '',
    razon_social: '',
    forma_juridica: null,
    descripcion: '',
    segmento_principal: null,
  });
  const [guardando, setGuardando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardando(true);

    try {
      const response = await fetch('/api/socios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al crear el socio');
      }

      alert('Socio creado correctamente');
      onClose();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al crear el socio');
      console.error('Error:', err);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2
              className="text-2xl font-semibold"
              style={{ fontFamily: 'Kanit, sans-serif', color: '#0F3439' }}
            >
              Agregar Nuevo Socio
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
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
                <label className="block text-xs text-gray-600 mb-1">Apellido</label>
                <input
                  type="text"
                  value={formData.apellido || ''}
                  onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                />
              </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">RUT/CI *</label>
                    <input
                      type="text"
                      required
                      value={formData.rut || ''}
                      onChange={(e) => setFormData({ ...formData, rut: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                    />
                  </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Tipo de Socio</label>
                <select
                  value={formData.tipo_socio || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ 
                      ...formData, 
                      tipo_socio: (value === 'gremial' || value === 'gestoria') ? value : null 
                    });
                  }}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                >
                  <option value="">Seleccionar...</option>
                  <option value="gremial">Gremial</option>
                  <option value="gestoria">Con Gestoría</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Celular</label>
                <input
                  type="text"
                  value={formData.celular || ''}
                  onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Al Día Cuota</label>
                <select
                  value={formData.al_dia_cuota ? 'true' : 'false'}
                  onChange={(e) => setFormData({ ...formData, al_dia_cuota: e.target.value === 'true' })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                >
                  <option value="false">No al día (Inactivo)</option>
                  <option value="true">Al día (Activo)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Razón Social</label>
                <input
                  type="text"
                  value={formData.razon_social || ''}
                  onChange={(e) => setFormData({ ...formData, razon_social: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Nombre de Fantasía</label>
                <input
                  type="text"
                  value={formData.nombre_fantasia || ''}
                  onChange={(e) => setFormData({ ...formData, nombre_fantasia: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Forma Jurídica</label>
                <select
                  value={formData.forma_juridica || ''}
                  onChange={(e) => setFormData({ ...formData, forma_juridica: e.target.value || null })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                >
                  <option value="">Seleccionar...</option>
                  <option value="unipersonal">Unipersonal</option>
                  <option value="sociedadHecho">Sociedad de Hecho (SDH)</option>
                  <option value="srl">SRL</option>
                  <option value="sas">SAS</option>
                  <option value="sa">SA</option>
                  <option value="asociacionCivilSinFinesLucro">Asociación Civil Sin Fines de Lucro</option>
                  <option value="trabajoDomestico">Trabajo Doméstico</option>
                  <option value="rural">Rural</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Segmento Principal</label>
                <select
                  value={formData.segmento_principal || ''}
                  onChange={(e) => setFormData({ ...formData, segmento_principal: e.target.value || null })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                >
                  <option value="">Seleccionar...</option>
                  <option value="Agropecuario">Agropecuario</option>
                  <option value="Asoc. Civil">Asoc. Civil</option>
                  <option value="Comercio mayorista y distribución">Comercio mayorista y distribución</option>
                  <option value="Comercio Minorista">Comercio Minorista</option>
                  <option value="Industria y producción">Industria y producción</option>
                  <option value="Servicios empresariales">Servicios empresariales</option>
                  <option value="Servicios personales">Servicios personales</option>
                  <option value="Socio Colaborador">Socio Colaborador</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Descripción</label>
              <textarea
                value={formData.descripcion || ''}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                rows={3}
              />
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

