import type { ProductCardProduct, ProductSizeOption } from '@/components/catalog/ProductCard';
import { getSupabase } from '@/lib/supabaseClient';

let loggedSupabaseProductCount = false;

function hasSupabaseEnv(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
  );
}

/** Fila esperada de la tabla `productos` (sin columna slug: se genera en el cliente). */
export type ProductoRow = {
  id: string;
  precio_full: number | null;
  precio_10ml: number | null;
  precio_5ml: number | null;
  /** Si existe, debe ser `arab` para vender online; diseñador va por WhatsApp. */
  categoria?: string | null;
  nombre?: string | null;
  marca?: string | null;
  tipo?: string | null;
  imagen?: string | null;
  name?: string | null;
  brand?: string | null;
  type?: string | null;
  image?: string | null;
  image_url?: string | null;
};

function pickStr(row: Record<string, unknown>, keys: string[]): string {
  for (const k of keys) {
    const v = row[k];
    if (v !== null && v !== undefined && String(v).trim() !== '') {
      return String(v).trim();
    }
  }
  return '';
}

/** Slug de URL derivado solo del nombre (no hay columna slug en la base). */
export function slugFromNombre(nombre: string): string {
  return nombre
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizeTipo(raw: unknown): 'designer' | 'arab' {
  const v = String(raw ?? '').toLowerCase();
  if (v === 'arab' || v === 'árabe' || v === 'arabe') return 'arab';
  return 'designer';
}

/**
 * Prioriza columnas `categoria` / `category` (valor esperado: arab, etc.)
 * y cae en `tipo` / `type` si no hay categoría explícita.
 */
function resolveProductType(row: Record<string, unknown>): 'designer' | 'arab' {
  const cat = pickStr(row, ['categoria', 'category']).toLowerCase();
  if (cat === 'arab' || cat === 'árabe' || cat === 'arabe') return 'arab';
  if (
    cat === 'designer' ||
    cat === 'diseñador' ||
    cat === 'disenador' ||
    cat === 'design'
  ) {
    return 'designer';
  }
  return normalizeTipo(row['tipo'] ?? row['type']);
}

function buildSizes(row: ProductoRow): ProductSizeOption[] {
  const sizes: ProductSizeOption[] = [];
  if (row.precio_full != null && !Number.isNaN(Number(row.precio_full))) {
    sizes.push({
      id: 'full',
      label: 'Frasco entero',
      price: Number(row.precio_full),
      isDecant: false,
    });
  }
  if (row.precio_10ml != null && !Number.isNaN(Number(row.precio_10ml))) {
    sizes.push({
      id: 'd10',
      label: 'Decant 10ml',
      price: Number(row.precio_10ml),
      isDecant: true,
      volume_ml: 10,
    });
  }
  if (row.precio_5ml != null && !Number.isNaN(Number(row.precio_5ml))) {
    sizes.push({
      id: 'd5',
      label: 'Decant 5ml',
      price: Number(row.precio_5ml),
      isDecant: true,
      volume_ml: 5,
    });
  }
  return sizes;
}

export function mapProductoRowToProduct(row: ProductoRow): ProductCardProduct {
  const r = row as unknown as Record<string, unknown>;
  const name = pickStr(r, ['nombre', 'name']);
  let slug = name.length > 0 ? slugFromNombre(name) : '';
  if (!slug) slug = String(row.id);
  const displayName = name || slug;
  const brand = pickStr(r, ['marca', 'brand']) || '—';
  const imageRaw = pickStr(r, ['imagen', 'image', 'image_url']);
  return {
    id: String(row.id),
    slug,
    name: displayName,
    brand,
    type: resolveProductType(r),
    image: imageRaw || undefined,
    sizes: buildSizes(row),
  };
}

export async function getProducts(): Promise<ProductCardProduct[]> {
  if (!hasSupabaseEnv()) {
    return [];
  }

  const { data, error } = await getSupabase().from('productos').select('*');

  if (error) {
    console.error('[getProducts]', error.message);
    throw error;
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('Productos cargados de Supabase:', data?.length ?? 0);
  } else if (!loggedSupabaseProductCount) {
    loggedSupabaseProductCount = true;
    console.log('Productos cargados de Supabase:', data?.length ?? 0);
  }

  const rows = (data ?? []) as ProductoRow[];
  return rows
    .filter(
      (row) =>
        resolveProductType(row as unknown as Record<string, unknown>) === 'arab'
    )
    .map((row) => mapProductoRowToProduct(row))
    .filter((p) => p.sizes.length > 0 && p.slug.length > 0);
}

/** Máximo de filas por carrusel en el home (evita cargar todo el catálogo). */
const HOME_CAROUSEL_LIMIT = 10;

/**
 * Productos para carruseles del home: mismo criterio árabe que `getProducts`,
 * con `limit` en Supabase y orden por `id`.
 */
export async function getHomeCarouselProducts(
  order: 'asc' | 'desc'
): Promise<ProductCardProduct[]> {
  if (!hasSupabaseEnv()) {
    return [];
  }

  const { data, error } = await getSupabase()
    .from('productos')
    .select('*')
    .eq('categoria', 'arab')
    .order('id', { ascending: order === 'asc' })
    .limit(HOME_CAROUSEL_LIMIT);

  if (error) {
    console.error('[getHomeCarouselProducts]', error.message);
    return [];
  }

  const rows = (data ?? []) as ProductoRow[];
  return rows
    .filter(
      (row) =>
        resolveProductType(row as unknown as Record<string, unknown>) === 'arab'
    )
    .map((row) => mapProductoRowToProduct(row))
    .filter((p) => p.sizes.length > 0 && p.slug.length > 0);
}

export async function getProductBySlug(
  slug: string
): Promise<ProductCardProduct | undefined> {
  if (!hasSupabaseEnv()) {
    return undefined;
  }

  let decoded = slug.trim();
  try {
    decoded = decodeURIComponent(slug).trim();
  } catch {
    /* slug literal */
  }

  const products = await getProducts();
  return products.find((p) => p.slug === decoded);
}

export function minProductPrice(product: ProductCardProduct): number {
  return Math.min(...product.sizes.map((s) => s.price));
}

export function productHasVolumeMl(
  product: ProductCardProduct,
  ml: number
): boolean {
  return product.sizes.some((s) => s.volume_ml === ml);
}

export function productMatchesPriceRange(
  product: ProductCardProduct,
  priceMin: number | null,
  priceMax: number | null
): boolean {
  if (priceMin == null && priceMax == null) return true;
  return product.sizes.some((s) => {
    const okMin = priceMin == null || s.price >= priceMin;
    const okMax = priceMax == null || s.price <= priceMax;
    return okMin && okMax;
  });
}
