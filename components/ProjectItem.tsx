"use client";

import { useEffect, useRef, useState } from "react";
import ProjectCard from "./ProjectCard";
import Caret from "./Caret";
import clsx from "clsx";
import Icon from "./Icon";
import { openAccordion } from "@/lib/openAnimation";
import { COLLAPSE_PROJECTS, useAppContext } from "@/context/state";

type Props = {
  item: ProjectResultSet
};

export default function ProjectAccordion({ item }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(true);
  const sharedState = useAppContext();

  sharedState.eventBus.subscribe(COLLAPSE_PROJECTS, () => setOpen(false));
  const handleOpen = () => open ? setOpen(false) : setOpen(true);
  const handleForceOpen = () => setOpen(true);

  useEffect(() => {
    openAccordion(panelRef, open);
  }, [panelRef, open]);

  return (
    <div className="w-full relative">
      <Caret open={open} onClick={handleOpen} />
      <h2 onClick={handleOpen} className={clsx(
        'w-full p-4 flex flex-wrap gap-2 items-center cursor-pointer',
        open && 'separator'
      )}>
        <div className="flex gap-2">
          <Icon icon={item.icon} />
          <span className="text-md font-semibold">{item.company}</span>
        </div>
        <div className="flex gap-2 w-full sm:w-fit">
          <span className="text-sm font-normal hidden sm:block">·</span>
          <span className="text-sm font-normal">{item.workingPeriod}</span>
          <span className="text-sm font-normal">·</span>
          <span className="text-sm font-normal">{item.projects.length} pjts</span>
        </div>
      </h2>
      <div ref={panelRef}
        className={clsx('flex flex-wrap mt-4 gap-4 transition-all duration-300')}>
        {item.projects.map((project, index) => <ProjectCard key={index} project={project} onForceOpen={handleForceOpen} />)}
      </div>
    </div>
  )
}
