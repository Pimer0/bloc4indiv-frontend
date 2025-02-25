'use client'
import React from "react";
import BouttonModification from "@/Composants/BouttonModification";
import BoutonSuppression from "@/Composants/BoutonSuppression";

interface ServiceProps {
    idService: number;
    nomService: string;
    onDelete: (idService: number) => void;
}

const GestionService: React.FC<ServiceProps> = ({
                                                    idService,
                                                    nomService,
                                                    onDelete,
                                                }) => {
    return (
        <div className="flex flex-row min-h-[60px] items-center border-b border-gray-200">
            <p className="w-1/3 px-2 break-words overflow-hidden">{idService}</p>
            <p className="w-1/3 px-2 break-words overflow-hidden">{nomService}</p>
            <div className="w-1/3 px-2 flex items-center gap-2">
                <BouttonModification entityId={idService} entityType="service" />
                <BoutonSuppression entityId={idService} entityType="service" onDelete={onDelete} />
            </div>
        </div>
    );
};

export default GestionService;