
import Subtitle from "./Subtitle";
import { FaFileAlt } from 'react-icons/fa';
import CertCard from "./CertCard";
import { TITLE_PATENTS } from "@/repositories/Constants";

type Props = {
  patents: Cert[]
}

export default function License({ patents }: Props) {
  return (
    <>
      <Subtitle title={TITLE_PATENTS}>
        <FaFileAlt className="text-xl text-purple-700 dark:fuchsia-300" />
      </Subtitle>
      <div className="flex flex-wrap mt-4 gap-4">
        {patents.map((item, index) => <CertCard item={item} key={index} />)}
      </div>
    </>
  )
}