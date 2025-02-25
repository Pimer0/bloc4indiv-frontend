export interface BoutonSuppressionProps {
    entityId: number;
    entityType: "site" | "service" | "salarie";
    onDelete: (id: number) => void;
}