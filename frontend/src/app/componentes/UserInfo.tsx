'use client';
import React from 'react';
import { Button } from 'antd';
import {
  SignedIn,
  UserButton,
  useUser,
  SignOutButton,
} from "@clerk/nextjs";

export default function UserInfo() {
  const { user } = useUser();
  
  return (
    <SignedIn>
      <div className="flex items-center gap-2 md:gap-3 flex-wrap">
        {/* Saludo personalizado con nombre real */}
        <div className="hidden md:flex flex-col text-right pr-2">
          <span className="text-sm font-medium text-gray-800">
            ¡Hola, {user?.firstName || user?.username || 'Usuario'}!
          </span>
          <span className="text-xs text-gray-500">
            {new Date().toLocaleDateString('es-MX', {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
        
        {/* Botón de logout manual: ocupa toda la fila en móvil */}
        <div className="flex-1 md:flex-none">
          <SignOutButton>
            <Button 
              type="default" 
              size="small"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-medium w-full md:w-auto"
            >
              Cerrar Sesión
            </Button>
          </SignOutButton>
        </div>
        
        {/* UserButton mejorado */}
        <div>
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "w-10 h-10 border-2 border-[#08843c] shadow-sm",
                userButtonPopoverCard: "shadow-lg border border-gray-200",
                userButtonPopoverActionButton: "hover:bg-gray-50 text-gray-700",
                userButtonPopoverActionButtonText: "font-medium",
              }
            }}
            userProfileMode="modal"
            afterSignOutUrl="/"
            showName={false}
          />
        </div>
      </div>
    </SignedIn>
  );
}