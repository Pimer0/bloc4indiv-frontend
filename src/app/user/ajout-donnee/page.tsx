'use client'
import EncartForm from "@/Composants/EncartForm";
import Bouton from "@/Composants/Bouton";
import React, { useState, useEffect } from "react";
import { AjoutSalarieSchema, AjoutServiceSchema, AjoutSiteSchema } from "@/lib/zodDefinitions";
import InfoBulle from "@/Composants/infoBulle";
import { useRouter } from "next/navigation";
import { ValidationErrors } from "@/Interfaces/ValidationsErrors";
import { fetchWithSessionUser } from "@/lib/fetchWithSession";

export default function AjoutDonnees() {
    const router = useRouter();
    const [formType, setFormType] = useState("salarie");
    const [services, setServices] = useState<Array<{ idService: number, nomService: string }>>([]);
    const [sites, setSites] = useState<Array<{ idSite: number, ville: string }>>([]);

    const [formData, setFormData] = useState({
        // Salarié
        nom: '',
        prenom: '',
        telFixe: '',
        telPortable: '',
        email: '',
        idService: 0,
        idSite: 0,
        // Service
        nomService: '',
        // Site
        ville: ''
    });

    const [errors, setErrors] = useState<ValidationErrors>({});
    const [success, setSuccess] = useState<boolean>(false);

    // Charger les services et sites pour les listes déroulantes
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('http://localhost:5046/api/Service');
                if (!response.ok) {
                    console.error(`Erreur HTTP: ${response.status}`);
                }
                const data = await response.json();
                if (data.success) {
                    setServices(data.data);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des services:", error);
            }
        };

        const fetchSites = async () => {
            try {
                const response = await fetch('http://localhost:5046/api/Site');
                if (!response.ok) {
                    console.error(`Erreur HTTP: ${response.status}`);
                }
                const data = await response.json();
                if (data.success) {
                    setSites(data.data);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des sites:", error);
            }
        };

        fetchServices();
        fetchSites();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === "idService" || name === "idSite" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors({});
        setSuccess(false);

        let data;
        let url: string | undefined;
        let schema;
        if (formType === "salarie") {
            data = {
                nom: formData.nom,
                prenom: formData.prenom,
                telFixe: formData.telFixe,
                telPortable: formData.telPortable,
                email: formData.email,
                idService: formData.idService,
                idSite: formData.idSite
            };
            schema = AjoutSalarieSchema;
            url = "/api/Salarie";
        } else if (formType === "service") {
            data = {
                nomService: formData.nomService
            };
            schema = AjoutServiceSchema;
            url = "/api/Service";
        } else if (formType === "site") {
            data = {
                ville: formData.ville
            };
            schema = AjoutSiteSchema;
            url = "/api/Site";
        }

        if (schema && url) {
            const result = schema.safeParse(data);
            if (!result.success) {
                const validationErrors = result.error.flatten().fieldErrors;
                setErrors({ errors: validationErrors });
                return;
            }

            try {
                // fetchWithSessionUser pour les requêtes POST
                const response = await fetchWithSessionUser(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.success) {
                    setSuccess(true);
                    // Réinitialiser le formulaire
                    setFormData({
                        nom: '',
                        prenom: '',
                        telFixe: '',
                        telPortable: '',
                        email: '',
                        idService: 0,
                        idSite: 0,
                        nomService: '',
                        ville: ''
                    });
                    router.back();
                } else {
                    setErrors({ errors: { general: [response.message || "Erreur lors de la soumission des données."] } });
                }
            } catch (error) {
                setErrors({ errors: { general: ["Erreur lors de la connexion au serveur."] } });
                console.error("Erreur lors de la soumission des données:", error);
            }
        }
    };

    const handleFormTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormType(event.target.value);
        setErrors({});
        setSuccess(false);
    };

    return (
        <EncartForm titre={"Ajoutez une donnée"}>
            <div className={"flex flex-col"}>
                <div className={"border-b-gray-400 border-b mb-4"}>
                    <fieldset onChange={(e) => handleFormTypeChange(e as unknown as React.ChangeEvent<HTMLInputElement>)}>
                        <legend>Choisissez une donnée à ajouter:</legend>
                        <div>
                            <input
                                type="radio"
                                id="salarie"
                                name="type"
                                value="salarie"
                                defaultChecked={formType === "salarie"}
                                className={"m-3 w-fit"}
                            />
                            <label htmlFor="salarie">Salarié</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="service"
                                name="type"
                                value="service"
                                defaultChecked={formType === "service"}
                                className={"m-3 w-fit"}
                            />
                            <label htmlFor="service">Service</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="site"
                                name="type"
                                value="site"
                                defaultChecked={formType === "site"}
                                className={"m-3 w-fit"}
                            />
                            <label htmlFor="site">Site</label>
                        </div>
                    </fieldset>
                </div>

                {formType === "salarie" && (
                    <form onSubmit={handleSubmit}>
                        <div className={"flex flex-col"}>
                            <label htmlFor="nom">Nom</label>
                            <input
                                type="text"
                                name="nom"
                                id="nom"
                                value={formData.nom}
                                onChange={handleChange}
                                required
                            />
                            {errors.errors?.nom && (
                                <InfoBulle
                                    colorClass={"bg-[#FECACA] text-[#450A0A] border-[#450A0A]"}
                                    content={errors.errors.nom[0]}
                                />
                            )}
                        </div>

                        <div className={"flex flex-col"}>
                            <label htmlFor="prenom">Prénom</label>
                            <input
                                type="text"
                                name="prenom"
                                id="prenom"
                                value={formData.prenom}
                                onChange={handleChange}
                                required
                            />
                            {errors.errors?.prenom && (
                                <InfoBulle
                                    colorClass={"bg-[#FECACA] text-[#450A0A] border-[#450A0A]"}
                                    content={errors.errors.prenom[0]}
                                />
                            )}
                        </div>

                        <div className={"flex flex-col"}>
                            <label htmlFor="telFixe">Téléphone Fixe</label>
                            <input
                                type="tel"
                                name="telFixe"
                                id="telFixe"
                                value={formData.telFixe}
                                onChange={handleChange}
                                required
                            />
                            {errors.errors?.telFixe && (
                                <InfoBulle
                                    colorClass={"bg-[#FECACA] text-[#450A0A] border-[#450A0A]"}
                                    content={errors.errors.telFixe[0]}
                                />
                            )}
                        </div>

                        <div className={"flex flex-col"}>
                            <label htmlFor="telPortable">Téléphone Portable</label>
                            <input
                                type="tel"
                                name="telPortable"
                                id="telPortable"
                                value={formData.telPortable}
                                onChange={handleChange}
                                required
                            />
                            {errors.errors?.telPortable && (
                                <InfoBulle
                                    colorClass={"bg-[#FECACA] text-[#450A0A] border-[#450A0A]"}
                                    content={errors.errors.telPortable[0]}
                                />
                            )}
                        </div>

                        <div className={"flex flex-col"}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            {errors.errors?.email && (
                                <InfoBulle
                                    colorClass={"bg-[#FECACA] text-[#450A0A] border-[#450A0A]"}
                                    content={errors.errors.email[0]}
                                />
                            )}
                        </div>

                        <div className={"flex flex-col"}>
                            <label htmlFor="idService">Service</label>
                            <select
                                name="idService"
                                id="idService"
                                value={formData.idService}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Sélectionnez un service</option>
                                {services.map(service => (
                                    <option key={service.idService} value={service.idService}>
                                        {service.nomService}
                                    </option>
                                ))}
                            </select>
                            {errors.errors?.idService && (
                                <InfoBulle
                                    colorClass={"bg-[#FECACA] text-[#450A0A] border-[#450A0A]"}
                                    content={errors.errors.idService[0]}
                                />
                            )}
                        </div>

                        <div className={"flex flex-col"}>
                            <label htmlFor="idSite">Site</label>
                            <select
                                name="idSite"
                                id="idSite"
                                value={formData.idSite}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Sélectionnez un site</option>
                                {sites.map(site => (
                                    <option key={site.idSite} value={site.idSite}>
                                        {site.ville}
                                    </option>
                                ))}
                            </select>
                            {errors.errors?.idSite && (
                                <InfoBulle
                                    colorClass={"bg-[#FECACA] text-[#450A0A] border-[#450A0A]"}
                                    content={errors.errors.idSite[0]}
                                />
                            )}
                        </div>

                        <div className={"flex flex-row justify-center gap-4 mt-8"}>
                            <Bouton
                                text={"Retour"}
                                onClick={() => router.back()}
                            />
                            <Bouton
                                text={"Créer"}
                                colorClass={"bg-[#1E4147] text-white"}
                                hoverColorClass={"hover:bg-white hover:text-[#1E4147]"}
                                customType={"submit"}
                            />
                        </div>
                    </form>
                )}

                {formType === "service" && (
                    <form onSubmit={handleSubmit}>
                        <div className={"flex flex-col"}>
                            <label htmlFor="nomService">Nom du service</label>
                            <input
                                type="text"
                                name="nomService"
                                id="nomService"
                                value={formData.nomService}
                                onChange={handleChange}
                                required
                            />
                            {errors.errors?.nomService && (
                                <InfoBulle
                                    colorClass={"bg-[#FECACA] text-[#450A0A] border-[#450A0A]"}
                                    content={errors.errors.nomService[0]}
                                />
                            )}
                        </div>

                        <div className={"flex flex-row justify-center gap-4 mt-8"}>
                            <Bouton
                                text={"Retour"}
                                onClick={() => router.back()}
                            />
                            <Bouton
                                text={"Créer"}
                                colorClass={"bg-[#1E4147] text-white"}
                                hoverColorClass={"hover:bg-white hover:text-[#1E4147]"}
                                customType={"submit"}
                            />
                        </div>
                    </form>
                )}

                {formType === "site" && (
                    <form onSubmit={handleSubmit}>
                        <div className={"flex flex-col"}>
                            <label htmlFor="ville">Ville</label>
                            <input
                                type="text"
                                name="ville"
                                id="ville"
                                value={formData.ville}
                                onChange={handleChange}
                                required
                            />
                            {errors.errors?.ville && (
                                <InfoBulle
                                    colorClass={"bg-[#FECACA] text-[#450A0A] border-[#450A0A]"}
                                    content={errors.errors.ville[0]}
                                />
                            )}
                        </div>

                        <div className={"flex flex-row justify-center gap-4 mt-8"}>
                            <Bouton
                                text={"Retour"}
                                onClick={() => router.back()}
                            />
                            <Bouton
                                text={"Créer"}
                                colorClass={"bg-[#1E4147] text-white"}
                                hoverColorClass={"hover:bg-white hover:text-[#1E4147]"}
                                customType={"submit"}
                            />
                        </div>
                    </form>
                )}

                {success && (
                    <InfoBulle
                        colorClass={"bg-[#DCFCE7] border-[#022C22]"}
                        content={"Données créées avec succès !"}
                    />
                )}
                {errors.errors?.general && (
                    <InfoBulle
                        colorClass={"bg-[#FECACA] text-[#450A0A] border-[#450A0A]"}
                        content={errors.errors.general[0]}
                    />
                )}
            </div>
        </EncartForm>
    );
}