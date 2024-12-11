export const revalidate = 604000;
import { getProductBySlug } from '@/actions';
import {
  ProductMobileSlideshow,
  ProductSlideshow,
  StockLabel,
} from '@/components';
import { titleFont } from '@/config/fonts';
import { Metadata, ResolvingMetadata } from 'next';

import { notFound } from 'next/navigation';
import { AddToCart } from './ui/AddToCart';

interface Props {
  params: Promise<{ slug: string }>;
  //params: { slug: string };
}
export async function generateMetadata(
  { params }: Props,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = (await params).slug;

  // fetch data
  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  //const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      images: [`/products/${product?.images[1]}`],
    },
  };
}
export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }
  return (
    <div className='mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3'>
      {/* SlideShow */}
      <div className='col-span-1 md:col-span-2'>
        {/* Mobile*/}
        <ProductMobileSlideshow
          title={product.title}
          images={product.images}
          className='block md:hidden'
        />
        {/* Desktop */}
        <ProductSlideshow
          title={product.title}
          images={product.images}
          className='hidden md:block'
        />
      </div>
      {/* Detalles */}
      <div className='col-span-1 px-5 '>
        <StockLabel slug={product.slug} />
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className='text-lg mb-5'>${product.price}</p>
        <AddToCart product={product} />
        <h3 className='font-bold text-sm'>Descripcion</h3>
        <p className='font-light'>{product.description}</p>
      </div>
    </div>
  );
}
