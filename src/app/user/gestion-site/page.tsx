'use client'
import React, { useEffect, useState } from "react";
import EncartForm from "@/Composants/EncartForm";
import Bouton from "@/Composants/Bouton";
import { IoMdAdd } from "react-icons/io";
import { useRouter } from "next/navigation";
import GestionSite from "@/Composants/GestionSite"; // Importez le composant GestionSite

interface SiteProps {
    idSite: number;
    ville: string;
}

export default function GestionSites() {
    const [sites, setSites] = useState<SiteProps[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchSites = async () => {
            try {
                const response = await fetch("http://localhost:5046/api/Site");
                const data = await response.json();
                if (data.success) {
                    setSites(data.data);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des sites:", error);
            }
        };

        fetchSites();
    }, []);

    const handleDeleteSite = (idSite: number) => {
        setSites((prevSites) => prevSites.filter((site) => site.idSite !== idSite));
    };

    return (
        <div>
            <EncartForm titre={"Gestion des sites"} customWidth={"w-[500px]"}>
                <div>
                    <div className="mb-4 font-bold border-b border-gray-400">
                        <h3 className="font-extrabold">Sites</h3>
                    </div>

                    <div className="grid grid-cols-3 gap-4 py-2 font-bold border-b border-gray-400 mb-4">
                        <p>ID Site</p>
                        <p>Ville</p>
                        <p>Actions</p>
                    </div>

                    {sites.length > 0 ? (
                        sites.map((site) => (
                            <GestionSite
                                key={site.idSite}
                                idSite={site.idSite}
                                ville={site.ville}
                                onDelete={handleDeleteSite}
                            />
                        ))
                    ) : (
                        <div className="text-center py-4">Aucun site trouvé</div>
                    )}

                    <div className={"flex flex-row justify-center gap-4 mt-8"}>
                        <Bouton
                            text={"Ajouter un site"}
                            childrenIcon={<IoMdAdd size={25} />}
                            colorClass={"bg-[#1E4147] text-white"}
                            hoverColorClass={"hover:bg-white hover:text-[#1E4147]"}
                            onClick={() => router.push("/user/ajout-donnee")}
                        />
                    </div>
                </div>
            </EncartForm>
        </div>
    );
}