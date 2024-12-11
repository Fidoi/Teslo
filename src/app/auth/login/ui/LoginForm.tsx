'use client';

import { authenticate } from '@/actions';
import clsx from 'clsx';
import Link from 'next/link';
//import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';

import { IoInformationOutline } from 'react-icons/io5';

export const LoginForm = () => {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );
  //const router = useRouter();
  useEffect(() => {
    if (errorMessage === 'Success') {
      ///router.replace('/');
      window.location.replace('/');
    }
  });

  return (
    <form action={formAction} className='flex flex-col'>
      <label htmlFor='email'>Correo electrónico</label>
      <input
        className='px-5 py-2 border bg-gray-200 rounded mb-5'
        id='email'
        type='email'
        name='email'
        required
      />
      <label htmlFor='password'>Contraseña</label>
      <input
        className='px-5 py-2 border bg-gray-200 rounded mb-5'
        id='password'
        type='password'
        name='password'
        placeholder='Enter password'
        required
      />
      <div
        className='flex h-8 items-end space-x-1'
        aria-live='polite'
        aria-atomic='true'
      >
        {errorMessage && (
          <>
            <IoInformationOutline className='h-5 w-5 text-red-500' />
            <p className='text-sm text-red-500'>{errorMessage}</p>
          </>
        )}
      </div>

      <button
        type='submit'
        className={clsx({
          'btn-primary': !isPending,
          'btn-disabled': isPending,
        })}
        disabled={isPending}
      >
        Ingresar
      </button>
      {/* divisor l ine */}
      <div className='flex items-center my-5'>
        <div className='flex-1 border-t border-gray-500'></div>
        <div className='px-2 text-gray-800'>O</div>
        <div className='flex-1 border-t border-gray-500'></div>
      </div>
      <Link href='/auth/new-account' className='btn-secondary text-center'>
        Crear una nueva cuenta
      </Link>
    </form>
  );
};
