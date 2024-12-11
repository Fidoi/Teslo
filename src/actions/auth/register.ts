'use server';

import prisma from '@/lib/prisma';
import bcryptjs from 'bcryptjs';

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    if (!name || !email || !password) {
      throw new Error('Todos los campos son obligatorios');
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      throw new Error('El usuario ya existe');
    }

    // Crear el usuario
    const hashedPassword = bcryptjs.hashSync(password);
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      ok: true,
      user,
      message: 'Usuario creado',
    };
  } catch (error) {
    console.log((error as Error).message || error);

    return {
      ok: false,
      message: (error as Error).message || 'No se pudo crear el usuario',
    };
  }
};
