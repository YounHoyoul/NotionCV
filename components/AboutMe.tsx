import { TITLE_ABOUTME, TITLE_CONTACTS, TITLE_LANGUAGES } from "@/repositories/Constants";
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
    <div className="flex flex-wrap gap-4">
      <div className="w-full flex flex-col gap-4 lg:basis-1/2-gap-4 xl:basis-1-gap-4">
        <Subtitle title={TITLE_ABOUTME}>
          <FaUserTie className="text-xl text-purple-700 dark:fuchsia-300" />
        </Subtitle>
        <BulletedList content={profile.aboutMe} />
      </div>
      <div className="w-full flex flex-col gap-4 sm:basis-1/2-gap-4 lg:basis-1/4-gap-4 xl:basis-1/2-gap-4">
        <Subtitle title={TITLE_CONTACTS}>
          <MdContactPhone className="text-2xl text-purple-700 dark:fuchsia-300" />
        </Subtitle>
        <Paragraph content={profile.contacts} />
      </div>
      <div className="w-full flex flex-col gap-4 sm:basis-1/2-gap-4 lg:basis-1/4-gap-4 xl:basis-1/2-gap-4">
        <Subtitle title={TITLE_LANGUAGES}>
          <MdLanguage className="text-2xl text-purple-700 dark:fuchsia-300" />
        </Subtitle>
        <Paragraph content={profile.languages} />
      </div>
    </div>
  )
}