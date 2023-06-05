import Card from "./Card";
import Subtitle from "./Subtitle";

import { FaCertificate } from 'react-icons/fa';
import Text from "./Text";
import CertCard from "./CertCard";

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
        {licenses.map((item, index) => <CertCard item={item} key={index} className="sm:basis-1/2-gap-4 lg:basis-1/3-gap-4 xl:basis-1/4-gap-4"/>)}
      </div>
    </>
  )
}