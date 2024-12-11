# Descripcion

## Correr en dev

1. Clonar el repositorio.
2. Crear una copia del `.env.template` y renombralo a `.env` y cambiar las variables de entorno
3. Instalar dependencias `npm install `
4. Levantar la base de datos `docker compose up -d`
5. Correr las migraciones de Prisma `npx prisma migrate dev `
6. Jecutar seed `npm run dev`
7. Correr el proyecto `npm run dev`
8. Limpíar el localStorage del navegador.
