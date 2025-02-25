import Link from 'next/link';
import { FaRegUser } from 'react-icons/fa';
import ButtonDeconnexion from '@/Composants/ButtonDeconnexion';
import {RequestCookie} from "next/dist/compiled/@edge-runtime/cookies";

const Header: React.FC<{ existingSession: RequestCookie | null, style?: string }> = ({ existingSession, style = 'flex row text-[#1E4147] active:underline active:underline-offset-4 focus:underline focus:underline-offset-4 hover:underline hover:underline-offset-4' }) => {
    return (
        <header className={'flex items-center justify-between p-4'}>

            <div className={'flex justify-center gap-5'}>
                {!existingSession &&<Link className={style} href={'/user/code'}>
                    <FaRegUser color={'#1E4147'} style={{ marginRight: '0.5rem' }} />
                    Connexion
                </Link>}
                {existingSession && <ButtonDeconnexion />}
            </div>
        </header>
    );
};

export default Header;
