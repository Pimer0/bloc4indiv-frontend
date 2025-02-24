import React from "react";
import {FaEye} from "react-icons/fa";
import { useRouter } from "next/navigation";

interface BouttonGetProps {
    entityId: number;
}

const BouttonModification = ({ entityId }: BouttonGetProps) => {
    const router = useRouter();

    const handleGet = () => {
        try {
            router.push(`/salarie/fiche-contact/${entityId}`);
        }
        catch (e) {
            console.error("Impossible de récupérer le salarié", e)
        }
    };

    return (
        <div>
            <button onClick={handleGet}><FaEye size={20}/></button>
        </div>
    );
};

export default BouttonModification;