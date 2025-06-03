import React from "react";

interface DashboardCard {
    title?: string,
    children: React.ReactNode;
}

export default function DashboardCard ({ title, children}: DashboardCard) {
    return (
        <div className={'bg-slate-200 w-full h-full flex flex-col rounded-2xl py-10 px-5'}>
            { title && <h1 className={'mx-auto text-6xl'} >{ title }</h1> }
            <div className={'m-auto'}>
                { children }
            </div>
        </div>
    )
}