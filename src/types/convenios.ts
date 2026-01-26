export interface Convenio {
  id: string;
  nombre: string;
  categoria?: string | null;
  logo?: string | null;
  activo: boolean;
  beneficios?: string[] | null;
  alcance?: string | null;
  contacto_nombre?: string | null;
  contacto_email?: string | null;
  contacto_telefono?: string | null;
  fecha_inicio?: string | null;
  fecha_fin?: string | null;
  creado_en: string;
  actualizado_en: string;
}
