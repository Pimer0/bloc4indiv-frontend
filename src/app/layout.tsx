import type { Metadata } from "next";
import "./globals.css";
import {SessionProvider} from "@/context/SessionProvider";
import {montserrat} from "@/app/fonts";
import SessionHeader from "@/Composants/SessionHeader";


export const metadata: Metadata = {
  title: "Annuaire",
  description: "Annuaire d'entreprise",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
        <body className={montserrat.className}>
        <SessionProvider>
                <SessionHeader />
                {children}
        </SessionProvider>
        </body>
        </html>
    );
}
