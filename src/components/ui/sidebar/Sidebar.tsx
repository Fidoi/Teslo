'use client';
import { logout } from '@/actions';
import { useUiStore } from '@/store';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from 'react-icons/io5';

export const Sidebar = () => {
  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen);
  const closeMenu = useUiStore((state) => state.closeSideMenu);
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user.role === 'admin';
  return (
    <div className=''>
      {isSideMenuOpen && (
        <div className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30' />
      )}
      {isSideMenuOpen && (
        <div
          className='fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm'
          onClick={closeMenu}
        />
      )}

      <nav
        className={clsx(
          'fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
          { 'translate-x-full': !isSideMenuOpen }
        )}
      >
        <IoCloseOutline
          size={50}
          className='absolute top-5 right-5 cursor-pointer'
          onClick={closeMenu}
        />
        <div className='relative mt-14'>
          <IoSearchOutline size={20} className='absolute top-2 left-2' />
          <input
            type='text'
            placeholder='Buscar'
            className='w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-gray-200 focus:outline-none focus:border-blue-500'
          ></input>
          {isAuthenticated && (
            <>
              <Link
                href='/profile'
                onClick={closeMenu}
                className='flex item-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
              >
                <IoPersonOutline size={30} />
                <span className='ml-3 text-xl'>Perfil</span>
              </Link>
              <Link
                href='/orders'
                onClick={closeMenu}
                className='flex item-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
              >
                <IoTicketOutline size={30} />
                <span className='ml-3 text-xl'>Ordenes</span>
              </Link>
            </>
          )}

          {isAuthenticated && (
            <button
              onClick={() => {
                logout();
                closeMenu();
              }}
              className='flex w-full item-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            >
              <IoLogOutOutline size={30} />
              <span className='ml-3 text-xl'>Salir</span>
            </button>
          )}
          {!isAuthenticated && (
            <Link
              href='/auth/login'
              onClick={closeMenu}
              className='flex item-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            >
              <IoLogInOutline size={30} />
              <span className='ml-3 text-xl'>Ingresar</span>
            </Link>
          )}

          <div className='w-full h-px bg-gray-200 my-10' />

          {isAdmin && (
            <>
              <Link
                href='/admin/products'
                className='flex item-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
              >
                <IoShirtOutline size={30} />
                <span className='ml-3 text-xl'>Productos</span>
              </Link>
              <Link
                href='/admin/orders'
                className='flex item-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
              >
                <IoTicketOutline size={30} />
                <span className='ml-3 text-xl'>Ordenes</span>
              </Link>
              <Link
                href='/admin/users'
                className='flex item-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
              >
                <IoPeopleOutline size={30} />
                <span className='ml-3 text-xl'>Usuarios</span>
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};