'use client';

import InfoBulle from "@/Composants/infoBulle";
import Bouton from "@/Composants/Bouton";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from 'next/navigation';
import EncartForm from "@/Composants/EncartForm";
import { ValidationErrors } from "@/Interfaces/ValidationsErrors";
import { fetchWithSessionUser } from "@/lib/fetchWithSession";

export default function ModificationService() {
    const router = useRouter();
    const params = useParams(); // Récupère les paramètres dynamiques
    const [errors] = useState<ValidationErrors>({});
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        idService: 0,
        nomService: '',
    });

    // Récupérer le `slug` (ID du service) depuis les paramètres de l'URL
    useEffect(() => {
        if (params.slug) {
            const serviceId = parseInt(params.slug as string, 10);

            // Charger les données du service
            const fetchService = async () => {
                try {
                    const response = await fetch(`http://localhost:5046/api/Service/${serviceId}`);
                    const data = await response.json();
                    if (data.success) {
                        setFormData({
                            idService: data.data.idService,
                            nomService: data.data.nomService,
                        });
                    }
                } catch (error) {
                    console.error("Erreur lors de la récupération des données du service", error);
                }
            };

            fetchService();
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
            const serviceId = parseInt(params.slug as string, 10);
            const response = await fetchWithSessionUser(`/api/Service/${serviceId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idService: formData.idService,
                    nomService: formData.nomService,
                }), // Envoie uniquement les champs attendus
            });

            // Si la réponse est vide (statut 204), considérer que la modification a réussi
            if (response === null || response.ok) {
                setSuccess(true);
                console.log("Service modifié avec succès");
                router.push("/user/gestion-service");
            } else {
                console.error("Erreur lors de la modification");
            }
        } catch (error) {
            console.error("Erreur lors de la modification", error);
        }
    };

    return (
        <EncartForm titre={"Modifiez un service"}>
            <form onSubmit={handleSubmit}>
                <div className={"flex flex-col"}>
                    <label htmlFor="idService">ID Service</label>
                    <input
                        type="number"
                        name="idService"
                        id="idService"
                        value={formData.idService}
                        onChange={handleChange}
                        required
                        disabled // L'ID du service ne peut pas être modifié
                    />
                    {errors.errors?.idService && (
                        <InfoBulle
                            colorClass={"bg-[#FECACA] text-[#450A0A] border-[#450A0A]"}
                            content={errors.errors?.idService[0]}
                        />
                    )}
                </div>
                <div className={"flex flex-col"}>
                    <label htmlFor="nomService">Nom du Service</label>
                    <input
                        type="text"
                        name="nomService"
                        id="nomService"
                        value={formData.nomService}
                        onChange={handleChange}
                        required
                    />
                    {errors.errors?.nomService && (
                        <InfoBulle
                            colorClass={"bg-[#FECACA] text-[#450A0A] border-[#450A0A]"}
                            content={errors.errors?.nomService[0]}
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