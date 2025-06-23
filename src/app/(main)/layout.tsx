// Seu arquivo de layout, ex: src/app/(main)/layout.tsx
"use client";

import React, { useState, useEffect } from "react"; // 1. Adicionamos useState e useEffect
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  // 2. Criamos um estado para saber se o usuário está logado
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 3. useEffect roda quando o componente é carregado no navegador
  useEffect(() => {
    // Verificamos se o cookie 'user_email' existe
    const userCookie = Cookies.get('user_email');
    // Se o cookie existir, definimos isLoggedIn como true
    if (userCookie) {
      setIsLoggedIn(true);
    }
  }, []); // O array vazio [] faz com que isso rode apenas uma vez

  const handleLogout = () => {
    Cookies.remove('user_email');
    router.push("/login");
  }

  return (
    <div className={'w-full min-h-screen flex flex-col bg-background'}>
      <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 w-full">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4 w-full">
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image src="/logo.svg" className='bg-white rounded-md' height='50' width='50' alt="Academix Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Academix</span>
          </Link>
          
          {/* 4. Só mostramos os links se o usuário estiver logado */}
          {isLoggedIn && (
            <div className="hidden w-full md:block md:w-auto" id="navbar-default">
              <ul className="font-medium flex items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <Link href="/" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/posts" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                    Meus Posts
                  </Link>
                </li>
                {/* 5. AQUI ESTÁ O NOVO LINK! */}
                <li>
                  <Link href="/profile/edit" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                    Editar Perfil
                  </Link>
                </li>
                {/* 6. Logout agora é um botão (melhor prática) */}
                <li>
                  <button onClick={handleLogout} className="block py-2 px-3 text-red-600 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 dark:text-red-500 md:dark:hover:text-red-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent font-medium">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
      {/* O conteúdo da página (ex: dashboard, posts, etc.) é renderizado aqui */}
      <main className="flex-grow p-4 md:p-6 flex-grow">
        {children}
      </main>
    </div>
  )
}