"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";
import Caret from "./Caret";
import clsx from "clsx";

type Props = {
  item: ProjectResultSet
};

export default function ProjectAccordion({ item }: Props) {
  const [open, setOpen] = useState(true);

  const handleOpen = () => open ? setOpen(false) : setOpen(true);

  return (
    <div className="w-full relative">
      <Caret open={open} onClick={handleOpen} />
      <h2 className={clsx(
        'text-md w-full p-4 font-semibold',
        open && 'border-b-[1px] border-slate-400'
      )}>
        {item.company}
        <span className="text-sm font-normal"> · {item.workingPeriod}</span>
        <span className="text-sm font-normal"> · {item.projects.length} pjts</span>
      </h2>
      <div className={clsx('flex flex-wrap mt-4 gap-4', !open && 'hidden')}>
        {item.projects.map((project, index) => <ProjectCard key={index} project={project} />)}
      </div>
    </div>
  )
}
