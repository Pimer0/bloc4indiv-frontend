export interface ValidationErrors {
    errors?: {
        prenom?: string[];
        nom?: string[];
        email?: string[];
        ville?: string[];
        nomService?: string[];
        raisonSociale?: string[];
        telPortable?: string[];
        telFixe?: string[];
        general?: string[];
        idService?: string[];
        idSite?: string[];
    };
}