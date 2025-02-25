'use client'
import React, { useEffect, useState } from "react";
import EncartForm from "@/Composants/EncartForm";
import Bouton from "@/Composants/Bouton";
import { IoMdAdd } from "react-icons/io";
import GestionSalarie from "@/Composants/GestionSalarie";
import { salarieProps } from "@/Interfaces/SalarieProps";
import { useRouter } from "next/navigation";

export default function GestionSalaries() {
    const [salaries, setSalaries] = useState<salarieProps[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchSalaries = async () => {
            try {
                const response = await fetch("http://localhost:5046/api/Salarie");
                const data = await response.json();
                if (data.success) {
                    setSalaries(data.data);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des salariés:", error);
            }
        };

        fetchSalaries();
    }, []);

    const handleDeleteSalarie = (id: number) => {
        setSalaries((prevSalaries) => prevSalaries.filter((salarie) => salarie.id !== id));
    };

    return (
        <div>
            <EncartForm titre={"Gestion des salariés"}>
                <div>
                    <div className="mb-4 font-bold border-b border-gray-400">
                        <h3 className="font-extrabold">Salariés</h3>
                    </div>

                    <div className="grid grid-cols-9 gap-4 py-2 font-bold border-b border-gray-400 mb-4">
                        <p>Nom</p>
                        <p>Prénom</p>
                        <p>Email</p>
                        <p>Tél. Fixe</p>
                        <p>Tél. Portable</p>
                        <p>Ville</p>
                        <p>Service</p>
                        <p>Edition</p>
                        <p>Suppression</p>
                    </div>

                    {salaries.length > 0 ? (
                        salaries.map((salarie) => (
                            <GestionSalarie
                                key={salarie.id}
                                id={salarie.id}
                                nom={salarie.nom}
                                prenom={salarie.prenom}
                                telFixe={salarie.telFixe}
                                telPortable={salarie.telPortable}
                                email={salarie.email}
                                idService={salarie.idService}
                                idSite={salarie.idSite}
                                ville={salarie.ville}
                                service={salarie.service}
                                onDelete={handleDeleteSalarie}
                            />
                        ))
                    ) : (
                        <div className="text-center py-4">Aucun salarié trouvé</div>
                    )}

                    <div className={"flex flex-row justify-center gap-4 mt-8"}>
                        <Bouton
                            text={"Ajouter un salarié"}
                            childrenIcon={<IoMdAdd size={25}/>}
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