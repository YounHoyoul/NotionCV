"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import ProjectCard from "./ProjectCard";

type Props = {
  company: string,
  workingPeriod: string,
  projects: Project[]
};

export default function ProjectAccordion({ company, workingPeriod, projects }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <div className="w-full mt-4 relative">
      <span className="absolute top-5 right-2">
        {open ? <FaChevronDown  className="text-gray-500" /> : <FaChevronRight className="text-gray-500" />}
      </span>
      <h2 className={`text-md w-full py-4 font-bold cursor-pointer ${open ? 'border-b-[1px] border-slate-400' : ''}`}
        onClick={() => open ? setOpen(false) : setOpen(true)}>
        {company}
        <span className="text-sm font-normal"> · {workingPeriod}</span>
        <span className="text-sm font-normal"> · {projects.length} pjts</span>
      </h2>
      <div className={`flex flex-wrap my-4 gap-4 ${open ? '' : 'hidden'}`}>
        {projects.map((project, index) => <ProjectCard key={index} project={project}/>)}
      </div>
    </div>
  )
}
