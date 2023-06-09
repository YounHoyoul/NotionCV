"use client";

import SelectItem from "./SelectItem";
import clsx from "clsx";
import { MouseEvent } from "react";
import { scrollSmoothlyTo } from "@/lib/scrollTo";
import { slug } from "@/lib/slugify";

type Props = {
  title: string,
  items: SelectItem[],
  onClick?: (e: MouseEvent<HTMLElement>) => void
};

export default function LinkedSelectItems({ title, items, onClick }: Props) {
  const handleClicked = (event: MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    const target = event.target as HTMLSpanElement;
    const parentElement = target.parentElement as HTMLAnchorElement;
    const id = parentElement.getAttribute('href') as string;
    if (id.startsWith("#")) scrollSmoothlyTo(id);

    onClick && onClick(event);
  };

  return (
    <>
      {items.map((item, index) =>
        <a key={index} href={`#${slug(title + ' ' + item.name)}`} onClick={handleClicked}>
          <SelectItem key={index} item={item} hoverStyle={clsx(
            "hover:bg-teal-200",
            "hover:text-teal-900",
            "transition"
          )} />
        </a>
      )}
    </>
  )
}
