import clsx from "clsx";
import React from "react";

export default function Card({
  children,
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLElement>) {
  return (
    <article
      {...props}
      className={clsx(
        "rouded-5 h-44 overflow-hidden rounded-xl shadow-sm md:h-48",
        className,
      )}
    >
      {children}
    </article>
  );
}
