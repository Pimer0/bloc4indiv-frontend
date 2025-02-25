'use client'
import React from "react";
import { salarieProps } from "@/Interfaces/SalarieProps";
import BouttonModification from "@/Composants/BouttonModification";
import BoutonSuppression from "@/Composants/BoutonSuppression";

const GestionSalarie: React.FC<salarieProps & { onDelete: (id: number) => void }> = ({
                                                                                         id,
                                                                                         nom,
                                                                                         prenom,
                                                                                         telFixe,
                                                                                         telPortable,
                                                                                         email,
                                                                                         ville,
                                                                                         service,
                                                                                         /*idService,
                                                                                         idSite,*/
                                                                                         onDelete,
                                                                                     }) => {
    return (
        <div className="flex flex-row min-h-[60px] items-center border-b border-gray-200">
            <p className="w-1/8 px-2 break-words overflow-hidden">{nom}</p>
            <p className="w-1/8 px-2 break-words overflow-hidden">{prenom}</p>
            <p className="w-1/8 px-2 break-words overflow-hidden">{email}</p>
            <p className="w-1/8 px-2 break-words overflow-hidden">{telFixe || "N/A"}</p>
            <p className="w-1/8 px-2 break-words overflow-hidden">{telPortable || "N/A"}</p>
            <p className="w-1/8 px-2 break-words overflow-hidden">{ville || "N/A"}</p>
            <p className="w-1/8 px-2 break-words overflow-hidden">{service || "N/A"}</p>
            <div className="w-1/8 px-2 flex items-center">
                <BouttonModification entityId={id} entityType="salarie" />
            </div>
            <div className="w-1/8 px-2 flex items-center">
                <BoutonSuppression entityId={id} entityType="salarie" onDelete={onDelete} />
            </div>
        </div>
    );
};

export default GestionSalarie;