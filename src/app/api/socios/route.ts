import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { Socio } from '@/types/socios';
import { generarSlugUnico } from '@/lib/slug';

// GET /api/socios - Listar todos los socios (con filtros opcionales)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const estado = searchParams.get('estado'); // 'activo' | 'inactivo'
    const busqueda = searchParams.get('busqueda'); // Búsqueda por nombre, cédula, etc.
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 1000;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0;

    let query = supabaseAdmin
      .from('socios')
      .select('*')
      .order('numero_socio', { ascending: true })
      .range(offset, offset + limit - 1);

    // Filtro por estado (al_dia_cuota: true = activo, false = inactivo)
    if (estado === 'activo') {
      query = query.eq('al_dia_cuota', true);
    } else if (estado === 'inactivo') {
      query = query.eq('al_dia_cuota', false);
    }

    // Búsqueda por nombre, cédula, RUT/CI, número de socio
    if (busqueda) {
      query = query.or(
        `nombre.ilike.%${busqueda}%,apellido.ilike.%${busqueda}%,rut.ilike.%${busqueda}%,numero_socio.eq.${busqueda}`
      );
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Error al obtener socios:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Obtener el conteo total (sin límites)
    let countQuery = supabaseAdmin.from('socios').select('*', { count: 'exact', head: true });
    if (estado === 'activo') {
      countQuery = countQuery.eq('al_dia_cuota', true);
    } else if (estado === 'inactivo') {
      countQuery = countQuery.eq('al_dia_cuota', false);
    }
    if (busqueda) {
      countQuery = countQuery.or(
        `nombre.ilike.%${busqueda}%,apellido.ilike.%${busqueda}%,rut.ilike.%${busqueda}%,numero_socio.eq.${busqueda}`
      );
    }
    const { count: totalCount } = await countQuery;

    return NextResponse.json({
      data: data || [],
      total: totalCount || 0,
      limit,
      offset
    });
  } catch (error) {
    console.error('Error inesperado:', error);
    return NextResponse.json(
      { error: 'Error al obtener los socios' },
      { status: 500 }
    );
  }
}

// POST /api/socios - Crear nuevo socio
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validar campos requeridos
    if (!body.nombre || !body.rut) {
      return NextResponse.json(
        { error: 'Los campos "nombre" y "rut" son requeridos' },
        { status: 400 }
      );
    }

    // Obtener el siguiente número de socio
    const { data: ultimoSocio, error: errorUltimo } = await supabaseAdmin
      .from('socios')
      .select('numero_socio')
      .order('numero_socio', { ascending: false })
      .limit(1)
      .single();

    const siguienteNumero = ultimoSocio ? ultimoSocio.numero_socio + 1 : 1;

    // Generar slug desde nombre_fantasia (o fallback a razon_social o nombre)
    let slug: string | null = null;
    const textoParaSlug = body.nombre_fantasia || body.razon_social || `${body.nombre} ${body.apellido || ''}`.trim();
    
    if (textoParaSlug) {
      // Función para verificar si el slug ya existe
      const verificarSlug = async (slugVerificar: string): Promise<boolean> => {
        const { data } = await supabaseAdmin
          .from('socios')
          .select('id')
          .eq('slug', slugVerificar)
          .maybeSingle();
        return !!data;
      };

      slug = await generarSlugUnico(textoParaSlug, verificarSlug);
    }

    // Preparar datos del socio
    const nuevoSocio: Partial<Socio> = {
      numero_socio: siguienteNumero,
      rut: body.rut,
      nombre: body.nombre,
      apellido: body.apellido || null,
      razon_social: body.razon_social || null,
      nombre_fantasia: body.nombre_fantasia || null,
      slug: slug,
      forma_juridica: body.forma_juridica || null,
      descripcion: body.descripcion || null,
      segmento_principal: body.segmento_principal || null,
      tipo_socio: body.tipo_socio || null,
      celular: body.celular || null,
      telefono: body.telefono || null,
      email: body.email || null,
      calle: body.calle || null,
      numero: body.numero || null,
      depto: body.depto || null,
      ciudad: body.ciudad || null,
      observaciones_direccion: body.observaciones_direccion || null,
      forma_pago: body.forma_pago || null,
      frecuencia_pago: body.frecuencia_pago || null,
      cuota_mensual: body.cuota_mensual ? parseFloat(body.cuota_mensual) : null,
      al_dia_cuota: body.al_dia_cuota !== undefined ? body.al_dia_cuota : false,
      cliente_cpy: body.cliente_cpy || false,
      adherido_dia_piedras: body.adherido_dia_piedras || false,
    };

    const { data, error } = await supabaseAdmin
      .from('socios')
      .insert(nuevoSocio)
      .select()
      .single();

    if (error) {
      console.error('Error al crear socio:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error('Error inesperado:', error);
    return NextResponse.json(
      { error: 'Error al crear el socio' },
      { status: 500 }
    );
  }
}

