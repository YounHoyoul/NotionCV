"use client"

import clsx from 'clsx';
import { useEffect, useState } from 'react';

import SelectItem from './SelectItem';
import Caret from './Caret';
import Anchor from './Anchor';
import { slug } from '@/lib/slugify';
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
      <h2 className={clsx("text-md w-full pr-20 px-4 py-2",)}>
        {renderTitle()}
      </h2>
    </>
  );

  const renderPanel = () => (
    <>
      <Caret open={true} onClick={handleClicked} topClassName="top-3" />
      <h2 className={clsx(
        "text-md", "w-full", "pr-20", "pb-2",
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

  const highlighted = item.projects.length >= (parseInt(process.env.HIGHLIGHT_COUNT ?? '5')) &&
    (item.projects.map(item => item.totalMonths) as number[]).reduce((a, b) => a + b, 0) > parseInt(process.env.HIGHLIGHT_MONTHS ?? '60');

  return (
    <div id={id} className={clsx(
      'w-full', 'relative', 'my-1',
      highlighted && 'bg-white',
      highlighted && 'rounded',
      highlighted && 'dark:bg-gray-800',
    )}>
      {renderSummary()}
      <div className={clsx(
        'absolute', 'shadow', 'w-full-card', '-left-[1px]', '-top-[1px]', 'block', 'px-4', 'py-2',
        'border', 'bg-white', 'rounded', 'dark:bg-gray-800', 'z-10', 'flex',
        'flex-col', 'gap-2', !show && 'hidden')}>
        {renderPanel()}
      </div>
    </div>
  )
}
