import { NextResponse } from 'next/server';
import { decrypt } from '@/lib/session';
import type { NextRequest } from 'next/server';
import { SessionPayload } from '@/Interfaces/SessionPayload';

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Exclure les routes /user/login et /user/code
    if (pathname === '/user/login' || pathname === '/user/code') {
        return NextResponse.next();
    }

    const sessionUser = request.cookies.get('sessionUser')?.value;

    let payload: SessionPayload | null = null;
    if (sessionUser) {
        payload = await decrypt(sessionUser) as SessionPayload;
    }

    // Si l'utilisateur n'est pas connecté ou si la session est expirée
    if (!payload || new Date(payload.exp * 1000) < new Date()) {
        // Rediriger vers la page de connexion
        return NextResponse.redirect(new URL('/user/code', request.url));
    }

    // Ajouter les informations de l'utilisateur à la requête
    request.headers.set('userId', payload.userId);
    // @ts-expect-error on lui passe quand meme date
    request.headers.set('DateExp', payload.expiresAt);
    /*    request.headers.set('email', payload.email);
    request.headers.set('role', payload.role);*/

    return NextResponse.next();
}

// Appliquer le middleware à certaines routes
export const config = {
    matcher: ['/user/:path*'], // Protéger ces routes
};