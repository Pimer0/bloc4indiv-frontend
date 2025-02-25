'use client'
import React, { useEffect, useState } from "react";
import EncartForm from "@/Composants/EncartForm";
import Bouton from "@/Composants/Bouton";
import { IoMdAdd } from "react-icons/io";
import { useRouter } from "next/navigation";
import GestionService from "@/Composants/GestionService"; // Importez le composant GestionService

interface ServiceProps {
    idService: number;
    nomService: string;
}

export default function GestionServices() {
    const [services, setServices] = useState<ServiceProps[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch("http://localhost:5046/api/Service");
                const data = await response.json();
                if (data.success) {
                    setServices(data.data);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des services:", error);
            }
        };

        fetchServices();
    }, []);

    const handleDeleteService = (idService: number) => {
        setServices((prevServices) => prevServices.filter((service) => service.idService !== idService));
    };

    return (
        <div>
            <EncartForm titre={"Gestion des services"}>
                <div>
                    <div className="mb-4 font-bold border-b border-gray-400">
                        <h3 className="font-extrabold">Services</h3>
                    </div>

                    <div className="grid grid-cols-3 gap-4 py-2 font-bold border-b border-gray-400 mb-4">
                        <p>ID Service</p>
                        <p>Nom du Service</p>
                        <p>Actions</p>
                    </div>

                    {services.length > 0 ? (
                        services.map((service) => (
                            <GestionService
                                key={service.idService}
                                idService={service.idService}
                                nomService={service.nomService}
                                onDelete={handleDeleteService}
                            />
                        ))
                    ) : (
                        <div className="text-center py-4">Aucun service trouvé</div>
                    )}

                    <div className={"flex flex-row justify-center gap-4 mt-8"}>
                        <Bouton
                            text={"Ajouter un service"}
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