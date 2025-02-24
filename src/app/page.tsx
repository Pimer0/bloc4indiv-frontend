"use client"

import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import Salarie from "@/Composants/Salarie";
import { salarieProps } from "@/Interfaces/SalarieProps";
import Bouton from "@/Composants/Bouton";

export default function Home() {
  const router = useRouter();
  const [salaries, setSalaries] = useState<salarieProps[]>([]);
  const [sites, setSites] = useState<{ idSite: number, ville: string }[]>([]);
  const [services, setServices] = useState<{ idService: number, nomService: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSite, setSelectedSite] = useState("");
  const [selectedService, setSelectedService] = useState("");

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

    const fetchSites = async () => {
      try {
        const response = await fetch("http://localhost:5046/api/Site");
        const data = await response.json();
        if (data.success) {
          setSites(data.data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des sites:", error);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:5046/api/Service");
        const data = await response.json();
        if (data.success) {
          setServices(data.data);
          console.log("Services:", data.data); // Log des services
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des services:", error);
      }
    };

    fetchSalaries();
    fetchSites();
    fetchServices();
  }, []);

  const filteredSalaries = salaries.filter(salarie => {
    const matchesSearch = salarie.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        salarie.prenom.toLowerCase().includes(searchTerm.toLowerCase());

    // Convertir selectedSite en nombre pour la comparaison
    const siteId = Number(selectedSite);
    const matchesSite = selectedSite ? salarie.idSite === siteId : true;


    const matchesService = selectedService ? salarie.idService === Number(selectedService) : true;

    return matchesSearch && matchesSite && matchesService;
  });

  return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <div className="flex flex-row max-w-[804px]">
            <form>
              <div>
                <input
                    type="search"
                    id="maRecherche"
                    name="q"
                    placeholder="Rechercher sur l'annuaire"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

              </div>
              <label htmlFor="site-select">Triez par site:</label>
              <select
                  name="sites"
                  id="site-select"
                  value={selectedSite}
                  onChange={(e) => setSelectedSite(e.target.value)}
              >
                <option value="">--Tous--</option>
                {sites.map(site => (
                    <option key={site.idSite} value={site.idSite.toString()}>{site.ville}</option>
                ))}
              </select>

              <label htmlFor="service-select">Triez par service:</label>
              <select
                  name="services"
                  id="services-select"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
              >
                <option value="">--Tous--</option>
                {services.map(service => (
                    <option key={service.idService} value={service.idService.toString()}>{service.nomService}</option>
                ))}
              </select>
            </form>
          </div>
          <div>
            {filteredSalaries.map((salarie: salarieProps, index) => (
                <Salarie
                    key={index}
                    nom={salarie.nom}
                    prenom={salarie.prenom}
                    telFix={salarie.telFix}
                    telPortable={salarie.telPortable}
                    email={salarie.email}
                    idService={salarie.idService}
                    idSite={salarie.idSite}
                    ville={salarie.ville}
                    service={salarie.service}
                    id={salarie.id}
                />
            ))}
          </div>
        </main>
      </div>
  );
}