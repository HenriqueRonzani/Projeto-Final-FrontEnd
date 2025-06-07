import React from "react";
import Link from "next/link";

export default function MainLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className={'w-full h-full flex flex-col bg-background'}>
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto">
                    <ul className="flex space-x-4 text-white">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/posts">Posts</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            {children}
        </div>
    )
}
