import { cookies } from 'next/headers';
import HeaderUser from '@/Composants/HeaderUser';
import Header from "@/Composants/Header";

const SessionHeader = async () => {
    const cookieStore = await cookies();
    const existingSessionUser = cookieStore.get('sessionUser');

    if (existingSessionUser) {
        return <HeaderUser existingSessionUser={existingSessionUser} />;

    } else {
        return <Header existingSession={null} />;
    }
};

export default SessionHeader;
