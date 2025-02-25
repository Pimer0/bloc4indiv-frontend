import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { BoutonSuppressionProps } from "@/Interfaces/BoutonSuppressionProps";
import {fetchWithSessionUser} from "@/lib/fetchWithSession";



const BoutonSuppression = ({ entityId, entityType, onDelete }: BoutonSuppressionProps) => {


    const handleSuppression = async () => {
        try {
            let endpoint;

            switch (entityType) {
                case "site":
                    endpoint = `/api/Site/${entityId}`;
                    break;
                case "service":
                    endpoint = `/api/Service/${entityId}`;
                    break;
                case "salarie":
                    endpoint = `/api/Salarie/${entityId}`;
                    break;
                default:
                    console.error("Type d'entité non reconnu");
                    return;
            }

            const response = await fetchWithSessionUser(endpoint, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Si la réponse est vide (statut 204), considérer que la suppression a réussi
            if (response === null || response.ok) {
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
