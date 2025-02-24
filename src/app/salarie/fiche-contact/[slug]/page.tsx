'use client';

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from 'next/navigation';
import EncartForm from "@/Composants/EncartForm";
import Bouton from "@/Composants/Bouton";

export default function ModificationSalarie() {
    const router = useRouter();
    const params = useParams(); // Récupère les paramètres dynamiques
    const [salarie, setSalarie] = useState({
        id: 0,
        nom: '',
        prenom: '',
        telFixe: '',
        telPortable: '',
        email: '',
        idService: 0,
        idSite: 0,
        ville: '',
        service: '',
    });

    // Récupérer le `slug` (ID du salarié) depuis les paramètres de l'URL
    useEffect(() => {
        if (params.slug) {
            const salarieId = parseInt(params.slug as string, 10);
            if (!isNaN(salarieId)) {
                // Charger les données du salarié
                const fetchSalarie = async () => {
                    const response = await fetch(`http://localhost:5046/api/Salarie/${salarieId}`);
                    const data = await response.json();
                    if (data.success) {
                        setSalarie(data.data); // Met à jour l'état avec les données du salarié
                    }
                };

                fetchSalarie();
            }
        }
    }, [params.slug]);

    return (
        <EncartForm titre={"Détails du salarié"}>
            <div className={"flex flex-col gap-4"}>
                <div className={"flex flex-col"}>
                    <label htmlFor="nom">Nom</label>
                    <input
                        type="text"
                        name="nom"
                        id="nom"
                        value={salarie.nom}
                        readOnly
                    />
                </div>
                <div className={"flex flex-col"}>
                    <label htmlFor="prenom">Prénom</label>
                    <input
                        type="text"
                        name="prenom"
                        id="prenom"
                        value={salarie.prenom}
                        readOnly
                    />
                </div>
                <div className={"flex flex-col"}>
                    <label htmlFor="telFixe">Téléphone Fixe</label>
                    <input
                        type="text"
                        name="telFixe"
                        id="telFixe"
                        value={salarie.telFixe}
                        readOnly
                    />
                </div>
                <div className={"flex flex-col"}>
                    <label htmlFor="telPortable">Téléphone Portable</label>
                    <input
                        type="text"
                        name="telPortable"
                        id="telPortable"
                        value={salarie.telPortable}
                        readOnly
                    />
                </div>
                <div className={"flex flex-col"}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={salarie.email}
                        readOnly
                    />
                </div>
                <div className={"flex flex-col"}>
                    <label htmlFor="idService">Service</label>
                    <input
                        type="text"
                        name="idService"
                        id="idService"
                        value={salarie.service}
                        readOnly
                    />
                </div>
                <div className={"flex flex-col"}>
                    <label htmlFor="idSite">Site</label>
                    <input
                        type="text"
                        name="idSite"
                        id="idSite"
                        value={salarie.ville}
                        readOnly
                    />
                </div>
                <div className={"flex flex-row justify-center gap-4 mt-8"}>
                    <Bouton
                        text={"Retour"}
                        onClick={() => router.back()}
                    />
                </div>
            </div>
        </EncartForm>
    );
}