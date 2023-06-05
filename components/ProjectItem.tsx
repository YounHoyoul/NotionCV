"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";
import Caret from "./Caret";
import clsx from "clsx";
import Icon from "./Icon";

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
        'w-full p-4 flex gap-2 items-center',
        open && 'border-b-[1px] border-slate-400'
      )}>
        <Icon icon={item.icon} />
        <span className="text-md font-semibold">{item.company}</span>
        <span className="text-sm font-normal">·</span>
        <span className="text-sm font-normal">{item.workingPeriod}</span>
        <span className="text-sm font-normal">·</span>
        <span className="text-sm font-normal">{item.projects.length} pjts</span>
      </h2>
      <div className={clsx('flex flex-wrap mt-4 gap-4', !open && 'hidden')}>
        {item.projects.map((project, index) => <ProjectCard key={index} project={project} />)}
      </div>
    </div>
  )
}
