'use client'
import React from "react";
import BouttonModification from "@/Composants/BouttonModification";
import BoutonSuppression from "@/Composants/BoutonSuppression";

interface SiteProps {
    idSite: number;
    ville: string;
    onDelete: (idSite: number) => void;
}

const GestionSite: React.FC<SiteProps> = ({
                                              idSite,
                                              ville,
                                              onDelete,
                                          }) => {
    return (
        <div className="flex flex-row min-h-[60px] items-center border-b border-gray-200 w-96">
            <p className="w-1/3 px-2 break-words overflow-hidden">{idSite}</p>
            <p className="w-1/3 px-2 break-words overflow-hidden">{ville}</p>
            <div className="w-1/3 px-2 flex items-center gap-2">
                <BouttonModification entityId={idSite} entityType="site" />
                <BoutonSuppression entityId={idSite} entityType="site" onDelete={onDelete} />
            </div>
        </div>
    );
};

export default GestionSite;