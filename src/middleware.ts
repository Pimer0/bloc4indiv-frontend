import { NextResponse } from 'next/server';
import { decrypt } from '@/lib/session';
import type { NextRequest } from 'next/server';
import { SessionPayload } from '@/Interfaces/SessionPayload';

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Routes toujours accessibles
    const publicRoutes = ['/user/code', '/unauthorized'];
    if (publicRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    // Vérifier si l'utilisateur a le cookie `CookieCode` pour accéder à /user/login
    if (pathname === '/user/login') {
        const hasCookieCode = request.cookies.get('CookieCode')?.value === 'true';
        if (!hasCookieCode) {
            // Rediriger vers la page de code si le cookie n'est pas présent
            return NextResponse.redirect(new URL('/user/code', request.url));
        }
        return NextResponse.next();
    }

    // Vérifier la session utilisateur pour les autres routes protégées
    const sessionUser = request.cookies.get('sessionUser')?.value;

    let payload: SessionPayload | null = null;
    if (sessionUser) {
        try {
            payload = await decrypt(sessionUser) as SessionPayload;
        } catch (error) {
            // En cas d'erreur de déchiffrement, traiter comme une session invalide
            console.error('Erreur de déchiffrement de session:', error);
            return NextResponse.redirect(new URL('/unauthorized', request.url));
        }
    }

    // Si l'utilisateur n'est pas connecté ou si la session est expirée
    if (!payload || new Date(payload.exp * 1000) < new Date()) {
        // Pour les requêtes API, renvoyer une réponse 401 au lieu de rediriger
        if (pathname.startsWith('/api/')) {
            return new NextResponse(
                JSON.stringify({ message: 'Non autorisé' }),
                {
                    status: 401,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Pour les requêtes de page, rediriger vers la page unauthorized
        return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    // Ajouter les informations de l'utilisateur à la requête
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('userId', payload.userId);
    // @ts-expect-error on lui passe quand meme date
    requestHeaders.set('DateExp', payload.expiresAt);
    /*    requestHeaders.set('email', payload.email);
    requestHeaders.set('role', payload.role);*/

    return NextResponse.next({
        request: {
            headers: requestHeaders
        }
    });
}

// Appliquer le middleware à certaines routes
export const config = {
    matcher: ['/user/:path*', '/api/:path*'], // Protéger ces routes
};