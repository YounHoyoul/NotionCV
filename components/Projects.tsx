"use client";

import Subtitle from "./Subtitle";

import { FaCode } from 'react-icons/fa';
import { BiCollapseVertical } from 'react-icons/bi';
import ProjectItem from "./ProjectItem";
import { TITLE_PROJECTS } from "@/repositories/Constants";
import { COLLAPSE_PROJECTS, useAppContext } from "@/context/state";

type Props = {
  projectsGroupByCompany: ProjectResultSet[]
}

export default function Projects({ projectsGroupByCompany }: Props) {
  const sharedState = useAppContext();

  const handleClickCollaps = () => {
    sharedState.eventBus.dispatch(COLLAPSE_PROJECTS, '');
  }

  return (
    <div className="relative">
      <Subtitle title={TITLE_PROJECTS}>
        <FaCode className="icon-primay" />
      </Subtitle>
      <BiCollapseVertical className="absolute top-5 right-2 cursor-pointer" onClick={handleClickCollaps} />
      <div className="w-full">
        {projectsGroupByCompany.map((item, index) => {
          return (
            <ProjectItem key={index} item={item} />
          );
        })}
      </div>
    </div>
  )
}