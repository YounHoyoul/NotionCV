"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";
import Caret from "./Caret";

type Props = {
  item : ProjectResultSet
};

export default function ProjectAccordion({ item }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <div className="w-full mt-4 relative">
      <Caret open={open}/>
      <h2 className={`text-md w-full py-4 font-bold cursor-pointer ${open ? 'border-b-[1px] border-slate-400' : ''}`}
        onClick={() => open ? setOpen(false) : setOpen(true)}>
        {item.company}
        <span className="text-sm font-normal"> · {item.workingPeriod}</span>
        <span className="text-sm font-normal"> · {item.projects.length} pjts</span>
      </h2>
      <div className={`flex flex-wrap my-4 gap-4 ${open ? '' : 'hidden'}`}>
        {item.projects.map((project, index) => <ProjectCard key={index} project={project} />)}
      </div>
    </div>
  )
}
