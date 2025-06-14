"use client";

import React from "react";

type TextAreaProps = React.ComponentProps<'textarea'> & {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
}

export default function TextArea({
  id,
  label,
  error,
  required = false,
  className = "",
  ...rest
}: TextAreaProps) {
  return (
    <div className={"mb-4"}>
      <label htmlFor={id} className={"block text-sm font-medium mb-1"}>
        {label}
      </label>
      <textarea
        id={id}
        required={required}
        className={`w-full bg-slate-900 border ${error ? "border-red-500" : "border-gray-300"} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500` + ' ' + className}
        {...rest}
      />
      {error && <p className={"text-red-600 text-sm mt-1"}>{error}</p>}
    </div>
  );
}
