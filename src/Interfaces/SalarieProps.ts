export interface salarieProps {
    nom: string;
    prenom: string;
    telFix: string;
    telPortable: string;
    email: string;
    idService?: number;
    idSite?: number;
    id: number;
    ville: string;
    service: string;
    children?: React.ReactNode;
}