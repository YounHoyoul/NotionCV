"use client";

import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";

import SelectItems from "./SelectItems";
import Text from "./Text";
import Caret from "./Caret";
import ItemTitle from "./ItemTitle";
import LinkedSelectItems from "./LinkedSelectItems";
import Label from "./Label";
import Anchor from "./Anchor";
import { DURATION, TITLE_BACKEND, TITLE_FRONTEND, TITLE_LANGUAGE, TITLE_WEBDBSEERVER } from "@/repositories/Constants";
import { slug } from "@/lib/slugify";
import { closePanelOnDocumentClicked } from "@/lib/closePanelOnDocucmentClicked";
import { openPanel } from "@/lib/openAnimation";

type Props = {
  experience: ExperienceResultSet
};

export default function ExperienceCard({ experience }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  const id = slug(experience.company.name[0].plain_text);

  useEffect(() => {
    closePanelOnDocumentClicked(id, () => setShow(false));
  }, []);

  useEffect(() => {
    openPanel(containerRef, panelRef, show);
  }, [containerRef, panelRef, show]);

  const handleClicked = () => setShow(!show);

  const renderSkillset = (title: string, skills: SelectItem[]) => (skills.length ?
    <>
      <Label label={title} />
      <div className="flex flex-wrap gap-2">
        <LinkedSelectItems title={title} items={skills} onClick={handleClicked} />
      </div>
    </> : <></>);

  const summerySkills = (title: string, skills: SelectItem[]) => (skills.length ?
    <>
      <span className="text-xs text-primay-color">·</span>
      <span className="text-xs text-primay-color">{title} : {skills.length} </span>
    </> : <></>);

  const renderSummary = () => (
    <>
      <Caret open={false} onClick={handleClicked} />
      <ItemTitle items={experience.company.name} icon={experience.company.icon} />
      <SelectItems items={[experience.company.type, experience.company.role]} />
      <p className="text-xs text-primay-color">{experience.company.workingPeriod}</p>
      <Text text={experience.company.address} fontSize="xs" />
      <p className="flex flex-wrap gap-2">
        <span className="text-xs text-primay-color">{experience.projects.length} pjts</span>
        {summerySkills(TITLE_LANGUAGE, experience.language)}
        {summerySkills(TITLE_FRONTEND, experience.frontend)}
        {summerySkills(TITLE_BACKEND, experience.backend)}
        {summerySkills(TITLE_WEBDBSEERVER, experience.webDbServer)}
      </p>
    </>
  );

  const renderDetail = () => (
    <>
      <Caret open={show} onClick={handleClicked} />
      <ItemTitle items={experience.company.name} icon={experience.company.icon} />
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
            <Anchor link={`#${slug(item.name[0].plain_text)}`} onClick={handleClicked}>
              {item.name[0].plain_text} · {item.totalMonths} mons
            </Anchor>
          </li>))}
      </ul>
    </>
  );

  return (
    <div id={id} ref={containerRef} className={clsx(
      'shadow', 'border', 'bg-white', 'dark:border-0',
      'dark:bg-gray-800', 'rounded', 'p-4', 'w-full',
      'sm:basis-1/2-gap-4', 'flex', 'flex-col', 'gap-2',
      'relative', 'transition'
    )}>
      {renderSummary()}
      <div ref={panelRef} className={clsx(
        'absolute', 'shadow', 'w-full-card', '-left-[1px]',
        '-top-[1px]', 'block', 'p-4', 'border', 'bg-white',
        'rounded', 'dark:bg-gray-800', 'flex',
        'flex-col', 'gap-2', 'transition-all', 'duration-300', 'opacity-0', 'overflow-y-hidden'
      )}>
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
