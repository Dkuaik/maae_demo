'use client';
import React from 'react';
import Image from 'next/image';

export default function LogoPemex() {
  return (
    <Image 
      src="/logopmx.svg" 
      alt="Logo PEMEX" 
      width={100} 
      height={50} 
      className="h-12 w-auto" 
      onError={(e) => {
        console.log("Error cargando logopmx.svg, intentando otras rutas");
        const img = e.target as HTMLImageElement;
        if (img.src.includes('logopmx.svg')) {
          img.src = '/logo.svg';
        } else if (img.src.includes('logo.svg')) {
          img.src = '/pmxico.jpg';
        } else {
          // Fallback final - usar un div con texto
          const parent = img.parentElement;
          if (parent) {
            parent.innerHTML = `
              <div class="w-24 h-12 bg-[#08843c] flex items-center justify-center rounded">
                <span class="text-white font-bold text-sm">PEMEX</span>
              </div>
            `;
          }
        }
      }}
    />
  );
}