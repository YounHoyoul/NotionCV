import Subtitle from "./Subtitle";

import { FaSuitcase } from 'react-icons/fa';
import ExperienceCard from "./ExperienceCard";

type Props = {
  experiences: ExperienceResultSet[]
}

export default function Experience({ experiences }: Props) {
  return (
    <div className="mt-4">
      <Subtitle title="Experience">
        <FaSuitcase className="text-xl text-purple-700 dark:fuchsia-300" />
      </Subtitle>
      <div className="flex flex-wrap mt-4 gap-4">
        {experiences.map((experience, index) => {
          return (
            <ExperienceCard experience={experience} key={index} />
          );
        })}
      </div>
    </div>
  )
}