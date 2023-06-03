import BulletedList from "./BulletedList";
import Paragraph from "./Paragraph";
import Subtitle from "./Subtitle";

import { FaUserTie } from 'react-icons/fa';
import { MdLanguage, MdContactPhone } from 'react-icons/md';

type Props = {
  profile: Profile
};

export default function AboutMe({ profile }: Props) {
  return (
    <div className="flex flex-wrap xl:flex-row -mx-4 mt-4">
      <div className="w-full xl:w-1/2 p-4">
        <Subtitle title="About Me">
          <FaUserTie className="text-xl text-purple-700 dark:fuchsia-300" />
        </Subtitle>
        <BulletedList content={profile.aboutMe} />
      </div>
      <div className="w-full lg:w-1/2 xl:w-1/4 p-4">
        <Subtitle title="Contacts">
          <MdContactPhone className="text-2xl text-purple-700 dark:fuchsia-300" />
        </Subtitle>
        <Paragraph content={profile.contacts} />
      </div>
      <div className="w-full lg:w-1/2 xl:w-1/4 p-4">
        <Subtitle title="Languages">
          <MdLanguage className="text-2xl text-purple-700 dark:fuchsia-300" />
        </Subtitle>
        <Paragraph content={profile.languages} />
      </div>
    </div>
  )
}