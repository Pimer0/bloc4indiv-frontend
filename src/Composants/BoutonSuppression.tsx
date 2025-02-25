import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { BoutonSuppressionProps } from "@/Interfaces/BoutonSuppressionProps";

const BoutonSuppression = ({ entityId, entityType, onDelete }: BoutonSuppressionProps) => {
    const handleSuppression = async () => {
        try {
            let endpoint;

            // Déterminer l'endpoint en fonction du type d'entité
            switch(entityType) {
                case "site":
                    endpoint = `http://localhost:5046/api/Site/${entityId}`;
                    break;
                case "service":
                    endpoint = `http://localhost:5046/api/Service/${entityId}`;
                    break;
                case "salarie":
                    endpoint = `http://localhost:5046/api/Salarie/${entityId}`;
                    break;
                default:
                    console.error("Type d'entité non reconnu");
                    return;
            }

            const reponse = await fetch(endpoint, {
                method: 'DELETE',
            });

            if (reponse.ok) {
                console.log(`${entityType} supprimé avec succès`);
                onDelete(entityId); // Mettre à jour l'état après suppression
            } else {
                console.error(`Erreur lors de la suppression du ${entityType}`);
            }
        } catch (e) {
            console.error(`Erreur lors de la suppression du ${entityType}`, e);
        }
    };

    return (
        <div>
            <button onClick={handleSuppression}><MdDeleteOutline size={30} /></button>
        </div>
    );
};

export default BoutonSuppression;