"use client";

import React from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function MainLayout({children}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('user_email');
    router.push("/login");
  }

  return (
    <div className={'w-full h-full flex flex-col bg-background'}>
      <nav className="bg-gray-800 p-4 flex flex-row items-center justify-between">
        <div className="container mx-auto flex justify-between items-center">
          <ul className="flex space-x-4 text-white">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/posts">Posts</Link>
            </li>
          </ul>
          <div>
            <Link href="/login" onClick={handleLogout} className="text-white hover:underline">
              Logout
            </Link>
          </div>
        </div>
      </nav>
      {children}
    </div>
  )
}
