"use client";

import { slug } from "@/lib/slugify";
import SkillItem from "./SkillItem";
import Caret from "./Caret";
import { useEffect, useRef, useState } from "react";
import { openAccordion } from "@/lib/openAnimation";
import clsx from "clsx";
import { COLLAPSE_SKILLSETS, useAppContext } from "@/context/state";

type Props = { title: string, items: SkillResultSet[] }

export default function SkillSet({ title, items }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(true);
  const sharedState = useAppContext();

  sharedState.eventBus.subscribe(COLLAPSE_SKILLSETS, () => setOpen(false));
  const handleOpen = () => open ? setOpen(false) : setOpen(true);
  const handleForceOpen = () => setOpen(true);

  useEffect(() => {
    openAccordion(panelRef, open);
  }, [panelRef, open]);

  return (
    <div className="w-full relative sm:basis-1/2-gap-4 lg:basis-1/3-gap-4 xl:basis-1/4-gap-4">
      <Caret open={open} onClick={handleOpen} />
      <div onClick={handleOpen} className={clsx("p-4 cursor-pointer", open && 'separator')} >
        <h2 className={`text-md flex gap-2 transition`}>{title}</h2>
      </div>
      <div ref={panelRef}
        className={clsx('flex flex-wrap mt-2 transition-all duration-300')}>
        {items && items.length > 0 && items.map((item, index) => {
          return (
            <SkillItem key={index} item={item} id={slug(`${title} ${item.name}`)} onForceOpen={handleForceOpen} />
          );
        })}
      </div>
    </div>
  )
}