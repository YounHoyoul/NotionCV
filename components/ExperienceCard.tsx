"use client";

import { useState } from "react";
import SelectItems from "./SelectItems";
import Text from "./Text";
import Caret from "./Caret";
import ItemTitle from "./ItemTitle";

type Props = {
  experience: ExperienceResultSet
};

export default function ExperienceCard({ experience }: Props) {
  const [show, setShow] = useState(false);

  const renderSkillset = (title: string, items: SelectItem[]) => {
    return (
      items && items.length > 0 && <>
        <label className="text-xs text-gray-300">{title}:</label>
        <SelectItems items={items} />
      </>
    );
  };

  return (
    <div className={`shadow border bg-white dark:border-0 dark:bg-gray-800 rounded p-4 w-full sm:basis-1/2-gap-4 flex flex-col gap-2 relative cursor-pointer`}
      onClick={() => show ? setShow(false) : setShow(true)}
      onMouseLeave={() => setShow(false)}>
      <Caret open={false} />
      <ItemTitle items={experience.company.name}/>
      <SelectItems items={[experience.company.type, experience.company.role]} />
      <p className="text-xs mt-2">{experience.company.workingPeriod}</p>
      <Text text={experience.company.address} fontSize="xs" />

      <div className={show ? 'absolute shadow w-full-card -left-[1px] -top-[1px] block p-4 border bg-white rounded dark:bg-gray-800 p-4 z-10 flex flex-col gap-2 ' : `hidden`}>
        <Caret open={true} />
        <ItemTitle items={experience.company.name}/>
        <SelectItems items={[experience.company.type, experience.company.role]} />
        <p className="text-xs mt-2">{experience.company.workingPeriod}</p>
        <Text text={experience.company.address} fontSize="xs" />

        <label className="text-xs text-gray-300">Projects · {experience.projects.length} pjts</label>
        <ul className="list-disc pl-4">
          {experience.projects.map((item, index) => (
            <li key={index} className="text-xs">
              {item.name[0].plain_text} · {item.totalMonths} mons
            </li>))}
        </ul>

        {renderSkillset("Language", experience.language)}
        {renderSkillset("Frontend", experience.frontend)}
        {renderSkillset("Backend", experience.backend)}
        {renderSkillset("Web/DB Servers", experience.webDbServer)}
      </div>
    </div>
  )
}