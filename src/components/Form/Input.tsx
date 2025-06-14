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
}: TextInputProps) {
  return (
    <div className={"mb-4"}>
      <label htmlFor={id} className={"block text-sm font-medium mb-1"}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {error && <p className={"text-red-600 text-sm mt-1"}>{error}</p>}
    </div>
  );
}
