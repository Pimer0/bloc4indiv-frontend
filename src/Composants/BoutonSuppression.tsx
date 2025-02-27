import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { BoutonSuppressionProps } from "@/Interfaces/BoutonSuppressionProps";
import { fetchWithSessionUser } from "@/lib/fetchWithSession";

const BoutonSuppression = ({ entityId, entityType, onDelete }: BoutonSuppressionProps) => {
    const [error, setError] = useState<string | null>(null);
    const [showError, setShowError] = useState<boolean>(false);

    const handleSuppression = async () => {
        try {
            setError(null);
            setShowError(false);

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

            // Au lieu d'utiliser l'API standard, nous allons capturer les erreurs directement
            // car fetchWithSessionUser lance déjà des exceptions avec le message d'erreur
            await fetchWithSessionUser(endpoint, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Si nous arrivons ici, c'est que la suppression a réussi
            console.log(`${entityType} supprimé avec succès`);
            onDelete(entityId); // Mettre à jour l'état après suppression

        } catch (e) {
            console.error(`Erreur lors de la suppression du ${entityType}`, e);

            // Récupérer le message d'erreur (e sera une Error avec le message du serveur)
            const errorMessage = e instanceof Error ? e.message : "Erreur inconnue";
            setError(errorMessage);

            setShowError(true);
            setTimeout(() => setShowError(false), 5000);
        }
    };

    return (
        <div className="relative">
            <button onClick={handleSuppression} aria-label={`Supprimer ${entityType}`}>
                <MdDeleteOutline size={30} />
            </button>

            {showError && error && (
                <div className="absolute z-50 -top-2 left-10 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md shadow-md w-64 text-sm">
                    {error}
                </div>
            )}
        </div>
    );
};

export default BoutonSuppression;