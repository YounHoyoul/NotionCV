"use client";

import Subtitle from "./Subtitle";

import { FaTools } from 'react-icons/fa';
import { TITLE_BACKEND, TITLE_FRONTEND, TITLE_LANGUAGE, TITLE_SKILL, TITLE_WEBDBSEERVER } from "@/repositories/Constants";
import SkillSet from "./SkillSet";
import { BiCollapseVertical } from "react-icons/bi";
import { COLLAPSE_SKILLSETS, useAppContext } from "@/context/state";

type Props = {
  frontends: SkillResultSet[],
  backends: SkillResultSet[],
  languages: SkillResultSet[],
  webDbServers: SkillResultSet[],
};

export default function Skill({ languages, frontends, backends, webDbServers }: Props) {
  const sharedState = useAppContext();

  const handleClickCollaps = () => {
    sharedState.eventBus.dispatch(COLLAPSE_SKILLSETS, '');
  }

  return (
    <div className="relative">
      <Subtitle title={TITLE_SKILL}>
        <FaTools className="icon-primay" />
      </Subtitle>
      <BiCollapseVertical className="absolute top-5 right-2 cursor-pointer" onClick={handleClickCollaps} />
      <div className="w-full flex flex-wrap gap-4 transition">
        <SkillSet title={TITLE_LANGUAGE} items={languages} />
        <SkillSet title={TITLE_FRONTEND} items={frontends} />
        <SkillSet title={TITLE_BACKEND} items={backends} />
        <SkillSet title={TITLE_WEBDBSEERVER} items={webDbServers} />
      </div>
    </div>
  )
}