import React from "react";

interface DashboardCard {
    title?: string,
    className?: string,
    children: React.ReactNode;
}

export default function Surface ({ title, className = '', children}: DashboardCard) {
    return (
        <div
            className={
                'bg-surface rounded-2xl ' +
                'flex flex-col gap-10 ' +
                'm-auto py-10 px-5 ' +
                'w-11/12 h-11/12 ' +
                'overflow-x-hidden overflow-y-auto' +
                ' ' + className
            }
        >
            { title && <h3 className={'text-7xl'} >{ title }</h3> }
            <div>
                { children }
            </div>
        </div>
    )
}
