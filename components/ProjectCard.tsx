"use client";

import clsx from 'clsx';

import { MouseEvent, useEffect, useState } from "react";
import Text from "./Text";
import Caret from "./Caret";
import ItemTitle from "./ItemTitle";
import { TITLE_BACKEND, TITLE_FRONTEND, TITLE_LANGUAGE, TITLE_WEBDBSEERVER } from '@/repositories/Constants';
import LinkedSelectItems from './LinkedSelectItems';
import Label from './Label';
import SelectItems from './SelectItems';
import Anchor from './Anchor';
import { slug } from '@/lib/slugify';
import { closePanelOnDocumentClicked } from '@/lib/closePanelOnDocucmentClicked';

type Props = {
  project: Project
};

export default function ProjectCard({ project }: Props) {
  const [show, setShow] = useState(false);

  const id = slug(project.name[0].plain_text);

  useEffect(() => {
    closePanelOnDocumentClicked(id, () => setShow(false));
  }, []);

  const handleClicked = (e: MouseEvent<HTMLSpanElement>) => {
    setShow(!show);
  }

  const renderSkillset = (title: string, items: SelectItem[]) => {
    return (
      items && items.length > 0 && <>
        <Label label={title} />
        <div className="flex flex-wrap gap-2">
          <LinkedSelectItems title={title} items={items} onClick={handleClicked} />
        </div>
      </>
    );
  };

  const renderSummary = () => (
    <>
      <Caret open={false} onClick={handleClicked} />
      <ItemTitle items={project.name} />
      <p className="text-xs">{project.workingPeriod}</p>
      <SelectItems items={[project.role]} />
      <div className="flex flex-wrap gap-2">
        <LinkedSelectItems title={TITLE_LANGUAGE} items={project.language} />
        <LinkedSelectItems title={TITLE_FRONTEND} items={project.frontend} />
        <LinkedSelectItems title={TITLE_BACKEND} items={project.backend} />
        <LinkedSelectItems title={TITLE_WEBDBSEERVER} items={project.webDbServer} />
      </div>
    </>
  );

  const renderDetail = () => (
    <>
      <Caret open={true} onClick={handleClicked} />
      <ItemTitle items={project.name} />
      <Anchor link={`#${slug(project.company)}`}>{project.company}</Anchor>
      <Label label="Working Period" />
      <p className="text-xs">{project.workingPeriod}</p>
      <Label label="Working Role" />
      <SelectItems items={[project.role]} />
      {renderSkillset(TITLE_LANGUAGE, project.language)}
      {renderSkillset(TITLE_FRONTEND, project.frontend)}
      {renderSkillset(TITLE_BACKEND, project.backend)}
      {renderSkillset(TITLE_WEBDBSEERVER, project.webDbServer)}
      <Text text={project.responsibility} fontSize="sm" fontWeight={'normal'} />
    </>
  );

  return (
    <div id={id}
      className={clsx(
        'shadow', 'border', 'bg-white', 'dark:border-0', 'dark:bg-gray-800',
        'rounded', 'p-4', 'w-full', 'sm:basis-1/2-gap-4', 'lg:basis-1/3-gap-4',
        'xl:basis-1/4-gap-4 flex', 'flex-col', 'gap-2', 'relative'
      )}>
      {renderSummary()}
      <div className={clsx(
        'absolute', 'shadow', 'w-full-card', '-left-[1px]', '-top-[1px]', 'block', 'p-4',
        'border', 'bg-white', 'rounded', 'dark:bg-gray-800', 'z-10', 'flex',
        'flex-col', 'gap-2', !show && 'hidden')}>
        {renderDetail()}
      </div>
    </div>
  )
}
