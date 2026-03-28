import { notFound } from 'next/navigation';
import { MOCK_PRODUCTS, getProductBySlug } from '@/lib/mockProducts';
import { ProductDetailClient } from './product-detail-client';

export function generateStaticParams() {
  return MOCK_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}
