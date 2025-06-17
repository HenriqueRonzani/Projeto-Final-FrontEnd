import React from "react";

interface DashboardCard {
  title?: string;
  className?: string;
  children: React.ReactNode;
  headerContent?: React.ReactNode;
}

export default function Surface({
  title,
  className = "",
  children,
  headerContent,
}: DashboardCard) {
  return (
    <section
      className={
        "bg-white dark:bg-gray-900 rounded-2xl shadow-md " +
        "flex flex-col gap-8 " +
        "m-auto p-8 md:p-10 " +
        "w-full max-w-7xl h-full max-h-[90vh] " +
        "overflow-x-hidden overflow-y-auto " +
        className
      }
    >
      {(title || headerContent) && (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          {title && (
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white break-words">
              {title}
            </h1>
          )}
          {headerContent}
        </div>
      )}

      <div className="flex-1 w-full">
        {children}
      </div>
    </section>
  );
}
