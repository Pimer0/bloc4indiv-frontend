import React from "react";
import { salarieProps } from "@/Interfaces/SalarieProps";
import BouttonGet from "@/Composants/BouttonGet";

const Salarie: React.FC<salarieProps> = ({
                                             nom,
                                             prenom,
    /*                                         telFix,
                                             telPortable,
                                             email,
                                             idService,
                                             idSite,*/
                                             id,
                                             ville,
                                             service,
                                             children,
                                         }) => {
    return (
        <div className={"bg-white rounded-lg p-4 mb-4"}>
            <div className={"flex-row flex gap-3"}>
                <div >
                    <p className={"font-bold"}>{`${nom} ${prenom}`}</p>
                    <p>Service: {service}</p>
                    <p>Site: {ville}</p>
{/*                    <p>Email: {email}</p>
                    <p>Téléphone Fixe: {telFix}</p>
                    <p>Téléphone Portable: {telPortable}</p>*/}
                </div>
            </div>
            <div>
                <BouttonGet entityId={id}></BouttonGet>
            </div>
            {children && <div>{children}</div>} {/* Affiche les enfants s'ils existent */}
        </div>
    );
};

export default Salarie;