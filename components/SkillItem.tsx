"use client"

import { MouseEvent, useEffect, useState } from 'react';
import SelectItem from './SelectItem';
import Caret from './Caret';
import clsx from 'clsx';
import Anchor from './Anchor';
import { slug } from '@/lib/slugify';
import { stopPropagation } from '@/lib/stopPropagation';
import { closePanelOnDocumentClicked } from '@/lib/closePanelOnDocucmentClicked';

type Props = {
  id: string,
  item: SkillResultSet
};

export default function SkillItem({ id, item }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    closePanelOnDocumentClicked(id, () => setShow(false));
  }, []);

  const handleClicked = (e: MouseEvent<HTMLSpanElement>) => {
    stopPropagation(e);
    setShow(!show);
  }

  const renderTitle = () => (
    <>
      <SelectItem item={item.item} />
      <span className="text-xs font-normal"> · {item.workingPeriod}</span>
      <span className="text-xs font-normal"> · {item.projects.length} pjts</span>
    </>
  );

  const renderSummary = () => (
    <>
      <Caret open={show} onClick={handleClicked} />
      <h2 className={clsx("text-md w-full pr-20 p-4",)}>
        {renderTitle()}
      </h2>
    </>
  );

  const renderPanel = () => (
    <>
      <Caret open={show} onClick={handleClicked} />
      <h2 className={clsx(
        "text-md", "w-full", "pr-20", "pb-4", "border-b-[1px]", "border-slate-400",
      )}>
        {renderTitle()}
      </h2>
      <ul className={clsx(
        "list-disc", "pl-8", "pr-4", "py-1", "my-2"
      )}>
        {item.projects.map((item, index) =>
          <li className="text-sm py-1" key={index}>
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
    <div id={id} className={clsx('w-full relative')}>
      {renderSummary()}
      <div className={clsx(
        'absolute', 'shadow', 'w-full-card', '-left-[1px]', '-top-[1px]', 'block', 'p-4',
        'border', 'bg-white', 'rounded', 'dark:bg-gray-800', 'z-10', 'flex',
        'flex-col', 'gap-2', !show && 'hidden')}>
        {renderPanel()}
      </div>
    </div>
  )
}
