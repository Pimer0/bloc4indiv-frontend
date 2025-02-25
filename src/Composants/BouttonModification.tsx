import React from "react";
import { FaPen } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface BouttonModificationProps {
    entityId: number;
    entityType: "site" | "service" | "salarie";
}

const BouttonModification = ({ entityId, entityType }: BouttonModificationProps) => {
    const router = useRouter();

    const handleModification = () => {
        // Rediriger vers la page de modification en fonction du type d'entité
        switch(entityType) {
            case "site":
                router.push(`/user/modification-site/${entityId}`);
                break;
            case "service":
                router.push(`/user/modification-service/${entityId}`);
                break;
            case "salarie":
                router.push(`/user/modification-salarie/${entityId}`);
                break;
        }
    };

    return (
        <div>
            <button onClick={handleModification}><FaPen size={20} /></button>
        </div>
    );
};

export default BouttonModification;