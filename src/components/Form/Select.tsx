"use client";
import React from "react";

type Option = {
  value: string;
  caption: string;
};

type SelectInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  required?: boolean;
  error?: string;
};

export default function SelectInput({
  id,
  label,
  value,
  onChange,
  options,
  required = false,
  error,
}: SelectInputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
      >
        <option value="">Selecione um tipo</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.caption}
          </option>
        ))}
      </select>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
}
