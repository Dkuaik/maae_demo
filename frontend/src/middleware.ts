import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define las rutas públicas (que no requieren autenticación)
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/',
  '/api/webhook(.*)',
  // Agrega rutas adicionales para desarrollo
  ...(process.env.NODE_ENV === 'development' ? [
    '/home',  
    '/home/(.*)',  
    '/api/(.*)'  
  ] : [])
]);

export default clerkMiddleware(async (auth, req) => {
  // En desarrollo, permite acceso sin autenticación
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }
  // Await la función auth() para obtener la información de autenticación
  const { userId } = await auth();

  // Si la ruta no es pública y el usuario no está autenticado
  if (!isPublicRoute(req) && !userId) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', req.url);
    return NextResponse.redirect(signInUrl);
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};