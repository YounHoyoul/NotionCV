
import Card from "./Card";
import Subtitle from "./Subtitle";

import { FaFileAlt } from 'react-icons/fa';
import Text from "./Text";
import CertCard from "./CertCard";

type Props = {
  patents: Cert[]
}

export default function License({ patents }: Props) {
  return (
    <>
      <Subtitle title="Patents">
        <FaFileAlt className="text-xl text-purple-700 dark:fuchsia-300" />
      </Subtitle>
      <div className="flex flex-wrap mt-4 gap-4">
        {patents.map((item, index) => <CertCard item={item} key={index} />)}
      </div>
    </>
  )
}