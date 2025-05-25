import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "./Provider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TanzimLy | Gérez mieux, planifiez malin",
  description: "Optimisez votre organisation grâce à une plateforme moderne de planification et de gestion.",
    keywords: ["gestion", "planification", "projets", "plateforme", "TanzimLy" , "etudes" , "vacance"],

};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <AuthProvider> 
          {children}
            <div>
              <Toaster />
            </div>
        </AuthProvider>
       
      </body>
    </html>
  );
}
