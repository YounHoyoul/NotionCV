import Subtitle from "./Subtitle";

import { FaSuitcase } from 'react-icons/fa';
import ExperienceCard from "./ExperienceCard";
import { TITLE_EXPERIENCE } from "@/repositories/Constants";
import EventBusServiceInterface from "@/services/EventBusServiceInterface";

type Props = {
  experiences: ExperienceResultSet[],
  eventBus: EventBusServiceInterface
}

export default function Experience({ experiences, eventBus }: Props) {
  return (
    <>
      <Subtitle title={TITLE_EXPERIENCE}>
        <FaSuitcase className="icon-primay" />
      </Subtitle>
      <div className="flex flex-wrap mt-4 gap-4">
        {experiences.map((experience, index) => {
          return (
            <ExperienceCard experience={experience} key={index} eventBus={eventBus} />
          );
        })}
      </div>
    </>
  )
}