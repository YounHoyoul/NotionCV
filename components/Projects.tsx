import Subtitle from "./Subtitle";

import { FaCode } from 'react-icons/fa';
import Text from "./Text";
import ProjectItem from "./ProjectItem";

type Props = {
  projectsGroupByCompany: ProjectResultSet[]
}

export default function Projects({ projectsGroupByCompany }: Props) {
  return (
    <div className="mt-4">
      <Subtitle title="Projects">
        <FaCode className="text-xl text-purple-700 dark:fuchsia-300" />
      </Subtitle>
      <div className="w-full mt-4">
        {projectsGroupByCompany.map((item, index) => {
          return (
            <ProjectItem key={index} item={item} />
          );
        })}
      </div>
    </div>
  )
}