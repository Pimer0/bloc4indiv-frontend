'use client';

import Link from 'next/link';
import { logoutUser } from "@/lib/session";
import { useSession } from "@/context/SessionProvider";

export default function ButtonDeconnexion() {
    const existingSessionUser = useSession();

    console.log(existingSessionUser);
    
    const handleDeco = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();

        try {
            if (existingSessionUser?.UserId) {
                await logoutUser();
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Link href={'/'} onClick={handleDeco}>Deconnexion</Link>
    );
}
