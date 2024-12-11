export const revalidate = 60; /// 60 Segundos

import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';
import { redirect } from 'next/navigation';

//const products = initialData.products;
interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: Props) {
  const page = (await searchParams).page
    ? Number((await searchParams).page)
    : 1;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({ page });

  //console.log({ currentPage, totalPages });
  if (products.length === 0) {
    redirect('/');
  }

  return (
    <>
      <Title title='Tienda' subtitle='Todos los productos' className='mb-2' />

      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
