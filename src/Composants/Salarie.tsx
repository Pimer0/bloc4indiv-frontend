import React from "react";
import { salarieProps } from "@/Interfaces/SalarieProps";

const Salarie: React.FC<salarieProps> = ({
                                             nom,
                                             prenom,
                                             telFix,
                                             telPortable,
                                             Email,
                                             IdService,
                                             IdSite,
                                             children,
                                         }) => {
    return (
        <div>
            <div className={"flex-row flex gap-3"}>
                <div className={"bg-white rounded-lg"}>

                    {/* <Image width={239} height={239} src={img} alt={"Vin"} /> */}
                </div>
                <div>
                    <p className={"font-bold"}>{`${nom} ${prenom}`}</p>
                    <p>Service ID: {IdService}</p>
                    <p>Site ID: {IdSite}</p>
                    <p>Email: {Email}</p>
                    <p>Téléphone Fixe: {telFix}</p>
                    <p>Téléphone Portable: {telPortable}</p>
                </div>
            </div>
            {children && <div>{children}</div>} {/* Affiche les enfants s'ils existent */}
        </div>
    );
};

export default Salarie;