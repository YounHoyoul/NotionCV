
import Card from "./Card";
import Subtitle from "./Subtitle";

import { FaFileAlt } from 'react-icons/fa';

export default function License() {
  return (
    <>
      <Subtitle title="Patents">
        <FaFileAlt className="text-xl text-purple-700 dark:fuchsia-300" />
      </Subtitle>
      <Card className="mt-4">
        <p className="text-md font-bold mt-2">The way to create the server components and architecture based on EJB</p>
        <p className="text-sm mt-2">KIPO</p>
        <p className="text-xs mt-2">KR 100483883</p>
        <p className="text-xs mt-2">Apr, 2005</p>
      </Card>
    </>
  )
}