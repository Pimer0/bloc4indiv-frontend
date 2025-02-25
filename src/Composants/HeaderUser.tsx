import { liensHeaderUser } from "@/Utils/liensHeader";
import Link from "next/link";
import ButtonDeconnexion from "@/Composants/ButtonDeconnexion";
import { FaRegUser } from "react-icons/fa";
import {RequestCookie} from "next/dist/compiled/@edge-runtime/cookies";


const HeaderUser: React.FC<{ existingSessionUser: RequestCookie, style?: string }> = ({ existingSessionUser, style = 'flex row text-[#1E4147] active:underline active:underline-offset-4 focus:underline focus:underline-offset-4 hover:underline hover:underline-offset-4' }) => {
    return (
        <header className={'flex items-center justify-between p-4'}>
            <div className={'flex-grow flex justify-center gap-5'}>
                {liensHeaderUser.map((lien, index) => (
                    <Link className={style} key={index} href={lien.pathname}>
                        {lien.text}
                    </Link>
                ))}
                {existingSessionUser && <ButtonDeconnexion />}
            </div>
            <div className={'flex justify-center gap-5'}>
                <Link className={style} href={'/user/compte'}>
                    <FaRegUser color={'#1E4147'} style={{ marginRight: '0.5rem' }} />
                    Compte
                </Link>
            </div>
        </header>
    );
};

export default HeaderUser;
