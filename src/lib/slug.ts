/**
 * Genera un slug a partir de un texto
 * Convierte a minúsculas, elimina acentos, reemplaza espacios con guiones
 */
export function generarSlug(texto: string): string {
  if (!texto) return '';
  
  return texto
    .toLowerCase()
    .normalize('NFD') // Normaliza caracteres Unicode
    .replace(/[\u0300-\u036f]/g, '') // Elimina diacríticos (acentos)
    .replace(/[^a-z0-9\s-]/g, '') // Elimina caracteres especiales excepto espacios y guiones
    .trim()
    .replace(/\s+/g, '-') // Reemplaza espacios múltiples con un guion
    .replace(/-+/g, '-') // Reemplaza guiones múltiples con uno solo
    .replace(/^-|-$/g, ''); // Elimina guiones al inicio y final
}

/**
 * Genera un slug único verificando si ya existe en la base de datos
 */
export async function generarSlugUnico(
  texto: string,
  verificarExistencia: (slug: string) => Promise<boolean>,
  maxIntentos: number = 10
): Promise<string> {
  const slugBase = generarSlug(texto);
  
  if (!slugBase) {
    throw new Error('No se puede generar un slug vacío');
  }

  // Verificar si el slug base ya existe
  const existe = await verificarExistencia(slugBase);
  if (!existe) {
    return slugBase;
  }

  // Si existe, agregar un número al final
  for (let i = 1; i <= maxIntentos; i++) {
    const slugConNumero = `${slugBase}-${i}`;
    const existeConNumero = await verificarExistencia(slugConNumero);
    if (!existeConNumero) {
      return slugConNumero;
    }
  }

  // Si después de maxIntentos todavía no hay uno único, agregar timestamp
  return `${slugBase}-${Date.now()}`;
}
