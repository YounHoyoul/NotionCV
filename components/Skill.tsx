import Subtitle from "./Subtitle";

import { FaTools } from 'react-icons/fa';
import { TITLE_BACKEND, TITLE_FRONTEND, TITLE_LANGUAGE, TITLE_SKILL, TITLE_WEBDBSEERVER } from "@/repositories/Constants";
import SkillSet from "./SkillSet";

type Props = {
  frontends: SkillResultSet[],
  backends: SkillResultSet[],
  languages: SkillResultSet[],
  webDbServers: SkillResultSet[],
};

export default function Skill({ languages, frontends, backends, webDbServers }: Props) {
  return (
    <>
      <Subtitle title={TITLE_SKILL}>
        <FaTools className="icon-primay" />
      </Subtitle>
      <div className="w-full flex flex-wrap gap-4 transition">
        <SkillSet title={TITLE_LANGUAGE} items={languages} />
        <SkillSet title={TITLE_FRONTEND} items={frontends} />
        <SkillSet title={TITLE_BACKEND} items={backends} />
        <SkillSet title={TITLE_WEBDBSEERVER} items={webDbServers} />
      </div>
    </>
  )
}