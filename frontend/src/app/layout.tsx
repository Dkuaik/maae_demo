import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Layout, Button } from "antd";
import { Header, Content, Footer } from "antd/es/layout/layout";
import Text from "antd/es/typography/Text";
import backgroundImage from '../../public/bgpmx.jpg';
import { LoginOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedOut,
} from "@clerk/nextjs";
import LogoPemex from "./componentes/LogoPemex";
import UserInfo from "./componentes/UserInfo";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PEMEX | UCII",
  description: "Modelo Avanzado para el Análisis de evidencias MAAe",
  icons: {
    icon: "/pmxico.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body className={`${inter.className} antialiased`}>
          <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
            <Image
              src={backgroundImage}
              alt="Fondo de la página"
              layout="fill"
              objectFit="cover"
              priority
              style={{ objectPosition: 'center', border: 'none', zIndex: -1 }}
            />
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backdropFilter: 'blur(6px)', 
              zIndex: -0.5 
            }} />
            
            <Layout className="min-h-screen bg-transparent" style={{ zIndex: 1 }}>
              {/* Header superior verde */}
              <Header
                className="px-1 md:px-10 flex items-center justify-between h-8 bg-[#08843c]"
                style={{ zIndex: 2 }}
              >
                
              </Header>

              {/* Header principal */}
              <Header 
                className="h-20 bg-white flex items-center justify-between px-4 md:px-8 shadow-sm" 
                style={{ zIndex: 10 }}
              >
                {/* Lado izquierdo - Logo y título */}
                <div className="flex items-center space-x-4">
                  <Link href="/" className="hover:opacity-80 transition-opacity">
                    <LogoPemex />
                  </Link>
                  
                  {/* Título para desktop */}
                  <div className="hidden sm:block">
                    <h1 className="text-black text-lg md:text-xl lg:text-2xl font-semibold">
                      Modelo Avanzado para el Análisis de evidencias (MAAe)
                    </h1>
                  </div>
                  
                  {/* Título para móviles */}
                  <div className="sm:hidden">
                    <h1 className="text-black text-base font-semibold">
                      MAAe - PEMEX
                    </h1>
                  </div>
                </div>

                {/* Lado derecho - Botones de autenticación */}
                <div className="flex items-center space-x-3">
                  {/* Cuando NO está logueado */}
                  <SignedOut>
                    <SignInButton mode="modal">
                      <Button 
                        type="primary" 
                        size="middle"
                        className="bg-[#08843c] hover:bg-[#0a5a2a] border-[#08843c] font-medium shadow-sm"
                      >
                        <LoginOutlined />
                        Iniciar Sesión
                        
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button 
                        type="default" 
                        size="middle"
                        className="border-[#08843c] text-[#08843c] hover:bg-[#08843c] hover:text-white font-medium"
                      >
                        Registrarse
                      </Button>
                    </SignUpButton>
                  </SignedOut>
                  
                  {/* Cuando SÍ está logueado */}
                  <UserInfo />
                </div>
              </Header>

              {/* Contenido principal */}
              <Content className="p-4 md:p-8 bg-transparent flex-1" style={{ zIndex: 1 }}>
                {children}
              </Content>

              {/* Footer */}
              <Footer className="text-center bg-gray-200 p-4 mt-auto" style={{ zIndex: 2 }}>
                <div className="font-medium">
                  PEMEX ©{new Date().getFullYear()} - Sistema creado por la UCII
                </div>
                <Text type="secondary" className="text-sm">
                  {new Date().toLocaleDateString('es-MX', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Text>
              </Footer>
            </Layout>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}