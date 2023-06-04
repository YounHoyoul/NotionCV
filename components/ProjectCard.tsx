"use client";

import { useState } from "react";
import SelectItem from "./SelectItem";
import SelectItems from "./SelectItems";
import Text from "./Text";
import Caret from "./Caret";

type Props = {
  project: Project
};

export default function ProjectCard({ project }: Props) {
  const [show, setShow] = useState(false);

  const renderSkillset = (title: string, items: SelectItem[]) => {
    return (
      items && items.length > 0 && <>
        <label className="text-xs text-gray-300">{title}:</label>
        <SelectItems items={items} />
      </>
    );
  };

  return (
    <div className={`shadow border bg-white dark:border-0 dark:bg-gray-800 rounded p-4 w-full md:basis-1/2-gap-4 lg:basis-1/3-gap-4 xl:basis-1/4-gap-4 flex flex-col gap-2 relative cursor-pointer`}
      onClick={() => show ? setShow(false) : setShow(true)}
      onMouseLeave={() => setShow(false)}>
      <Caret open={false} />
      <Text text={project.name} fontSize="md" fontWeight={false} />
      <p className="text-xs mt-2">{project.workingPeriod}</p>
      <SelectItem item={project.role} />
      <SelectItems items={[...project.language, ...project.frontend, ...project.backend, ...project.webDbServer]} />
      <div className={show ? 'absolute shadow w-full-card -left-[1px] -top-[1px] block p-4 border bg-white rounded dark:bg-gray-800 p-4 z-10 flex flex-col gap-2 ' : `hidden`}>
        <Caret open={true} />
        <Text text={project.name} fontSize="md" fontWeight={false} />
        <p className="text-sm my-2">{project.company}</p>
        <label className="text-xs text-gray-300">Working Period:</label>
        <p className="text-sm">{project.workingPeriod}</p>
        <label className="text-xs text-gray-300">Role:</label>
        <SelectItem item={project.role} />
        {renderSkillset("Language", project.language)}
        {renderSkillset("Frontend", project.frontend)}
        {renderSkillset("Backend", project.backend)}
        {renderSkillset("Web/DB Servers", project.webDbServer)}
        <Text text={project.responsibility} fontSize="sm" fontWeight={false} />
      </div>
    </div>
  )
}