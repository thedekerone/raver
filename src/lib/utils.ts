import { type ClassValue, clsx } from "clsx"
import { type GetServerSideProps } from "next";
import { Component } from "react"
import { twMerge } from "tailwind-merge"
import { getServerAuthSession } from "~/server/auth";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
