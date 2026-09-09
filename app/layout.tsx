import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display, Geist_Mono } from "next/font/google"
import { LanguageProvider } from "@/lib/language-context"
import { PrivacyConsent } from "@/components/privacy-consent"
import "./globals.css"
const _inter=Inter({subsets:["latin"]});const _playfair=Playfair_Display({subsets:["latin"]});const _geistMono=Geist_Mono({subsets:["latin"]});
export const metadata:Metadata={title:"SpaceHome | Imaginez et réalisez votre intérieur",description:"Découvrez votre projet, visualisez votre futur intérieur avec l’IA et avancez avec des professionnels adaptés.",generator:"v0.app"};export const viewport:Viewport={themeColor:"#f8f6f3"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fr"><body className="font-sans antialiased"><LanguageProvider>{children}</LanguageProvider><PrivacyConsent/></body></html>}
