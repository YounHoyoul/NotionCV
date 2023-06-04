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
  const renderSkillset = (title: string, items: SkillResultSet[]) => {
    return (
      <div className="w-full md:basis-1/2-gap-4 lg:basis-1/3-gap-4 xl:basis-1/4-gap-4">
        <Subtitle title={title} />
        {items && items.length > 0 && items.map((item, index) => {
          return (
            <SkillItem key={index} item={item} />
          );
        })}
      </div>

    );
  }
  return (
    <div className="mt-4">
      <Subtitle title="Skill">
        <FaTools className="text-xl text-purple-700 dark:fuchsia-300" />
      </Subtitle>
      <div className="w-full mt-4 flex flex-wrap gap-4">
          {renderSkillset("Language", languages)}
          {renderSkillset("Frontend", frontends)}
          {renderSkillset("Backend", backends)}
          {renderSkillset("Web/DB Servers", webDbServers)}
      </div>
    </div>
  )
}