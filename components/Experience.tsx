import Subtitle from "./Subtitle";

import { FaSuitcase } from 'react-icons/fa';
import ExperienceCard from "./ExperienceCard";
import { TITLE_EXPERIENCE } from "@/repositories/Constants";

type Props = {
  experiences: ExperienceResultSet[]
}

export default function Experience({ experiences }: Props) {
  return (
    <>
      <Subtitle title={TITLE_EXPERIENCE}>
        <FaSuitcase className="text-xl text-purple-700 dark:fuchsia-300" />
      </Subtitle>
      <div className="flex flex-wrap mt-4 gap-4">
        {experiences.map((experience, index) => {
          return (
            <ExperienceCard experience={experience} key={index} />
          );
        })}
      </div>
    </>
  )
}