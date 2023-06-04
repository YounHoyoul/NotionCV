import SkillItem from "./SkillItem";
import Subtitle from "./Subtitle";

import { FaTools } from 'react-icons/fa';

type Props = {
  frontends: SkillResultSet[],
  backends: SkillResultSet[],
  languages: SkillResultSet[],
  webDbServers: SkillResultSet[],
};

export default function Skill({ languages, frontends, backends, webDbServers }: Props) {
  return (
    <div className="mt-4">
      <Subtitle title="Skill">
        <FaTools className="text-xl text-purple-700 dark:fuchsia-300" />
      </Subtitle>
      <div className="w-full mt-4 flex flex-wrap gap-4">
        <div className="w-full md:basis-1/2-gap-4 lg:basis-1/3-gap-4 xl:basis-1/4-gap-4">
          <Subtitle title="Language" />
          {languages && languages.length > 0 && languages.map((item, index) => {
            return (
              <SkillItem key={index} name={item.name} projects={item.projects} workingPeriod={item.workingPeriod} />
            );
          })}
        </div>
        <div className="w-full md:basis-1/2-gap-4 lg:basis-1/3-gap-4 xl:basis-1/4-gap-4">
          <Subtitle title="Frontend" />
          {frontends && frontends.length > 0 && frontends.map((item, index) => {
            return (
              <SkillItem key={index} name={item.name} projects={item.projects} workingPeriod={item.workingPeriod} />
            );
          })}
        </div>
        <div className="w-full md:basis-1/2-gap-4 lg:basis-1/3-gap-4 xl:basis-1/4-gap-4">
          <Subtitle title="Backend" />
          {backends && backends.length > 0 && backends.map((item, index) => {
            return (
              <SkillItem key={index} name={item.name} projects={item.projects} workingPeriod={item.workingPeriod} />
            );
          })}
        </div>
        <div className="w-full md:basis-1/2-gap-4 lg:basis-1/3-gap-4 xl:basis-1/4-gap-4">
          <Subtitle title="Web/DB Servers" />
          {webDbServers && webDbServers.length > 0 && webDbServers.map((item, index) => {
            return (
              <SkillItem key={index} name={item.name} projects={item.projects} workingPeriod={item.workingPeriod} />
            );
          })}
        </div>
      </div>
    </div>
  )
}