"use client";

import clsx from 'clsx';
import { useEffect, useRef, useState } from "react";

import Text from "./Text";
import Caret from "./Caret";
import ItemTitle from "./ItemTitle";
import { DURATION, TITLE_BACKEND, TITLE_FRONTEND, TITLE_LANGUAGE, TITLE_WEBDBSEERVER } from '@/repositories/Constants';
import LinkedSelectItems from './LinkedSelectItems';
import Label from './Label';
import SelectItems from './SelectItems';
import Anchor from './Anchor';
import { slug } from '@/lib/slugify';
import { closePanelOnDocumentClicked } from '@/lib/closePanelOnDocucmentClicked';
import { openPanel } from '@/lib/openAnimation';
import { LINK_CLICKED, useAppContext } from '@/context/state';

type Props = {
  project: Project,
  onForceOpen: () => void
};

export default function ProjectCard({ project, onForceOpen }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const sharedState = useAppContext();

  const id = slug(project.name[0].plain_text);

  sharedState.eventBus.subscribe(LINK_CLICKED, (cmpId: string) => {
    if (cmpId === `#${id}`) {
      onForceOpen();
      setTimeout(() => setShow(true), DURATION / 2);
    }
  });

  useEffect(() => {
    closePanelOnDocumentClicked(id, () => setShow(false));
  }, []);

  useEffect(() => {
    openPanel(containerRef, panelRef, show);
  }, [containerRef, panelRef, show]);

  const handleClicked = () => setShow(!show);

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
      <ItemTitle items={project.name} onClick={handleClicked} className="cursor-pointer" />
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
      <Caret open={show} onClick={handleClicked} />
      <ItemTitle items={project.name} onClick={handleClicked} className="cursor-pointer" />
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
    <div id={id} ref={containerRef}
      className={clsx(
        'shadow', 'border', 'bg-white', 'dark:border-0', 'dark:bg-gray-800',
        'rounded', 'p-4', 'w-full', 'sm:basis-1/2-gap-4', 'lg:basis-1/3-gap-4',
        'xl:basis-1/4-gap-4 flex', 'flex-col', 'gap-2', 'relative', 'transition'
      )}>
      {renderSummary()}
      <div ref={panelRef} className={clsx(
        'absolute', 'shadow', 'w-full-card', '-left-[1px]', '-top-[1px]', 'block', 'p-4',
        'border', 'bg-white', 'rounded', 'dark:bg-gray-800', 'flex',
        'flex-col', 'gap-2', 'transition-all', 'duration-300', 'opacity-0', 'overflow-y-hidden')}>
        {renderDetail()}
      </div>
    </div>
  )
}
