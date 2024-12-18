'use client';
import Image from 'next/image';
import { useCartStore } from '@/store';
import { useEffect, useState } from 'react';
import { currencyFormat } from '@/utils';

export const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className='flex mb-5'>
          <Image
            src={`/products/${product.image}`}
            width={100}
            height={100}
            style={{ width: '100px', height: '100' }}
            alt={product.title}
            className='mr-5 rounded'
          />
          <div className=''>
            <span

            //href={`/product/${product.slug}`}
            >
              {product.size} - {product.title} {product.quantity}
            </span>

            <p className='font-bold'>
              {currencyFormat(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
