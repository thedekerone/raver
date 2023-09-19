"use client";
import React from "react";
import clsx from "clsx";

export default function Button({
  children,
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={clsx("rounded-full px-3 py-2 text-xs", className)}
      {...rest}
    >
      {children}
    </button>
  );
}
