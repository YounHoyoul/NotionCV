import Subtitle from "./Subtitle";

import { FaCode } from 'react-icons/fa';
import Text from "./Text";
import ProjectItem from "./ProjectItem";
import { TITLE_PROJECTS } from "@/repositories/Constants";

type Props = {
  projectsGroupByCompany: ProjectResultSet[]
}

export default function Projects({ projectsGroupByCompany }: Props) {
  return (
    <>
      <Subtitle title={TITLE_PROJECTS}>
        <FaCode className="icon-primay" />
      </Subtitle>
      <div className="w-full">
        {projectsGroupByCompany.map((item, index) => {
          return (
            <ProjectItem key={index} item={item} />
          );
        })}
      </div>
    </>
  )
}