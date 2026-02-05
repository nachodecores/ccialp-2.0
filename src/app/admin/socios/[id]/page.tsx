'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Socio, Beneficiario, CarneQR } from '@/types/socios';
import Link from 'next/link';

export default function SocioDetalle() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [socio, setSocio] = useState<Socio | null>(null);
  const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([]);
  const [carnes, setCarnes] = useState<CarneQR[]>([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState<Partial<Socio>>({});

  // Cargar datos del socio
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);

        // Cargar socio
        const responseSocio = await fetch(`/api/socios/${id}`);
        if (!responseSocio.ok) throw new Error('Error al cargar el socio');
        const dataSocio = await responseSocio.json();
        setSocio(dataSocio.data);
        setFormData(dataSocio.data);

        // TODO: Cargar beneficiarios y carnés cuando tengamos esas APIs
        // Por ahora solo cargamos el socio
      } catch (err) {
        console.error('Error:', err);
        alert('Error al cargar los datos del socio');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      cargarDatos();
    }
  }, [id]);

  // Guardar cambios
  const handleGuardar = async () => {
    try {
      const response = await fetch(`/api/socios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al actualizar el socio');
      }

      const data = await response.json();
      setSocio(data.data);
      setEditando(false);
      alert('Socio actualizado correctamente');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al actualizar el socio');
      console.error('Error:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-4 md:p-6" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-4xl mx-auto">
          <p style={{ fontFamily: 'Inter, sans-serif' }}>Cargando...</p>
        </div>
      </div>
    );
  }

  if (!socio) {
    return (
      <div className="min-h-screen p-4 md:p-6" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-4xl mx-auto">
          <p style={{ fontFamily: 'Inter, sans-serif' }}>Socio no encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/admin/socios"
            className="text-sm text-gray-600 hover:text-gray-800 mb-4 inline-block"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            ← Volver a lista de socios
          </Link>
          <div className="flex justify-between items-center">
            <h1
              className="text-3xl font-bold"
              style={{ fontFamily: 'Kanit, sans-serif', color: '#0F3439' }}
            >
              Socio #{socio.numero_socio} - {socio.nombre} {socio.apellido || ''}
            </h1>
            {!editando ? (
              <button
                onClick={() => setEditando(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
              >
                Editar
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditando(false);
                    setFormData(socio);
                  }}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleGuardar}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold"
                >
                  Guardar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Información del socio */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-5 mb-4">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ fontFamily: 'Kanit, sans-serif', color: '#0F3439' }}
          >
            Información Personal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CampoEditable
              label="Nombre"
              value={editando ? formData.nombre : socio.nombre}
              editando={editando}
              onChange={(value) => setFormData({ ...formData, nombre: value })}
            />
            <CampoEditable
              label="Apellido"
              value={editando ? formData.apellido : socio.apellido}
              editando={editando}
              onChange={(value) => setFormData({ ...formData, apellido: value })}
            />
            <CampoEditable
              label="RUT/CI"
              value={editando ? formData.rut : socio.rut}
              editando={editando}
              onChange={(value) => setFormData({ ...formData, rut: value })}
            />
            <CampoEditable
              label="Tipo de Socio"
              value={editando ? formData.tipo_socio : socio.tipo_socio}
              editando={editando}
              tipo="select"
              opciones={[
                { value: '', label: 'Seleccionar...' },
                { value: 'gremial', label: 'Gremial' },
                { value: 'gestoria', label: 'Con Gestoría' },
              ]}
              onChange={(value) => setFormData({ ...formData, tipo_socio: (value === 'gremial' || value === 'gestoria') ? value : null })}
            />
            <CampoEditable
              label="Email"
              value={editando ? formData.email : socio.email}
              editando={editando}
              onChange={(value) => setFormData({ ...formData, email: value })}
            />
            <CampoEditable
              label="Celular"
              value={editando ? formData.celular : socio.celular}
              editando={editando}
              onChange={(value) => setFormData({ ...formData, celular: value })}
            />
            <CampoEditable
              label="Teléfono"
              value={editando ? formData.telefono : socio.telefono}
              editando={editando}
              onChange={(value) => setFormData({ ...formData, telefono: value })}
            />
            <CampoEditable
              label="Al Día Cuota"
              value={editando ? (formData.al_dia_cuota ? 'true' : 'false') : (socio.al_dia_cuota ? 'true' : 'false')}
              editando={editando}
              tipo="select"
              opciones={[
                { value: 'false', label: 'No al día (Inactivo)' },
                { value: 'true', label: 'Al día (Activo)' },
              ]}
              onChange={(value) => setFormData({ ...formData, al_dia_cuota: value === 'true' })}
            />
          </div>
        </div>

        {/* Información de la empresa */}
        {(socio.razon_social || socio.nombre_fantasia) && (
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-5 mb-4">
            <h2
              className="text-xl font-semibold mb-4"
              style={{ fontFamily: 'Kanit, sans-serif', color: '#0F3439' }}
            >
              Información de la Empresa
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CampoEditable
                label="Razón Social"
                value={editando ? formData.razon_social : socio.razon_social}
                editando={editando}
                onChange={(value) => setFormData({ ...formData, razon_social: value })}
              />
              <CampoEditable
                label="Nombre Fantasía"
                value={editando ? formData.nombre_fantasia : socio.nombre_fantasia}
                editando={editando}
                onChange={(value) => setFormData({ ...formData, nombre_fantasia: value })}
              />
              <CampoEditable
                label="Forma Jurídica"
                value={editando ? formData.forma_juridica : socio.forma_juridica}
                editando={editando}
                onChange={(value) => setFormData({ ...formData, forma_juridica: value })}
              />
              <CampoEditable
                label="Segmento Principal"
                value={editando ? formData.segmento_principal : socio.segmento_principal}
                editando={editando}
                onChange={(value) => setFormData({ ...formData, segmento_principal: value })}
              />
            </div>
          </div>
        )}

        {/* Dirección */}
        {(socio.calle || socio.ciudad) && (
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-5 mb-4">
            <h2
              className="text-xl font-semibold mb-4"
              style={{ fontFamily: 'Kanit, sans-serif', color: '#0F3439' }}
            >
              Dirección
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CampoEditable
                label="Calle"
                value={editando ? formData.calle : socio.calle}
                editando={editando}
                onChange={(value) => setFormData({ ...formData, calle: value })}
              />
              <CampoEditable
                label="Número"
                value={editando ? formData.numero : socio.numero}
                editando={editando}
                onChange={(value) => setFormData({ ...formData, numero: value })}
              />
              <CampoEditable
                label="Depto"
                value={editando ? formData.depto : socio.depto}
                editando={editando}
                onChange={(value) => setFormData({ ...formData, depto: value })}
              />
              <CampoEditable
                label="Ciudad"
                value={editando ? formData.ciudad : socio.ciudad}
                editando={editando}
                onChange={(value) => setFormData({ ...formData, ciudad: value })}
              />
              <CampoEditable
                label="Observaciones"
                value={editando ? formData.observaciones_direccion : socio.observaciones_direccion}
                editando={editando}
                tipo="textarea"
                onChange={(value) => setFormData({ ...formData, observaciones_direccion: value })}
              />
            </div>
          </div>
        )}

        {/* Información de pago */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-5 mb-4">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ fontFamily: 'Kanit, sans-serif', color: '#0F3439' }}
          >
            Información de Pago
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CampoEditable
              label="Forma de Pago"
              value={editando ? formData.forma_pago : socio.forma_pago}
              editando={editando}
              onChange={(value) => setFormData({ ...formData, forma_pago: value })}
            />
            <CampoEditable
              label="Frecuencia de Pago"
              value={editando ? formData.frecuencia_pago : socio.frecuencia_pago}
              editando={editando}
              onChange={(value) => setFormData({ ...formData, frecuencia_pago: value })}
            />
            <CampoEditable
              label="Cuota Mensual"
              value={editando ? (formData.cuota_mensual?.toString() || '') : (socio.cuota_mensual?.toString() || '')}
              editando={editando}
              tipo="number"
              onChange={(value) => setFormData({ ...formData, cuota_mensual: value ? parseFloat(value) : null })}
            />
            <CampoEditable
              label="Al Día Cuota"
              value={editando ? (formData.al_dia_cuota ? 'true' : 'false') : (socio.al_dia_cuota ? 'true' : 'false')}
              editando={editando}
              tipo="select"
              opciones={[
                { value: 'false', label: 'No al día (Inactivo)' },
                { value: 'true', label: 'Al día (Activo)' },
              ]}
              onChange={(value) => setFormData({ ...formData, al_dia_cuota: value === 'true' })}
            />
          </div>
        </div>

        {/* Beneficiarios y Carnés */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-5 mb-4">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ fontFamily: 'Kanit, sans-serif', color: '#0F3439' }}
          >
            Beneficiarios y Carnés QR
          </h2>
          <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            Funcionalidad en desarrollo. Aquí se podrán gestionar beneficiarios y generar carnés QR.
          </p>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold"
            disabled
          >
            Generar Carné Principal
          </button>
        </div>
      </div>
    </div>
  );
}

// Componente para campos editables
function CampoEditable({
  label,
  value,
  editando,
  tipo = 'text',
  opciones,
  onChange,
}: {
  label: string;
  value: string | null | undefined;
  editando: boolean;
  tipo?: 'text' | 'textarea' | 'select' | 'number';
  opciones?: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  const displayValue = value || '-';

  if (!editando) {
    return (
      <div>
        <label className="block text-xs text-gray-600 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
          {label}
        </label>
        <p className="text-sm text-gray-800" style={{ fontFamily: 'Inter, sans-serif' }}>
          {displayValue}
        </p>
      </div>
    );
  }

  if (tipo === 'select' && opciones) {
    return (
      <div>
        <label className="block text-xs text-gray-600 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
          {label}
        </label>
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
        >
          {opciones.map((opcion) => (
            <option key={opcion.value} value={opcion.value}>
              {opcion.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (tipo === 'textarea') {
    return (
      <div className="md:col-span-2">
        <label className="block text-xs text-gray-600 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
          {label}
        </label>
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
          rows={3}
        />
      </div>
    );
  }

  return (
    <div>
      <label className="block text-xs text-gray-600 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
        {label}
      </label>
      <input
        type={tipo}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
      />
    </div>
  );
}

