import React from "react";

interface DashboardCard {
  title?: string,
  className?: string,
  children: React.ReactNode;
  headerContent?: React.ReactNode;
}

export default function Surface ({ title, className = '', children, headerContent}: DashboardCard) {
  return (
    <div
      className={
        'bg-surface rounded-2xl ' +
        'flex flex-col gap-10 ' +
        'm-auto p-10 ' +
        'w-11/12 h-11/12 ' +
        'overflow-x-hidden overflow-y-auto' +
        ' ' + className
      }
    >
      <div className="flex justify-between items-center">
        { title && <h3 className={'text-7xl'} >{ title }</h3> }

        {headerContent}
      </div>
      <div className={'h-full'}>
        { children }
      </div>
    </div>
  )
}
