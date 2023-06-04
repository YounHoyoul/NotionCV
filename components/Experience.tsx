import Subtitle from "./Subtitle";

import { FaSuitcase } from 'react-icons/fa';
import Text from "./Text";
import Card from "./Card";
import SelectItems from "./SelectItems";

type Props = {
  experiences: Experience[]
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
            <Card key={index} className="md:basis-1/2-gap-4 lg:basis-1/3-gap-4 xl:basis-1/4-gap-4">
              <Text text={experience.name} fontSize="md" fontWeight={true} />
              <SelectItems items={[experience.type, experience.role]} />
              <p className="text-xs mt-2">{experience.workingPeriod}</p>
              <Text text={experience.address} fontSize="xs" />
            </Card>
          );
        })}
      </div>
    </div>
  )
}