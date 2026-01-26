export interface Socio {
  id: string;
  numero_socio: number;
  rut: string;
  razon_social?: string | null;
  nombre_fantasia?: string | null;
  slug?: string | null;
  forma_juridica?: string | null;
  descripcion?: string | null;
  segmento_principal?: string | null;
  tipo_socio?: 'gremial' | 'gestoria' | null;
  nombre: string;
  apellido?: string | null;
  celular?: string | null;
  telefono?: string | null;
  email?: string | null;
  calle?: string | null;
  numero?: string | null;
  depto?: string | null;
  ciudad?: string | null;
  observaciones_direccion?: string | null;
  forma_pago?: string | null;
  frecuencia_pago?: string | null;
  cuota_mensual?: number | null;
  al_dia_cuota: boolean;
  cliente_cpy: boolean;
  adherido_dia_piedras: boolean;
  fecha_alta: string;
  creado_en: string;
  actualizado_en: string;
}

export interface Beneficiario {
  id: string;
  socio_id: string;
  cedula: string;
  nombre: string;
  apellido?: string | null;
  relacion?: string | null;
  activo: boolean;
  creado_en: string;
  actualizado_en: string;
}

export interface CarneQR {
  id: string;
  socio_id: string;
  beneficiario_id?: string | null;
  cedula: string;
  tipo: 'socio' | 'beneficiario';
  token: string;
  activo: boolean;
  creado_en: string;
  actualizado_en: string;
}

