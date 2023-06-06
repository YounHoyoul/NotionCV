"use client";

import { useState } from "react";
import SelectItems from "./SelectItems";
import Text from "./Text";
import Caret from "./Caret";
import ItemTitle from "./ItemTitle";
import slugify from "slugify";
import { TITLE_BACKEND, TITLE_FRONTEND, TITLE_LANGUAGE, TITLE_WEBDBSEERVER } from "@/repositories/Constants";
import LinkedSelectItems from "./LinkedSelectItems";
import clsx from "clsx";
import Label from "./Label";
import Anchor from "./Anchor";

type Props = {
  experience: ExperienceResultSet
};

export default function ExperienceCard({ experience }: Props) {
  const [show, setShow] = useState(false);

  const renderSkillset = (title: string, items: SelectItem[]) => {
    return (
      <>
        <Label label={title} />
        <div className="flex flex-wrap gap-2">
          <LinkedSelectItems title={title} items={items} />
        </div>
      </>
    );
  };

  const handleShow = () => show ? setShow(false) : setShow(true);

  const renderSummary = () => (
    <>
      <Caret open={false} onClick={handleShow} />
      <ItemTitle items={experience.company.name} icon={experience.company.icon} />
      <SelectItems items={[experience.company.type, experience.company.role]} />
      <p className="text-xs">{experience.company.workingPeriod}</p>
      <Text text={experience.company.address} fontSize="xs" />
    </>
  );

  const renderDetail = () => (
    <>
      <Caret open={true} onClick={handleShow} />
      <ItemTitle items={experience.company.name} icon={experience.company.icon}/>
      <Label label="Working Type" />
      <SelectItems items={[experience.company.type]} />
      <Label label="Role" />
      <SelectItems items={[experience.company.role]} />
      <Label label="Working Period" />
      <p className="text-xs">{experience.company.workingPeriod}</p>
      <Label label="Address" />
      <Text text={experience.company.address} fontSize="xs" />
    </>
  );

  const renderProjectList = () => (
    <>
      <Label label={"Projects · " + experience.projects.length + " pjts"} />
      <ul className="list-disc pl-4">
        {experience.projects.map((item, index) => (
          <li key={index} className="text-xs">
            <Anchor link={`#${slugify(item.name[0].plain_text)}`}>
              {item.name[0].plain_text} · {item.totalMonths} mons
            </Anchor>
          </li>))}
      </ul>
    </>
  );

  return (
    <div id={slugify(experience.company.name[0].plain_text)}
      className={clsx(`shadow border bg-white dark:border-0 dark:bg-gray-800 rounded p-4 w-full sm:basis-1/2-gap-4 flex flex-col gap-2 relative`)}
      onMouseLeave={() => setShow(false)}>
      {renderSummary()}
      <div className={clsx(
        show && 'absolute shadow w-full-card -left-[1px] -top-[1px] block p-4 border bg-white rounded dark:bg-gray-800 p-4 z-10 flex flex-col gap-2',
        !show && 'hidden')
      }>
        {renderDetail()}
        {renderProjectList()}
        {renderSkillset(TITLE_LANGUAGE, experience.language)}
        {renderSkillset(TITLE_FRONTEND, experience.frontend)}
        {renderSkillset(TITLE_BACKEND, experience.backend)}
        {renderSkillset(TITLE_WEBDBSEERVER, experience.webDbServer)}
      </div>
    </div>
  )
}