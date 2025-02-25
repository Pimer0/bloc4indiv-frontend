'use client';

import InfoBulle from "@/Composants/infoBulle";
import Bouton from "@/Composants/Bouton";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from 'next/navigation';
import EncartForm from "@/Composants/EncartForm";
import { ValidationErrors } from "@/Interfaces/ValidationsErrors";
import { fetchWithSessionUser } from "@/lib/fetchWithSession";

export default function ModificationSite() {
    const router = useRouter();
    const params = useParams(); // Récupère les paramètres dynamiques
    const [errors] = useState<ValidationErrors>({});
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        idSite: 0,
        ville: '',
    });

    // Récupérer le `slug` (ID du site) depuis les paramètres de l'URL
    useEffect(() => {
        if (params.slug) {
            const siteId = parseInt(params.slug as string, 10);

            // Charger les données du site
            const fetchSite = async () => {
                try {
                    const response = await fetch(`http://localhost:5046/api/Site/${siteId}`);
                    const data = await response.json();
                    if (data.success) {
                        setFormData({
                            idSite: data.data.idSite,
                            ville: data.data.ville,
                        });
                    }
                } catch (error) {
                    console.error("Erreur lors de la récupération des données du site", error);
                }
            };

            fetchSite();
        }
    }, [params.slug]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const siteId = parseInt(params.slug as string, 10);
            const response = await fetchWithSessionUser(`/api/Site/${siteId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idSite: formData.idSite,
                    ville: formData.ville,
                }), // Envoie uniquement les champs attendus
            });

            // Si la réponse est vide (statut 204), considérer que la modification a réussi
            if (response === null || response.ok) {
                setSuccess(true);
                console.log("Site modifié avec succès");
                router.push("/user/gestion-site");
            } else {
                console.error("Erreur lors de la modification");
            }
        } catch (error) {
            console.error("Erreur lors de la modification", error);
        }
    };

    return (
        <EncartForm titre={"Modifiez un site"}>
            <form onSubmit={handleSubmit}>
                <div className={"flex flex-col"}>
                    <label htmlFor="idSite">ID Site</label>
                    <input
                        type="number"
                        name="idSite"
                        id="idSite"
                        value={formData.idSite}
                        onChange={handleChange}
                        required
                        disabled // L'ID du site ne peut pas être modifié
                    />
                    {errors.errors?.idSite && (
                        <InfoBulle
                            colorClass={"bg-[#FECACA] text-[#450A0A] border-[#450A0A]"}
                            content={errors.errors?.idSite[0]}
                        />
                    )}
                </div>
                <div className={"flex flex-col"}>
                    <label htmlFor="ville">Ville</label>
                    <input
                        type="text"
                        name="ville"
                        id="ville"
                        value={formData.ville}
                        onChange={handleChange}
                        required
                    />
                    {errors.errors?.ville && (
                        <InfoBulle
                            colorClass={"bg-[#FECACA] text-[#450A0A] border-[#450A0A]"}
                            content={errors.errors?.ville[0]}
                        />
                    )}
                </div>
                <div className={"flex flex-row justify-center gap-4 mt-8"}>
                    <Bouton
                        text={"Retour"}
                        onClick={() => router.back()}
                    />
                    <Bouton
                        text={"Modifier"}
                        colorClass={"bg-[#1E4147] text-white"}
                        hoverColorClass={"hover:bg-white hover:text-[#1E4147]"}
                        customType={"submit"}
                    />
                </div>
            </form>
            {success && (
                <InfoBulle
                    colorClass={"bg-[#DCFCE7] border-[#022C22]"}
                    content={"Données modifiées avec succès !"}
                />
            )}
        </EncartForm>
    );
}