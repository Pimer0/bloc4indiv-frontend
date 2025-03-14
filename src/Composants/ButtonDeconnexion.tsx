'use client';

import Link from 'next/link';
import { logoutUser } from "@/lib/session";
import { useSession } from "@/context/SessionProvider";
import {useRouter} from "next/navigation";

export default function ButtonDeconnexion() {
    const existingSessionUser = useSession();
    const router = useRouter();

    console.log(existingSessionUser);
    
    const handleDeco = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();

        try {
            if (existingSessionUser?.UserId) {
                await logoutUser();
                router.push("/");
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Link href={'/'} onClick={handleDeco}>Deconnexion</Link>
    );
}
