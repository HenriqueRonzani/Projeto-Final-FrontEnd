"use client";
import React from "react";

type TextInputProps = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  className?: string;
  readonly?: boolean;
  disabled?: boolean;
};

export default function TextInput({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  className = ""
}: TextInputProps) {
  return (
    <div className={"mb-4"}>
      <label htmlFor={id} className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full border bg-slate-900 ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500` + ' ' + className}
      />
      {error && <p className={"text-red-600 text-sm mt-1"}>{error}</p>}
    </div>
  );
}
