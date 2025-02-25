'use client';

import InfoBulle from "@/Composants/infoBulle";
import Bouton from "@/Composants/Bouton";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from 'next/navigation';
import EncartForm from "@/Composants/EncartForm";
import { ValidationErrors } from "@/Interfaces/ValidationsErrors";
import {fetchWithSessionUser} from "@/lib/fetchWithSession";

export default function ModificationSalarie() {
    const router = useRouter();
    const params = useParams(); // Récupère les paramètres dynamiques
    const [errors] = useState<ValidationErrors>({});
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        telFixe: '',
        telPortable: '',
        idService: 0,
        idSite: 0,
    });

    // Récupérer le `slug` (ID du salarié) depuis les paramètres de l'URL
    useEffect(() => {
        if (params.slug) {
            const salarieId = parseInt(params.slug as string, 10);

            // Charger les données du salarié
            const fetchSalarie = async () => {
                try {
                    const response = await fetch(`http://localhost:5046/api/Salarie/${salarieId}`);
                    const data = await response.json();
                    if (data.success) {
                        setFormData({
                            nom: data.data.nom,
                            prenom: data.data.prenom,
                            email: data.data.email,
                            telFixe: data.data.telFixe,
                            telPortable: data.data.telPortable,
                            idService: data.data.idService,
                            idSite: data.data.idSite,
                        });
                    }
                } catch (error) {
                    console.error("Erreur lors de la récupération des données du salarié", error);
                }
            };

            fetchSalarie();
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
            const salarieId = parseInt(params.slug as string, 10);
            const response = await fetchWithSessionUser(`/api/Salarie/${salarieId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Envoie uniquement les champs attendus
            });

            // Si la réponse est vide (statut 204), considérer que la suppression a réussi
            if (response === null || response.ok) {
                setSuccess(true);
                console.log("Salarié modifié avec succès");
                router.push("/user/gestion-salarie");
            } else {
                console.error("Erreur lors de la modification");
            }
        } catch (error) {
            console.error("Erreur lors de la modification", error);
        }
    };

    return (
        <EncartForm titre={"Modifiez un salarié"}>
            <form onSubmit={handleSubmit}>
                <div className={"flex flex-col"}>
                    <label htmlFor="nom">Nom</label>
                    <input
                        type="text"
                        name="nom"
                        id="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                    />
                    {errors.errors?.nom && (
                        <InfoBulle
                            colorClass={"bg-[#FECACA] text-[#450A0A] border-[#450A0A]"}
                            content={errors.errors?.nom[0]}
                        />
                    )}
                </div>
                <div className={"flex flex-col"}>
                    <label htmlFor="prenom">Prénom</label>
                    <input
                        type="text"
                        name="prenom"
                        id="prenom"
                        value={formData.prenom}
                        onChange={handleChange}
                        required
                    />
                    {errors.errors?.prenom && (
                        <InfoBulle
                            colorClass={"bg-[#FECACA] text-[#450A0A] border-[#450A0A]"}
                            content={errors.errors?.prenom[0]}
                        />
                    )}
                </div>
                <div className={"flex flex-col"}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.errors?.email && (
                        <InfoBulle
                            colorClass={"bg-[#FECACA] text-[#450A0A] border-[#450A0A]"}
                            content={errors.errors?.email[0]}
                        />
                    )}
                </div>
                <div className={"flex flex-col"}>
                    <label htmlFor="telFixe">Téléphone Fixe</label>
                    <input
                        type="tel"
                        name="telFixe"
                        id="telFixe"
                        value={formData.telFixe}
                        onChange={handleChange}
                    />
                    {errors.errors?.telFixe && (
                        <InfoBulle
                            colorClass={"bg-[#FECACA] text-[#450A0A] border-[#450A0A]"}
                            content={errors.errors?.telFixe[0]}
                        />
                    )}
                </div>
                <div className={"flex flex-col"}>
                    <label htmlFor="telPortable">Téléphone Portable</label>
                    <input
                        type="tel"
                        name="telPortable"
                        id="telPortable"
                        value={formData.telPortable}
                        onChange={handleChange}
                    />
                    {errors.errors?.telPortable && (
                        <InfoBulle
                            colorClass={"bg-[#FECACA] text-[#450A0A] border-[#450A0A]"}
                            content={errors.errors?.telPortable[0]}
                        />
                    )}
                </div>
                <div className={"flex flex-col"}>
                    <label htmlFor="idService">ID Service</label>
                    <input
                        type="number"
                        name="idService"
                        id="idService"
                        value={formData.idService}
                        onChange={handleChange}
                        required
                    />
                    {errors.errors?.idService && (
                        <InfoBulle
                            colorClass={"bg-[#FECACA] text-[#450A0A] border-[#450A0A]"}
                            content={errors.errors?.idService[0]}
                        />
                    )}
                </div>
                <div className={"flex flex-col"}>
                    <label htmlFor="idSite">ID Site</label>
                    <input
                        type="number"
                        name="idSite"
                        id="idSite"
                        value={formData.idSite}
                        onChange={handleChange}
                        required
                    />
                    {errors.errors?.idSite && (
                        <InfoBulle
                            colorClass={"bg-[#FECACA] text-[#450A0A] border-[#450A0A]"}
                            content={errors.errors?.idSite[0]}
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