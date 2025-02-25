'use server'

import 'server-only'
import { importSPKI, SignJWT, jwtVerify } from 'jose'
import { SessionPayload } from '@/Interfaces/SessionPayload';
import { cookies } from 'next/headers'
import {ResponseDataUser} from '@/Interfaces/ResponseData'

async function getPublicKey() {
    const response = await fetch('http://localhost:5046/api/Jwt/public-key');
    const publicKeyBase64 = await response.text();
    // Ajout des retours à la ligne corrects pour le format PEM
    const pemKey = `-----BEGIN PUBLIC KEY-----\n${publicKeyBase64.match(/.{1,64}/g)?.join('\n')}\n-----END PUBLIC KEY-----`;
    return await importSPKI(pemKey, 'RS256');
}

export async function encrypt(payload: SessionPayload) {
    const publicKey = await getPublicKey();

    const jwt = new SignJWT(payload)
        .setProtectedHeader({ alg: 'RS256' })
        .setIssuedAt(Math.floor(Date.now() / 1000)) // Vérification de l'iat
        .setExpirationTime('7d');

    console.log("JWT avant signature:", jwt);

    const signedToken = await jwt.sign(publicKey);
    console.log("JWT signé:", signedToken);

    return signedToken;
}


export async function decrypt(session: string | undefined = '') {
    try {
        if (!session) {
            return null;
        }

        const publicKey = await getPublicKey();

        const { payload } = await jwtVerify(session, publicKey, {
            algorithms: ['RS256'],
        });

        return payload;
    } catch (error) {
        console.error('Erreur de déchiffrement:', error);
        throw error;
    }
}


/// Partie Admin/User:

export async function createSessionUser(response: ResponseDataUser) {
    console.log('Raw response:', JSON.stringify(response, null, 2));

    // Correction ici : utilisez `idUtilisateur` au lieu de `id`
    const Id = response?.data?.idUtilisateur;
    const token = response?.tokenJWT;

    console.log('Extracted data:', { Id, token });

    if (!Id || !token) {
        throw new Error(`Invalid session data: ${JSON.stringify(response)}`);
    }

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const cookieStore =  await cookies();

    cookieStore.set('sessionUser', token, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });

    cookieStore.set('UserId', Id.toString(), {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });

    return response;
}

export async function getSessionUser() {
    const cookieStore = await cookies();
    return {
        token: cookieStore.get('token')?.value,
        UserId: cookieStore.get('UserId')?.value
    };
}

export async function logoutUser() {
    const cookieStore = await cookies();
    cookieStore.delete('UserId');
    cookieStore.delete('sessionUser')
}
