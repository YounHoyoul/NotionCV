import Card from "./Card";
import Subtitle from "./Subtitle";

import { FaUniversity } from 'react-icons/fa';

export default function Education() {
  return (
    <>
      <Subtitle title="Education">
        <FaUniversity className="text-xl text-purple-700 dark:fuchsia-300" />
      </Subtitle>
      <Card className="mt-4">
        <p className="text-md font-medium mt-2">Hanyang University</p>
        <p className="text-sm mt-2">Bachelor of Science (BS)</p>
        <p className="text-xs mt-2">Chemical Engineering</p>
        <p className="text-xs mt-2">Feb, 1998</p>
      </Card>
    </>
  )
}