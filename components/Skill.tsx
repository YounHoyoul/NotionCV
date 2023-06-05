import slugify from "slugify";
import SkillItem from "./SkillItem";
import Subtitle from "./Subtitle";

import { FaTools } from 'react-icons/fa';
import { TITLE_BACKEND, TITLE_FRONTEND, TITLE_LANGUAGE, TITLE_SKILL, TITLE_WEBDBSEERVER } from "@/repositories/Constants";

type Props = {
  frontends: SkillResultSet[],
  backends: SkillResultSet[],
  languages: SkillResultSet[],
  webDbServers: SkillResultSet[],
};

export default function Skill({ languages, frontends, backends, webDbServers }: Props) {
  const renderSkillset = (title: string, items: SkillResultSet[]) => {
    return (
      <div className="w-full sm:basis-1/2-gap-4 lg:basis-1/3-gap-4 xl:basis-1/4-gap-4">
        <div className="p-4 cursor-pointer border-b-[1px] border-slate-400">
          <h2 className={`text-md flex gap-2`}>{title}</h2>
        </div>
        {items && items.length > 0 && items.map((item, index) => {
          return (
            <SkillItem key={index} item={item} id={slugify(`${title} ${item.name}`)}/>
          );
        })}
      </div>

    );
  }
  return (
    <>
      <Subtitle title={TITLE_SKILL}>
        <FaTools className="text-xl text-purple-700 dark:fuchsia-300" />
      </Subtitle>
      <div className="w-full flex flex-wrap gap-4">
        {renderSkillset(TITLE_LANGUAGE, languages)}
        {renderSkillset(TITLE_FRONTEND, frontends)}
        {renderSkillset(TITLE_BACKEND, backends)}
        {renderSkillset(TITLE_WEBDBSEERVER, webDbServers)}
      </div>
    </>
  )
}