'use server';
import { cookies } from 'next/headers';

export const fetchWithSessionUser = async (url: string, options: RequestInit = {}) => {
    const cookieStoreUser = await cookies();
    const sessionUser = cookieStoreUser.get('sessionUser')?.value;

    const headers = {
        'Content-Type': 'application/json',
        ...(sessionUser && { Authorization: `Bearer ${sessionUser}` }), // Ajoute le token JWT si une session existe
        ...options.headers,
    };

    const response = await fetch(`http://localhost:5046${url}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        // Si la réponse n'est pas OK, essayez de lire le message d'erreur
        let errorMessage = 'Une erreur est survenue';
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } catch (error) {
            console.error("Erreur lors de la lecture de la réponse d'erreur:", error);
        }
        throw new Error(errorMessage);
    }

    if (response.status === 204) {
        return null;
    }

    // Retourne les données JSON directement
    return response.json();
};