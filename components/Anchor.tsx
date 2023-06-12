"use client";

import { LINK_CLICKED, useAppContext } from "@/context/state";
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
  const sharedState = useAppContext();

  const handleClicked = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    let target = event.target as HTMLElement;
    if (target.tagName.toLowerCase() !== 'a') {
      target = target.closest('a')!;
    }
    const id = target.getAttribute('href') as string;
    
    if (id && id.startsWith("#")) {
      scrollSmoothlyTo(id);
      sharedState.eventBus.dispatch(LINK_CLICKED, id);
    }
    
    onClick && onClick(event);
  };

  return (
    <a href={link} onClick={handleClicked} className={clsx(
      className,
      'cursor-pointer',
      'hover:text-teal-600',
      'dark:hover:text-teal-300',
      'transition-colors',
      'transition'
    )}
    >{children}</a>
  )
}