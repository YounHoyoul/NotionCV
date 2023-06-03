import Subtitle from "./Subtitle";

import { FaCertificate } from 'react-icons/fa';

export default function License() {
  return (
    <>
      <Subtitle title="License & Certificates">
        <FaCertificate className="text-xl text-purple-700 dark:fuchsia-300" />
      </Subtitle>
    </>
  )
}