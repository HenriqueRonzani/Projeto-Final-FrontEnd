"use client";
import React, { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  className?: string;
};

export default function Button({ children, className = "", ...rest }: ButtonProps) {
  return (
    <button
      className={`w-full bg-primary py-2 rounded-lg transition duration-200 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
