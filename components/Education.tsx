import Card from "./Card";
import ItemTitle from "./ItemTitle";
import Subtitle from "./Subtitle";

import { FaUniversity } from 'react-icons/fa';

type Props = {
  educations: Education[]
};

export default function Education({ educations }: Props) {
  return (
    <>
      <Subtitle title="Education">
        <FaUniversity className="icon-primay" />
      </Subtitle>

      <div className="flex flex-wrap mt-4 gap-4">
        {educations.map((item, index) =>
          <Card key={index}>
            <ItemTitle items={item.name} icon={item.icon}/>
            <p className="text-sm text-primay-color">{item.degree[0].plain_text}</p>
            <p className="text-xs text-primay-color">{item.fieldOfStudy[0].plain_text}</p>
            <p className="text-xs text-primay-color">{item.end.start}</p>
          </Card>)}
      </div>
    </>
  )
}