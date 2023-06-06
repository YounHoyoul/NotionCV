"use client";

import { scrollSmoothlyTo } from "@/lib/scrollTo";
import clsx from "clsx";
import { MouseEvent } from "react";

type Props = {
  link: string,
  className?: string,
  children: React.ReactNode,
  onClick?: (e: MouseEvent<HTMLElement>) => void
};

export default function Anchor({ link, className, children, onClick }: Props) {
  const handleClicked = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = event.target as HTMLAnchorElement;
    const id = target.getAttribute('href') as string;
    if (id.startsWith("#")) scrollSmoothlyTo(id);
    
    onClick && onClick(event);
  };

  return (
    <a href={link} onClick={handleClicked} className={clsx(
      className,
      'hover:text-teal-600',
      'dark:hover:text-teal-300',
      'transition-colors'
    )}
    >{children}</a>
  )
}