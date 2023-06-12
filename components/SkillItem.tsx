"use client"

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import SelectItem from './SelectItem';
import Caret from './Caret';
import Anchor from './Anchor';
import { slug } from '@/lib/slugify';
import { closePanelOnDocumentClicked } from '@/lib/closePanelOnDocucmentClicked';
import { openPanel } from '@/lib/openAnimation';
import { LINK_CLICKED, useAppContext } from '@/context/state';
import { DURATION } from '@/repositories/Constants';

type Props = {
  id: string,
  item: SkillResultSet,
  onForceOpen?: () => void
};

export default function SkillItem({ id, item, onForceOpen }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const sharedState = useAppContext();

  sharedState.eventBus.subscribe(LINK_CLICKED, (cmpId: string) => {
    if (cmpId === `#${id}`) {
      onForceOpen && onForceOpen();
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

  const renderTitle = () => (
    <>
      <SelectItem item={item.item} />
      <span className="text-xs font-normal"> · {item.workingPeriod}</span>
      <span className="text-xs font-normal"> · {item.projects.length} pjts</span>
    </>
  );

  const renderSummary = () => (
    <>
      <Caret open={false} onClick={handleClicked} topClassName="top-3" />
      <h2 onClick={handleClicked} className={clsx("text-md w-full pr-20 px-4 py-2 cursor-point",)}>
        {renderTitle()}
      </h2>
    </>
  );

  const renderPanel = () => (
    <>
      <Caret open={show} onClick={handleClicked} topClassName="top-3" />
      <h2 onClick={handleClicked} className={clsx(
        "text-md", "w-full", "pr-20", "pb-2", "cursor-pointer"
      )}>
        {renderTitle()}
      </h2>
      <ul className={clsx(
        "list-disc", "pl-4", "pr-4"
      )}>
        {item.projects.map((item, index) =>
          <li className="text-xs py-1" key={index}>
            <Anchor link={`#${slug(item.name[0].plain_text)}`} onClick={handleClicked}>
              {item.name[0].plain_text}
              <span className="text-xs"> · {item.totalMonths} mos</span>
            </Anchor>
          </li>
        )}
      </ul>
    </>
  );

  return (
    <div id={id} ref={containerRef} className={clsx(
      'w-full', 'relative', 'my-1', 'transition',
      item.highlighted && 'bg-white',
      item.highlighted && 'rounded',
      item.highlighted && 'dark:bg-gray-800',
    )}>
      {renderSummary()}
      <div ref={panelRef} className={clsx(
        'absolute', 'shadow', 'w-full-card', '-left-[1px]', '-top-[1px]', 'block', 'px-4', 'py-2',
        'border', 'bg-white', 'rounded', 'dark:bg-gray-800', 'flex',
        'flex-col', 'gap-2', 'transition-all', 'duration-300', 'opacity-0', 'overflow-y-hidden')}>
        {renderPanel()}
      </div>
    </div>
  )
}
