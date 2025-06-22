"use client";

import React from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faFileAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";


export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('user_email');
    router.push("/login");
  }

  return (
    <div className={'w-full h-full flex flex-col bg-background'}>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full">
        <div className="flex flex-wrap items-center justify-between  p-4 w-full">
          <p className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image src="/logo.svg" className='bg-white rounded-md' height='50' width='50' alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Academix</span>
          </p>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  href="/"
                  className="flex items-center gap-1 py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  <FontAwesomeIcon icon={faHome} />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/posts"
                  className="flex items-center gap-1 py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  <FontAwesomeIcon icon={faFileAlt} />
                  Meus Posts
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  onClick={handleLogout}
                  className="flex items-center gap-1 py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {children}
    </div>
  )
}
