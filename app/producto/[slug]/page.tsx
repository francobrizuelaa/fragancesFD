import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '@/lib/products';
import { ProductDetailClient } from './product-detail-client';

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}
