import type { ProductCardProduct } from '@/components/catalog/ProductCard';

export const MOCK_PRODUCTS: ProductCardProduct[] = [
  {
    id: 'tf-oud-wood',
    name: 'Oud Wood',
    brand: 'Tom Ford',
    slug: 'tom-ford-oud-wood',
    sizes: [
      { id: 'full', label: 'Frasco entero', price: 450_000, isDecant: false },
      { id: 'd10', label: 'Decant 10ml', price: 28_000, isDecant: true, volume_ml: 10 },
      { id: 'd5', label: 'Decant 5ml', price: 16_000, isDecant: true, volume_ml: 5 },
    ],
  },
  {
    id: 'dior-sauvage',
    name: 'Sauvage EDT',
    brand: 'Dior',
    slug: 'dior-sauvage-edt',
    sizes: [
      { id: 'full', label: 'Frasco entero', price: 195_000, isDecant: false },
      { id: 'd10', label: 'Decant 10ml', price: 14_500, isDecant: true, volume_ml: 10 },
      { id: 'd5', label: 'Decant 5ml', price: 8_500, isDecant: true, volume_ml: 5 },
    ],
  },
  {
    id: 'creed-aventus',
    name: 'Aventus',
    brand: 'Creed',
    slug: 'creed-aventus',
    sizes: [
      { id: 'full', label: 'Frasco entero', price: 520_000, isDecant: false },
      { id: 'd10', label: 'Decant 10ml', price: 32_000, isDecant: true, volume_ml: 10 },
      { id: 'd5', label: 'Decant 5ml', price: 18_000, isDecant: true, volume_ml: 5 },
    ],
  },
  {
    id: 'chanel-bleu',
    name: 'Bleu de Chanel',
    brand: 'Chanel',
    slug: 'chanel-bleu-de-chanel',
    sizes: [
      { id: 'full', label: 'Frasco entero', price: 210_000, isDecant: false },
      { id: 'd10', label: 'Decant 10ml', price: 15_800, isDecant: true, volume_ml: 10 },
      { id: 'd5', label: 'Decant 5ml', price: 9_200, isDecant: true, volume_ml: 5 },
    ],
  },
  {
    id: 'ysl-la-nuit',
    name: "La Nuit de L'Homme",
    brand: 'Yves Saint Laurent',
    slug: 'ysl-la-nuit-de-lhomme',
    sizes: [
      { id: 'full', label: 'Frasco entero', price: 175_000, isDecant: false },
      { id: 'd10', label: 'Decant 10ml', price: 13_200, isDecant: true, volume_ml: 10 },
      { id: 'd5', label: 'Decant 5ml', price: 7_800, isDecant: true, volume_ml: 5 },
    ],
  },
  {
    id: 'mmm-replica',
    name: 'By the Fireplace',
    brand: 'Maison Margiela',
    slug: 'maison-margiela-by-the-fireplace',
    sizes: [
      { id: 'full', label: 'Frasco entero', price: 188_000, isDecant: false },
      { id: 'd10', label: 'Decant 10ml', price: 14_000, isDecant: true, volume_ml: 10 },
      { id: 'd5', label: 'Decant 5ml', price: 8_200, isDecant: true, volume_ml: 5 },
    ],
  },
];
