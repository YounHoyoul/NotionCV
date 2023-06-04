import Card from "./Card";
import Subtitle from "./Subtitle";

import { FaCertificate } from 'react-icons/fa';
import Text from "./Text";

type Props = {
  licenses: Cert[]
}

export default function License({ licenses }: Props) {
  return (
    <>
      <Subtitle title="License & Certificates">
        <FaCertificate className="text-xl text-purple-700 dark:fuchsia-300" />
      </Subtitle>
      <div className="flex flex-wrap mt-4 gap-4">
        {licenses.map((license, index) => {
          return (
            <Card key={index} className="md:basis-1/2-gap-4 lg:basis-1/3-gap-4 xl:basis-1/4-gap-4">
              <Text text={license.name} fontSize="md" fontWeight={false} />
              <Text text={license.issueOrganization} fontSize="sm" fontWeight={false} />
              <p className="text-sm">{license.issueDate.start}</p>
            </Card>
          );
        })}
      </div>
    </>
  )
}